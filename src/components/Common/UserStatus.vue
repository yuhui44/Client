<template>
  <div>
    <el-button icon="el-icon-i-regist" @click="registerDialogVisible=true">注册</el-button>
    <el-button icon="el-icon-i-login" @click="loginDialogVisible=true">登录</el-button>
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
    <el-dialog title="注册" :visible.sync="registerDialogVisible" width="300px">
      <el-form :model="registerForm" :rules="registerFormRules" ref="registerForm">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="registerForm.username" placeholder="用户名"></el-input>
        </el-form-item>
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
    <!-- 登录用户弹出框 -->
    <el-dialog title="登录" :visible.sync="loginDialogVisible" width="300px">
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm">
        <!-- 用户名或邮箱 -->
        <el-form-item prop="account">
          <el-input v-model="loginForm.account" placeholder="用户名或邮箱"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginSubmit()" style="width: 260px;">登录</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { userRegister, userLogin } from "@/axios/api";
export default {
  data() {
    //验证注册用户名
    var validataUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!/^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(value)) {
        callback(new Error("不可包含特殊符号！"));
      } else if (/^[0-9]+$/.test(value)) {
        callback(new Error("不可由纯数字组成"));
      } else if (!/^.{4,20}$/.test(value)) {
        callback(new Error("至少4个字符！"));
      } else {
        callback();
      }
    };
    //验证注册密码
    var validataPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(value)) {
        callback(new Error("必须包含字母和数字！"));
      } else if(!/^.{8,20}$/.test(value)) {
        callback(new Error("至少8个字符！"));
      } else {
        this.$refs.registerForm.validataField("checkPassword");
        callback();
      }
    };
    //验证注册确认密码
    var validataPass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    //验证登录账户
    var validataAccount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名或邮箱"));
      } else if (((!/^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]{4,20}$/.test(value)) || (/^[0-9]*$/.test(value))) && !/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value)) {
        callback(new Error("格式有误！"));
      } else {
        callback();
      }
    };
    //验证登录密码
    var validataPass3 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(value)) {
        callback(new Error("必须包含字母和数字！"));
      } else if(!/^.{8,20}$/.test(value)) {
        callback(new Error("至少8个字符！"));
      } else {
        callback();
      }
    };
    return {
      registerDialogVisible: false,
      registerForm: {
        username: "yuhui44",
        email: "yuhui44@live.cn",
        password: "ma123456",
        checkPassword: "ma123456"
      },
      registerFormRules: {
        username: [
          { required: true, validator: validataUsername, trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur,change"
          }
        ],
        password: [
          { required: true, validator: validataPass, trigger: "blur" }
        ],
        checkPassword: [
          { required: true, validator: validataPass2, trigger: "blur" }
        ]
      },
      loginDialogVisible: false,
      loginForm: {
        account: "yuhui44",
        password: "ma123456"
      },
      loginFormRules: {
        account: [
          { required: true, validator: validataAccount, trigger: "blur" }
        ],
        password: [
          { required: true, validator: validataPass3, triger: "blur" }
        ]
      }
    };
  },
  methods: {
    registerSubmit() {
      userRegister({
        username: this.registerForm.username,
        email: this.registerForm.email,
        password: this.registerForm.password
      })
        .then(res => {
          console.log(res, "请求成功");
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
    },
    loginSubmit() {
      userLogin({
        account: this.loginForm.account,
        password: this.loginForm.password
      })
        .then(res => {
          console.log(res, "请求成功");
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
    }
  }
};
</script>
