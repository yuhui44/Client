<template>
  <div>
    <el-button icon="el-icon-i-regist" @click="registDialogVisible=true">注册</el-button>
    <el-button icon="el-icon-i-login">登录</el-button>
    <el-dropdown>
      <el-button icon="el-icon-i-user">yuhui44
        <i class="el-icon-user el-icon-right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 注册用户弹出框 -->
    <el-dialog title="注册账号" :visible.sync="registDialogVisible" width="300px">
      <el-form :model="registForm">
        <!-- 邮箱 -->
        <el-form-item prop="email">
          <el-input v-model="registForm.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="registForm.password" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item prop="checkPassword">
          <el-input v-model="registForm.checkPassword" type="password" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item class="floatRight">
          <el-button type="primary" @click="submitForm('registerForm')" style="width: 260px;">注册</el-button>
          <!-- <el-button type="info" @click="registerFormVisible = false, loginFormVisible = true">登录</el-button> -->
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registDialogVisible: false,
      registForm: {
        email: "",
        password: "",
        checkPassword: ""
      }
    };
  }
};
</script>
