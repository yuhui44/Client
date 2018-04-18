<template>
  <div>
    <!-- 正在加载 -->
    <p class="loading" v-if="isLoading">正在加载产权信息，请稍等...</p>
    <!-- 加载失败 -->
    <p class="fail" v-if="isFail">产权信息加载失败，请刷新重试...</p>
    <!-- 产权展示 -->
    <div class="propertys-list" v-if="!isLoading && !isFail">
      <!-- 单个商品 -->
      <div class="property-box" v-for="property in propertys" :key="property.index">
        <div class="property-inbox">
          <div class="property-title">
            <router-link :to="{ path: 'property/' + property._id }" :title="property.propertyName">{{property.propertyName}}</router-link>
          </div>
          <div class="property-author-time">
            <div class="property-author">
              <router-link :to="{ path: '', query: { userId: property.publisher._id }}" :title="property.publisher.username">{{property.publisher.username}}</router-link>
            </div>
            <p class="property-publish">发表于</p>
            <p class="property-time">{{new Date(property.createTime).toLocaleString('chinese',{hour12:false})}}</p>
          </div>
          <p class="property-summary" style="-webkit-box-orient: vertical;">{{property.summary}}</p>
          <div class="property-go">
            <router-link :to="{ path: 'property/' + property._id }">查看详情
              <i class="el-icon-d-arrow-right"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { getIndexPropertysInfo } from "@/axios/api";
//导出组件
export default {
  data() {
    return {
      isLoading: true,
      isFail: false,
      propertys: {},
      params: {}
    };
  },
  mounted() {},
  created() {
    this.getIndexPropertysInfo2();
  },
  watch: {
    $route: "getIndexPropertysInfo2"
  },
  methods: {
    getIndexPropertysInfo2() {
      this.isLoading = true;
      this.params = {};
      if (this.$route.query.userId) {
        this.params.userId = this.$route.query.userId;
      }
      getIndexPropertysInfo(this.params)
        .then(res => {
          console.log(res, "请求成功");
          this.propertys = res.data.propertys;
          this.isLoading = false;
        })
        .catch(err => {
          this.isFail = true;
          this.isLoading = false;
          console.log(err, "请求错误");
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.loading, .fail {
  text-align: center;
  font-weight: 600;
  font-size: 20px;
}

.property-box {
  width: 50%;
  display: inline-block;
}

@media (max-width: 700px) {
  .property-box {
    width: 100%;
  }
}

.property-inbox {
  margin: 15px;
  border: 1px solid #ccc;
  // height: 200px;
  padding: 20px;
  font-size: 15px;
}

.property-inbox a {
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
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 20px;
  line-height: 30px;
}

.property-author-time {
  line-height: 30px;
  padding-bottom: 5px;
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

.property-summary {
  // white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  height: 88px;
  line-height: 22px;
  border-top: 1px solid #cccccc;
  padding-top: 10px;
}

.property-go {
  line-height: 30px;
  height: 30px;
  padding-right: 10px;
}

.property-go a {
  float: right;
}
</style>