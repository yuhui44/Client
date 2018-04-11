<template>
  <div>
    <!-- 正在加载 -->
    <p class="loading" v-if="isLoading">正在加载产权信息，请稍等...</p>
    <!-- 产权展示 -->
    <div class="propertys-list">
      <!-- 单个商品 -->
      <div class="property-box" v-for="property in propertys" :key="property">
        <div class="property-inbox">
          <div class="property-title">
            <router-link to="/" :title="property.propertyName">{{property.propertyName}}</router-link>
          </div>
          <div class="property-author-time">
            <div class="property-author">
              <router-link to="/" :title="property.publisher.username">{{property.publisher.username}}</router-link>
            </div>
            <p class="property-publish">发表于</p>
            <p class="property-time">{{new Date(property.createTime).toLocaleString('chinese',{hour12:false})}}</p>
          </div>
          <div class="property-summary">
            <p>{{property.summary}}</p>
          </div>
          <div class="property-go">
            <router-link to="/">查看详情
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
      propertys: {}
    };
  },
  mounted() {},
  created() {
    this.getIndexPropertysInfo2();
  },
  methods: {
    getIndexPropertysInfo2() {
      getIndexPropertysInfo()
        .then(res => {
          console.log(res, "请求成功");
          this.propertys = res.data.propertys;
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err, "请求错误");
        });
    }
  }
};
</script>

<style lang="stylus" scope>
.loading {
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
  // text-overflow: ellipsis;
  // display: inline-block;
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