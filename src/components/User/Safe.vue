<template>
  <div>
    <h3>修改密码</h3>
    <el-form :model="changePassForm" status-icon label-width="100px" :rules="changePassFormRules" ref="changePassForm">
      <el-form-item label="原密码" prop="oldPassword">
        <el-input v-model="changePassForm.oldPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="changePassForm.newPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="checkNewPassword">
        <el-input v-model="changePassForm.checkNewPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changePass2()">确定</el-button>
      </el-form-item>
    </el-form>
    <h3>修改邮箱</h3>
    <el-form :model="changeEmailForm" status-icon label-width="100px" :rules="changeEmailFormRules" ref="changeEmailForm">
      <el-form-item label="密码" prop="password">
        <el-input v-model="changeEmailForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新邮箱" prop="email">
        <el-input v-model="changeEmailForm.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changeEmail2()">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { changePass, changeEmail } from "@/axios/api";
//导出组件
export default {
  data() {
    //验证旧密码
    var validataPass1 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入原密码"));
      } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(value)) {
        callback(new Error("必须包含字母和数字！"));
      } else if (!/^.{8,20}$/.test(value)) {
        callback(new Error("至少8个字符！"));
      } else {
        this.$refs.changePassForm.validateField("newPassword");
        callback();
      }
    };
    //验证新密码
    var validataPass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(value)) {
        callback(new Error("必须包含字母和数字！"));
      } else if (!/^.{8,20}$/.test(value)) {
        callback(new Error("至少8个字符！"));
      } else if (value === this.changePassForm.oldPassword) {
        callback(new Error("必须与原密码不同！"));
      } else {
        this.$refs.changePassForm.validateField("checkNewPassword");
        callback();
      }
    };
    //验证确认新密码
    var validataPass3 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.changePassForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    //验证密码
    var validataPass4 = (rule, value, callback) => {
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
      changePassForm: {
        oldPassword: "",
        newPassword: "",
        checkNewPassword: ""
      },
      changePassFormRules: {
        oldPassword: [
          { required: true, validator: validataPass1, trigger: "blur" }
        ],
        newPassword: [
          { required: true, validator: validataPass2, trigger: "blur" }
        ],
        checkNewPassword: [
          { required: true, validator: validataPass3, trigger: "blur" }
        ]
      },
      changeEmailForm: {
        password: '',
        email: ''
      },
      changeEmailFormRules: {
        password: [
          { required: true, validator: validataPass4, trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur,change"
          }
        ]
      }
    };
  },
  mounted() {},
  created() {},
  methods: {
    changePass2() {
      this.$refs.changePassForm.validate(valid => {
        if (valid) {
          changePass({
            oldPassword: this.changePassForm.oldPassword,
            newPassword: this.changePassForm.newPassword
          })
            .then(res => {
              console.log(res, "请求成功");
            })
            .catch(err => {
              console.log(err, "请求失败");
            });
        } else {
          this.$message({
            message: '请填写原密码和新密码',
            type: 'error'
          })
        }
      });
    },
    changeEmail2() {
      this.$refs.changeEmailForm.validate(valid => {
        if (valid) {
          changeEmail(this.changeEmailForm)
            .then(res => {
              console.log(res, "请求成功");
            })
            .catch(err => {
              console.log(err, "请求失败");
            });
        } else {
          this.$message({
            message: '请填写密码和新邮箱',
            type: 'error'
          })
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-input {
  max-width: 300px;
}
</style>