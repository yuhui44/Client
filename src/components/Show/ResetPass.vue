<template>
  <div>
    <div id="center">
      <h1>密码重置</h1>
      <h2 v-if="loading">正在验证链接，请稍等...</h2>
      <h2 v-if="showSuccess">账号“{{email}}”的密码重置成功！</h2>
      <h2 v-if="showFail">链接已失效，请重新发起密码重置！</h2>
    </div>
    <el-form id="form" v-if="resetPassFormVisible" :model="resetPassForm" status-icon label-width="100px" :rules="resetPassFormRules" ref="resetPassForm">
      <el-form-item label="新密码" prop="password">
        <el-input v-model="resetPassForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="checkPassword">
        <el-input v-model="resetPassForm.checkPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="resetPassSubmit()">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { resetPass1, resetPass2 } from "@/axios/api";
//导出组件
export default {
  data() {
    //验证注册密码
    var validataPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(value)) {
        callback(new Error("必须包含字母和数字！"));
      } else if (!/^.{8,20}$/.test(value)) {
        callback(new Error("至少8个字符！"));
      } else {
        this.$refs.resetPassForm.validateField("checkPassword");
        callback();
      }
    };
    //验证注册确认密码
    var validataPass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.resetPassForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loading: true,
      showSuccess: false,
      showFail: false,
      email: "",
      resetPassFormVisible: false,
      resetPassForm: {
        password: "",
        checkPassword: ""
      },
      resetPassFormRules: {
        password: [
          { required: true, validator: validataPass, trigger: "blur" }
        ],
        checkPassword: [
          { required: true, validator: validataPass2, trigger: "blur" }
        ]
      }
    };
  },
  mounted() {},
  created() {
    console.log(this.$route.params.token);
    resetPass1({
      token: this.$route.params.token
    })
      .then(res => {
        this.loading = false;
        this.resetPassFormVisible = true;
        console.log(res, "请求成功");
      })
      .catch(err => {
        this.loading = false;
        this.showFail = true;
        console.log(err, "请求失败");
      });
  },
  methods: {
    resetPassSubmit() {
      this.$refs.resetPassForm.validate(valid => {
        if (valid) {
          resetPass2({
            token: this.$route.params.token,
            password: this.resetPassForm.password
          })
            .then(res => {
              this.email = res.data.email;
              this.showSuccess = true;
              this.resetPassFormVisible = false;
              console.log(res, "请求成功");
            })
            .catch(err => {
              this.resetPassFormVisible = false;
              thid.showFail = true;
              console.log(err, "请求失败");
            });
        } else {
          this.$message({
            message: "请填写新密码",
            type: "error"
          });
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
#center {
  text-align: center;
}

#form {
  max-width: 400px;
  margin: 0 auto;
}
</style>