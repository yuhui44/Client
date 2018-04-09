<template>
  <div class="user-status">
    <el-button size="medium" icon="el-icon-yuhui44-regist" @click="registerDialogVisible=true" v-if="showLoginButton">注册</el-button>
    <el-button size="medium" icon="el-icon-yuhui44-login" @click="loginDialogVisible=true" v-if="showLoginButton">登录</el-button>
    <el-dropdown v-if="showLogoutButton">
      <el-button size="medium" icon="el-icon-yuhui44-user">{{username}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="goToUserCenter()">
          用户中心
          <!-- <router-link to="/user">用户中心</router-link> -->
        </el-dropdown-item>
        <el-dropdown-item @click.native="logoutSubmit()">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 注册用户弹出框 -->
    <el-dialog title="注册" :visible.sync="registerDialogVisible" width="300px" :append-to-body=true>
      <el-form :model="registerForm" status-icon :rules="registerFormRules" ref="registerForm">
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
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 登录用户弹出框 -->
    <el-dialog title="登录" :visible.sync="loginDialogVisible" width="300px" :append-to-body=true>
      <el-form :model="loginForm" status-icon :rules="loginFormRules" ref="loginForm">
        <!-- 用户名或邮箱 -->
        <el-form-item prop="account">
          <el-input v-model="loginForm.account" placeholder="用户名或邮箱"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" @click="showResetPass()" style="float: right;">忘记密码</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginSubmit()" style="width: 260px;">登录</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 重置密码弹出框 -->
    <el-dialog title="重置密码" :visible.sync="resetPassDialogVisible" width="300px" :append-to-body=true>
      <el-form :model="resetPassForm" status-icon :rules="resetPassFormRules" ref="resetPassForm">
        <!-- 用户名或邮箱 -->
        <el-form-item prop="account">
          <el-input v-model="resetPassForm.account" placeholder="用户名或邮箱"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetPassSubmit()" style="width: 260px;">发送重置密码邮件</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  userRegister,
  userLogin,
  userLogout,
  userStatus,
  forgetPass
} from "@/axios/api";
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
      } else if (!/^.{8,20}$/.test(value)) {
        callback(new Error("至少8个字符！"));
      } else {
        this.$refs.registerForm.validateField("checkPassword");
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
      } else if (
        (!/^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]{4,20}$/.test(value) ||
          /^[0-9]*$/.test(value)) &&
        !/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(
          value
        )
      ) {
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
      } else if (!/^.{8,20}$/.test(value)) {
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
        password: [{ required: true, validator: validataPass3, triger: "blur" }]
      },
      //显示注册、登录按钮
      showLoginButton: false,
      //显示个人中心、退出
      showLogoutButton: false,
      //用户名
      username: "",
      resetPassDialogVisible: false,
      resetPassForm: {
        account: ""
      },
      resetPassFormRules: {
        account: [
          { required: true, validator: validataAccount, trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.getUserStatus();
  },
  methods: {
    registerSubmit() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          userRegister({
            username: this.registerForm.username,
            email: this.registerForm.email,
            password: this.registerForm.password
          })
            .then(res => {
              this.registerDialogVisible = false;
              console.log(res, "请求成功");
              this.getUserStatus();
            })
            .catch(err => {
              console.log(err, "请求失败");
            });
        } else {
          this.$message({
            message: "请完成填写注册信息",
            type: "error"
          });
        }
      });
    },
    loginSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          userLogin({
            account: this.loginForm.account,
            password: this.loginForm.password
          })
            .then(res => {
              this.loginDialogVisible = false;
              console.log(res, "请求成功");
              this.getUserStatus();
            })
            .catch(err => {
              console.log(err, "请求失败");
            });
        } else {
          this.$message({
            message: "请完整填写登录信息",
            type: "error"
          });
        }
      });
    },
    logoutSubmit() {
      userLogout()
        .then(res => {
          console.log(res, "请求成功");
          this.getUserStatus();
        })
        .catch(err => {
          console.log(err, "请求失败");
          this.$message({
            message: "退出失败，请稍后重试。",
            type: "error"
          });
        });
    },
    getUserStatus() {
      userStatus()
        .then(res => {
          console.log(res, "请求成功");
          this.username = res.data.username;
          this.showLoginButton = !res.data.isLogin;
          this.showLogoutButton = res.data.isLogin;
        })
        .catch(err => {
          console.log(err, "请求错误");
          this.$message("后端服务异常，请与管理员联系。");
        });
    },
    goToUserCenter() {
      this.$router.push({ path: "/user" });
      console.log("111");
    },
    showResetPass() {
      this.loginDialogVisible = false;
      this.resetPassDialogVisible = true;
    },
    resetPassSubmit() {
      this.$refs.resetPassForm.validate(valid => {
        if (valid) {
          forgetPass(this.resetPassForm)
            .then(res => {
              this.resetPassDialogVisible = false;
              console.log(res, "请求成功");
            })
            .catch(err => {
              console.log(err, "请求失败");
            });
        } else {
          this.$message({
            message: "请填写账号信息",
            type: "error"
          });
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-dropdown-menu {
  margin-top: 0px;
}

.user-status {
  margin-right: 5px;
}
</style>