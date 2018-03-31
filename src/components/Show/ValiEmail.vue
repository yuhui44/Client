<template>
  <div id="center">
    <h1>邮箱验证</h1>
    <h2 v-if="loading">正在验证，请稍等...</h2>
    <h2 v-if="showSuccess">邮箱“{{email}}”已通过验证！</h2>
    <h2 v-if="showFail">验证失败，请重试！</h2>
  </div>
</template>

<script>
import { checkEmailToken } from "@/axios/api";
//导出组件
export default {
  data() {
    return {
      loading: true,
      showSuccess: false,
      showFail: false,
      email: ""
    };
  },
  mounted() {},
  created() {
    console.log(this.$route.params.token);
    checkEmailToken({
      token: this.$route.params.token
    })
      .then(res => {
        this.email = res.data.email;
        this.loading = false;
        this.showSuccess = true;
        console.log(res, "请求成功");
      })
      .catch(err => {
        this.loading = false;
        this.showFail = true;
        console.log(err, "请求失败");
      });
  },
  methods: {}
};
</script>

<style lang="stylus" scoped>
#center {
  text-align: center;
  padding: 100px 0;
}
</style>