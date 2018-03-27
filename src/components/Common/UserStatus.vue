<template>
  <div>
    <el-button icon="el-icon-i-regist" @click="registerDialogVisible=true">注册</el-button>
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
    <el-dialog title="注册账号" :visible.sync="registerDialogVisible" width="300px">
      <el-form :model="registerForm" :rules="registerFormRules" ref="registerForm">
        <!-- 邮箱 -->
        <el-form-item prop="email">
          <el-input v-model="registerForm.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="registerForm.password" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item prop="checkPassword">
          <el-input v-model="registerForm.checkPassword" type="password" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item class="floatRight">
          <el-button type="primary" @click="registerSubmit()" style="width: 260px;">注册</el-button>
          <!-- <el-button type="info" @click="registerFormVisible = false, loginFormVisible = true">登录</el-button> -->
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {userRegister} from '@/axios/api';
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.checkPassword !== "") {
          this.$refs.registerForm.validateField("checkPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerDialogVisible: false,
      registerForm: {
        email: "",
        password: "",
        checkPassword: ""
      },
      registerFormRules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur,change"
          }
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        checkPassword: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    registerSubmit() {
      userRegister(this.registerForm.email, this.registerForm.password).then(res =>{
        console.log(res, '请求成功');
      }).catch(err => {
        console.log(err, '请求失败');
      })
    }
  }
};
</script>
