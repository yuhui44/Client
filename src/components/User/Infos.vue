<template>
  <div>
    <el-table :data="usersInfo" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="用户ID">
              <span>{{ props.row._id || 'null' }}</span>
            </el-form-item>
            <el-form-item label="用户名">
              <span>{{ props.row.username || 'null' }}</span>
            </el-form-item>
            <el-form-item label="邮箱">
              <span>{{ props.row.email || 'null' }}</span>
            </el-form-item>
            <el-form-item label="电话号码">
              <span>{{ props.row.telephone || 'null' }}</span>
            </el-form-item>
            <el-form-item label="QQ号码">
              <span>{{ props.row.qqNumber || 'null' }}</span>
            </el-form-item>
            <el-form-item label="微信号">
              <span>{{ props.row.wechat || 'null' }}</span>
            </el-form-item>
            <el-form-item label="注册时间">
              <span>{{ new Date(props.row.createTime).toLocaleString() || 'null' }}</span>
            </el-form-item>
            <el-form-item label="邮件提醒">
              <span>{{ props.row.message ? '是' : '否' }}</span>
            </el-form-item>
            <el-form-item label="验证邮箱">
              <span>{{ props.row.emailConfirmation ? '已验证' : '未验证' }}</span>
            </el-form-item>
            <el-form-item label="管理员">
              <span>{{ props.row.isAdmin ? '是' : '否' }}</span>
            </el-form-item>
            <el-form-item label="状态">
              <span>{{ props.row.isDisabled ? '被禁用' : '正常' }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="_id" label="用户ID" min-width="210">
      </el-table-column>
      <el-table-column prop="username" label="用户名" min-width="120">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" min-width="200">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="50">
        <template slot-scope="scope">
          <el-button @click="editUserInfo(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改用户信息弹窗 -->
    <el-dialog title="修改用户信息" :visible.sync="userInfoDialogVisible" width="340px" :append-to-body=true>
      <el-form :model="userInfoForm" status-icon label-width="80px" :rules="userInfoFormRules" ref="userInfoForm">
        <el-form-item label="用户ID">
          <span class="el-checkbox__label">{{userInfoForm._id}}</span>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userInfoForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userInfoForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="telephone">
          <el-input v-model="userInfoForm.telephone"></el-input>
        </el-form-item>
        <el-form-item label="QQ号码" prop="qqNumber">
          <el-input v-model="userInfoForm.qqNumber"></el-input>
        </el-form-item>
        <el-form-item label="微信号" prop="wechat">
          <el-input v-model="userInfoForm.wechat"></el-input>
        </el-form-item>
        <el-form-item label="注册时间" prop="createTime">
          <el-date-picker v-model="userInfoForm.createTime" type="datetime"></el-date-picker>
        </el-form-item>
        <el-form-item label="邮件消息">
          <el-switch v-model="userInfoForm.message"></el-switch>
        </el-form-item>
        <el-form-item label="验证邮箱">
          <el-switch v-model="userInfoForm.emailConfirmation"></el-switch>
        </el-form-item>
        <el-form-item label="管理员">
          <el-switch v-model="userInfoForm.isAdmin"></el-switch>
        </el-form-item>
        <el-form-item label="禁用账号">
          <el-switch v-model="userInfoForm.isDisabled"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="postUserInfo2()">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>


<script>
import { getUsersInfo, postUserInfo } from "@/axios/api";
//导出组件
export default {
  data() {
    //验证用户名
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
      usersInfo: [],
      userInfoForm: {},
      userInfoDialogVisible: false,
      userInfoFormRules: {
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
        ]
      }
    };
  },
  mounted() {},
  created() {
    this.getUsersInfo2();
  },
  methods: {
    getUsersInfo2() {
      getUsersInfo()
        .then(res => {
          console.log(res, "请求成功");
          this.usersInfo = res.data.users;
        })
        .catch(err => {
          console.log(err, "请求错误");
        });
    },
    editUserInfo(rowInfo) {
      console.log(rowInfo);
      this.userInfoForm = JSON.parse(JSON.stringify(rowInfo));
      this.userInfoDialogVisible = true;
    },
    postUserInfo2() {
      postUserInfo(this.userInfoForm)
        .then(res => {
          console.log(res, "请求成功");
          this.userInfoDialogVisible = false;
          this.userInfoForm = {};
          this.getUsersInfo2();
        })
        .catch(err => {
          console.log(err, "请求错误");
        });
    },
  }
};
</script>

<style lang="stylus" scoped>
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  min-width: 300px;
}
</style>