<template>
  <div>
    <!-- 正在加载 -->
    <p class="loading" v-if="isLoading">正在加载产权信息，请稍等...</p>
    <!-- 加载失败 -->
    <p class="fail" v-if="isFail">产权信息加载失败，请刷新重试...</p>
    <!-- 产权展示 -->
    <div class="property-box" v-if="!isLoading && !isFail">
      <p :title="property.propertyName" class="property-title">{{property.propertyName}}</p>
      <div class="property-author-time">
        <div class="property-author">
          <router-link to="/" :title="property.publisher.username">{{property.publisher.username}}</router-link>
        </div>
        <p class="property-publish">发表于</p>
        <p class="property-time">{{new Date(property.createTime).toLocaleString('chinese',{hour12:false})}}</p>
        <p class="property-publish">最后编辑于</p>
        <p class="property-time">{{new Date(property.editTime).toLocaleString('chinese',{hour12:false})}}</p>
        <el-button type="primary" class="property-want" @click="wantProperty()" v-if="!property.isSelt">我有意向</el-button>
        <el-button type="primary" class="property-want" v-if="property.isSelt" disabled>产权已售出</el-button>
        <div style="clear:both"></div>
      </div>
      <div class="property-detail">
        <p>{{property.detail}}</p>
      </div>
    </div>
    <!-- 意向弹窗 -->
    <el-dialog title="我有意向" :visible.sync="indexWantDialogVisible" width="300px" :append-to-body=true>
      <el-form :model="indexWantForm" status-icon :rules="indexWantFormRules" ref="indexWantForm" @submit.native.prevent>
        <!-- 留言 -->
        <el-form-item prop="message">
          <el-input v-model="indexWantForm.message" placeholder="给产权所有者留言（意向价格）"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="postIndexWantInfo2()" style="width: 260px;">发送交易意向</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import { getIndexPropertyInfo, postIndexWantInfo } from "@/axios/api";
//导出组件
export default {
  data() {
    return {
      isLoading: true,
      isFail: false,
      property: {},
      indexWantDialogVisible: false,
      indexWantForm: {},
      indexWantFormRules: {
        message: [{ required: true, message: "请填写留言", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters({
      isLogin: "isLogin"
    })
  },
  mounted() {},
  created() {
    this.getIndexPropertyInfo2();
  },
  methods: {
    getIndexPropertyInfo2() {
      getIndexPropertyInfo({ _id: this.$route.params.id })
        .then(res => {
          console.log(res, "请求成功");
          this.property = res.data.property;
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err, "请求错误");
          this.isFail = true;
          this.isLoading = false;
        });
    },
    postIndexWantInfo2() {
      this.$refs.indexWantForm.validate(valid => {
        if (valid) {
          this.indexWantForm.property = this.property._id;
          postIndexWantInfo(this.indexWantForm)
            .then(res => {
              this.indexWantDialogVisible = false;
              console.log(res, "请求成功");
            })
            .catch(err => {
              console.log(err, "请求错误");
            });
        } else {
          this.$message({
            message: "请填写留言信息",
            type: "error"
          });
        }
      });
    },
    // 点击我有意向
    wantProperty() {
      if ( this.isLogin ) {
        this.indexWantDialogVisible = true;
      } else {
        this.$root.eventHub.$emit('showLogin');
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.loading {
  text-align: center;
  font-weight: 600;
  font-size: 20px;
}

.property-box {
  font-size: 18px;
  margin: 15px;
}

// @media (max-width: 700px) {
// .property-box {
// width: 100%;
// }
// }
.property-box p {
  margin: 0;
}

.property-box a {
  text-decoration: none;
  color: #337ab7;
  transition: 0.5s;
}

.property-inbox p {
  margin: 0;
}

.property-inbox a:hover {
  text-decoration: underline;
  color: #51aded;
}

.property-title {
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 26px;
  line-height: 50px;
  width: 100%;
}

.property-author-time {
  line-height: 30px;
  // padding-bottom: 5px;
  font-size: 18px;
}

.property-author {
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  max-width: 200px;
  float: left;
}

// .property-author a {
// height: 15px;
// }
.property-publish {
  display: inline-block;
  padding-left: 5px;
}

.property-time {
  display: inline-block;
}

.property-want {
  float: right;
  font-size: 18px;
}

.property-detail {
  line-height: 30px;
  border-top: 1px solid #cccccc;
  padding-top: 10px;
}
</style>