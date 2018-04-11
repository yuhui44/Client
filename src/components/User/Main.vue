<template>
  <div id="showMain">
    <div id="headerWrapper">
      <header class="header">
        <div class="container">
          <div id="headerLogo">
            <router-link to="/"><img src="@/assets/img/1.jpg"></router-link>
            <router-link to="/"><img id="text-logo" src="@/assets/img/2.jpg"></router-link>
          </div>
          <div id="userStatus">
            <user-status></user-status>
          </div>
        </div>
      </header>
    </div>
    <div id="mainContent">
      <div class="container">
        <div id="userMenu">
          <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" :collapse="isCollapse" v-bind:router="true">
            <el-menu-item index="/user">
              <i class="el-icon-yuhui44-index"></i>
              <span slot="title">我的主页</span>
            </el-menu-item>
            <el-menu-item index="/user/info">
              <i class="el-icon-yuhui44-info"></i>
              <span slot="title">我的信息</span>
            </el-menu-item>
            <el-menu-item index="/user/safe">
              <i class="el-icon-yuhui44-safe"></i>
              <span slot="title">账户安全</span>
            </el-menu-item>
            <el-menu-item index="/user/property">
              <i class="el-icon-yuhui44-sell"></i>
              <span slot="title">我的转让</span>
            </el-menu-item>
            <el-menu-item index="/user/info">
              <i class="el-icon-yuhui44-need"></i>
              <span slot="title">我的需求</span>
            </el-menu-item>
            <el-menu-item index="/user/infos">
              <i class="el-icon-yuhui44-users"></i>
              <span slot="title">所有用户</span>
            </el-menu-item>
            <el-menu-item index="/user/propertys">
              <i class="el-icon-refresh"></i>
              <span slot="title">所有产权</span>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="content" v-bind:class="{ 'content-thin': isCollapse }">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//引入用户状态组件
import UserStatus from "@/components/Common/UserStatus";
//导出组件
export default {
  // name: 'Main',
  components: {
    "user-status": UserStatus
  },
  data() {
    return {
      isCollapse: true
    };
  },
  mounted() {
    this.isCollapse = document.documentElement.clientWidth < 1010;
    console.log(this.isCollapse);
    // const that = this;
    window.onresize = () => {
      this.isCollapse = document.documentElement.clientWidth < 1010;
    };
  },
  computed: {
    activeIndex() {
      return "/" + this.$route.matched[0].path.split("/")[1];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
#showMain {
  height: 100%;
}

#headerWrapper {
  .header {
    height: 60px;
    background-color: #fff;
    color: #fff;
    top: 0;
    left: 0;
    width: 100%;
    line-height: 60px;
    position: fixed;
    z-index: 100;
  }
}

.container {
  width: 1000px;
  height: 100%;
  margin: 0 auto;
}

@media (max-width: 1000px) {
  .container {
    width: 100%;
  }
}

#headerLogo {
  float: left;
  height: 60px;

  img {
    height: 60px;
  }
}

@media (max-width: 550px) {
  #text-logo {
    display: none;
  }
}

#userStatus {
  float: right;
}

#mainContent {
  height: 100%;
}

#userMenu {
  position: fixed;
  top: 80px;
}

.content {
  // height: calc(100% - 100px);
  transition: 1s;
  transition-timing-function: ease-out;
  // margin-right: 180px;
  width: calc(100% - 220px);
  background-color: #fff;
  float: right;
  margin-top: 80px;
  margin-bottom: 20px;
  padding: 20px;
}

.content-thin {

  width: calc(100% - 60px);
  margin-right: 5px;
  // width: 100%;
  padding: 20px 5px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 160px;
}

.el-menu--collapse {
  width: 40px;
}

.el-menu-item, .el-submenu__title {
  height: 50px;
  line-height: 50px;
}

.el-menu--collapse .el-menu-item {
  margin-left: -10px;
}
</style>
