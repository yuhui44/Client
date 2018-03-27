<template>
  <el-container>
    <el-header>
      <user-status></user-status>
    </el-header>
    <el-container>
      <el-aside>
      </el-aside>
      <el-main>
        <p>hello</p>
      </el-main>
    </el-container>
    <el-footer>
    </el-footer>
  </el-container>
</template>

<script>
//引入用户状态组件
import UserStatus from '@/components/Common/UserStatus';
//导出组件
export default {
  // name: 'Main',
  components: {
    'user-status': UserStatus
  },
  data() {
    return {
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
