<template>
  <div>
    <el-form :model="userInfoForm" status-icon label-width="80px" :rules="userInfoFormRules" ref="userInfoForm">
      <el-form-item label="用户ID">
        <span class="el-checkbox__label">{{user_id}}</span>
      </el-form-item>
      <el-form-item label="账户状态">
        <span class="el-checkbox__label">{{ isDisabled ? '账户已被禁用，请与管理员联系' : '账户正常'}}</span>
      </el-form-item>
      <el-form-item label="邮箱">
        <span class="el-checkbox__label">{{email}}</span>
      </el-form-item>
      <el-form-item label="注册时间">
        <span class="el-checkbox__label">{{createTime}}</span>
        <!-- <el-date-picker disabled v-model="createTime" type="datetime">
        </el-date-picker> -->
      </el-form-item>
      <el-form-item label="邮箱状态">
        <span class="el-checkbox__label">{{ emailConfirmation ? '邮箱已验证' : '邮箱未验证，请尽快验证（如果长时间未收到验证邮件，请修改邮箱）'}}</span>
        <el-button plain size="small" v-if="!emailConfirmation" @click="resendEmail2()">重新发送验证邮件</el-button>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userInfoForm.username"></el-input>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="userInfoForm.telephone"></el-input>
      </el-form-item>
      <el-form-item label="QQ号码">
        <el-input v-model="userInfoForm.qqNumber"></el-input>
      </el-form-item>
      <el-form-item label="微信号">
        <el-input v-model="userInfoForm.wechat"></el-input>
      </el-form-item>
      <el-form-item label="邮件消息">
        <el-switch v-model="userInfoForm.message"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="postUserInfo2()">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import { getUserInfo, postUserInfo, resendEmail } from "@/axios/api";
//导出组件
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
    return {
      userInfoForm: {
        username: "加载中...",
        telephone: "加载中...",
        qqNumber: "加载中...",
        wechat: "加载中...",
        message: true
      },
      user_id: "加载中...",
      email: "加载中...",
      emailConfirmation: null,
      isDisabled: null,
      createTime: null,
      userInfoFormRules: {
        username: [
          { required: true, validator: validataUsername, trigger: "blur" }
        ]
      }
    };
  },
  mounted() {},
  created() {
    this.getUserInfo2();
  },
  methods: {
    getUserInfo2() {
      getUserInfo()
        .then(res => {
          console.log(res, "请求成功");
          this.user_id = res.data.user_id || "";
          this.emailConfirmation = res.data.emailConfirmation;
          this.isDisabled = res.data.isDisabled;
          this.createTime = new Date(res.data.createTime).toLocaleString('chinese',{hour12:false}) || "";
          this.userInfoForm.username = res.data.username || "";
          this.email = res.data.email || "";
          this.userInfoForm.telephone = res.data.telephone || "";
          this.userInfoForm.qqNumber = res.data.qqNumber || "";
          this.userInfoForm.wechat = res.data.wechat || "";
          this.userInfoForm.message = res.data.message;
        })
        .catch(err => {
          console.log(err, "请求错误");
        });
    },
    postUserInfo2() {
      this.$refs.userInfoForm.validate(valid => {
        if (valid) {
          postUserInfo(this.userInfoForm)
            .then(res => {
              console.log(res, "请求成功");
              this.getUserInfo2();
            })
            .catch(err => {
              console.log(err, "请求失败");
            });
        } else {
          this.$message({
            message: "请正确填写用户名",
            type: "error"
          });
        }
      });
    },
    resendEmail2() {
      resendEmail()
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

<style lang="stylus" scoped>
.el-input {
  max-width: 300px;
}
</style>