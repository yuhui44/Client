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
        <!-- <div id="userMenu">
          <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" :collapse="isCollapse" v-bind:router="true">
            <el-menu-item index="/user">
              <i class="el-icon-location"></i>
              <span slot="title">我的主页</span>
            </el-menu-item>
            <el-menu-item index="/user/info">
              <i class="el-icon-menu"></i>
              <span slot="title">我的信息</span>
            </el-menu-item>
            <el-menu-item index="/user/security">
              <i class="el-icon-menu"></i>
              <span slot="title">账户安全</span>
            </el-menu-item>
            <el-menu-item index="/user/info">
              <i class="el-icon-document"></i>
              <span slot="title">我的转让</span>
            </el-menu-item>
            <el-menu-item index="/user/info">
              <i class="el-icon-setting"></i>
              <span slot="title">我的需求</span>
            </el-menu-item>
            <el-menu-item index="5" @click="isCollapse = !isCollapse">
              <i class="el-icon-refresh"></i>
              <span slot="title">展开收起</span>
            </el-menu-item>
          </el-menu>
        </div> -->
        <div class="content">
          <router-view></router-view>
        </div>
        <div style="clear:both"></div>
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
    };
  },
  mounted() {
  },
  computed: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
// #showMain {
//   height: 100%;
// }

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
  // height: 100%;
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

// #mainContent {
//   height: 100%;
// }

.content {
  // height: calc(100% - 100px);
  width: calc(100% - 40px);
  background-color: #fff;
  float: left;
  margin-top: 80px;
  margin-bottom: 20px;
  // margin-left: 5px;
  padding: 15px;
}

@media (max-width: 1010px) {
  .content {
    margin-left: 5px;
    width: calc(100% - 50px);
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 160px;
}

@media (max-width: 330px) {
  #headerLogo img {
    height: 30px;
    margin-top: 15px;
  }
}
</style>
