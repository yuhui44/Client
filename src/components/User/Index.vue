<template>
  <div>
    <p>hhhh</p>
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
    };
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
</style>