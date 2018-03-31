<template>
  <div>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse">
      <el-menu-item index="1">
        <i class="el-icon-location"></i>
        <span slot="title">我的主页</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">我的信息</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">我的转让</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">我的需求</span>
      </el-menu-item>
      <el-menu-item index="5" @click="isCollapse = !isCollapse">
        <i class="el-icon-refresh"></i>
        <span slot="title">展开收起</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
//导出组件
export default {
  data() {
    return {
      isCollapse: true
    };
  },
  mounted() {
    this.isCollapse = document.documentElement.clientWidth < 1000;
    console.log(this.isCollapse);
    // const that = this;
    window.onresize = () => {
      this.isCollapse = document.documentElement.clientWidth < 1000;
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) 
  width 160px
  // min-height 240px
</style>