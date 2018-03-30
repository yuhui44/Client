<template>
  <div id="showMain">
    <div id="headerWrapper">
      <header class="header">
        <div class="container">
          <div id="headerLogo">
            <img src="https://jwc.scnu.edu.cn/logo/logo_school.png">
          </div>
          <div id="userStatus">
            <user-status></user-status>
          </div>
        </div>
      </header>
    </div>
    <div id="mainContent">
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
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
#showMain
  background-color #000
  #headerWrapper
    .header
      height 60px
      background-color #fff
      color #fff
      top 0
      left 0
      width 100%
      line-height 60px
      position relative
      .container
        width 1000px
        margin 0 auto
        #headerLogo
          float left
          img
            heigth 50px
        #userStatus
          float right
      @media (max-width: 1000px)
        .container
          width 100%
</style>
