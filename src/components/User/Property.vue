<template>
  <div>
    <el-button @click="editPropertyInfo()">发布新产权</el-button>
    <el-table :data="propertysInfo" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="产权ID">
              <span>{{ props.row._id || 'null' }}</span>
            </el-form-item>
            <el-form-item label="产权名">
              <span>{{ props.row.propertyName|| 'null' }}</span>
            </el-form-item>
            <el-form-item label="是否发布">
              <span>{{ props.row.isPublish ? '发布中' : '未发布' }}</span>
            </el-form-item>
            <el-form-item label="是否售出">
              <span>{{ props.row.isSelt ? '已售出' : '出售中' }}</span>
            </el-form-item>
            <el-form-item label="状态">
              <span>{{ props.row.isDisabled ? '被禁用' : '正常' }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ new Date(props.row.createTime).toLocaleString('chinese',{hour12:false}) || 'null' }}</span>
            </el-form-item>
            <el-form-item label="编辑时间">
              <span>{{ new Date(props.row.editTime).toLocaleString('chinese',{hour12:false}) || 'null' }}</span>
            </el-form-item>
            <el-form-item label="摘要">
              <span>{{ props.row.summary || 'null' }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="_id" label="产权ID" min-width="210">
      </el-table-column>
      <el-table-column prop="propertyName" label="产权名" min-width="120">
      </el-table-column>
      <!-- <el-table-column prop="email" label="邮箱" min-width="200">
      </el-table-column> -->
      <el-table-column fixed="right" label="操作" width="90px">
        <template slot-scope="scope">
          <el-button @click="getWantsInfo2(scope.row)" type="text" size="small">意向</el-button>
          <el-button @click="editPropertyInfo(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改产权信息弹窗 -->
    <el-dialog :title="propertyInfoDialogTitle" :visible.sync="propertyInfoDialogVisible" :append-to-body=true custom-class="property-info">
      <el-form :model="propertyInfoForm" status-icon label-width="80px" :rules="propertyInfoFormRules" ref="propertyInfoForm">
        <el-form-item label="产权名" prop="propertyName">
          <el-input v-model="propertyInfoForm.propertyName"></el-input>
        </el-form-item>
        <el-form-item label="摘要" prop="summary">
          <el-input v-model="propertyInfoForm.summary"></el-input>
        </el-form-item>
        <el-form-item label="详情" prop="detail">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="propertyInfoForm.detail"></el-input>
        </el-form-item>
        <el-form-item label="是否发布">
          <el-switch v-model="propertyInfoForm.isPublish"></el-switch>
        </el-form-item>
        <el-form-item label="是否售出">
          <el-switch v-model="propertyInfoForm.isSelt"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="postPropertyInfo2()">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 查看需求弹窗 -->
    <el-dialog :title="propertyWantsDialogTitle" :visible.sync="propertyWantsDialogVisible" :append-to-body=true custom-class="property-wants">
      <el-table :data="propertyWantsInfo" border style="width: 100%">
        <el-table-column prop="wanter._id" label="意向者ID">
        </el-table-column>
        <el-table-column prop="wanter.username" label="用户名">
        </el-table-column>
        <el-table-column prop="wanter.email" label="邮箱">
        </el-table-column>
        <el-table-column prop="wanter.telephone" label="电话">
        </el-table-column>
        <el-table-column prop="wanter.qqNumber" label="QQ号码">
        </el-table-column>
        <el-table-column prop="wanter.wechat" label="微信号">
        </el-table-column>
        <el-table-column prop="message" label="留言">
        </el-table-column>
        <el-table-column label="时间">
          <template slot-scope="scope">
            <div class="cell">{{new Date(scope.row.createTime).toLocaleString('chinese',{hour12:false})}}</div>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>


<script>
import {
  getPropertysInfo,
  getPropertyInfo,
  postPropertyInfo,
  getWantsInfo
} from "@/axios/api";
//导出组件
export default {
  data() {
    return {
      propertyWantsInfo: [],
      propertyWantsDialogVisible: false,
      propertyWantsDialogTitle: "产权意向信息",
      propertyWantsInfo: [],
      propertysInfo: [],
      propertyInfoForm: {},
      propertyInfoDialogVisible: false,
      propertyInfoDialogTitle: "新建或修改产权信息",
      propertyInfoFormRules: {
        propertyName: [
          { required: true, message: "请填写产权名", trigger: "blur" }
        ],
        summary: [{ required: true, message: "请填写摘要", trigger: "blur" }],
        detail: [{ required: true, message: "请填写详情", trigger: "blur" }]
      }
    };
  },
  mounted() {},
  created() {
    this.getPropertysInfo2();
  },
  methods: {
    getPropertysInfo2() {
      getPropertysInfo()
        .then(res => {
          console.log(res, "请求成功");
          this.propertysInfo = res.data.propertys;
        })
        .catch(err => {
          console.log(err, "请求错误");
        });
    },
    editPropertyInfo(rowInfo) {
      if (rowInfo) {
        getPropertyInfo({
          _id: rowInfo._id
        })
          .then(res => {
            console.log(res, "请求成功");
            this.propertyInfoForm = res.data.property;
            this.propertyInfoDialogTitle =
              "编辑产权（ID：" + res.data.property._id + "）";
            this.propertyInfoDialogVisible = true;
          })
          .catch(err => {
            console.log(err, "请求错误");
          });
      } else {
        this.propertyInfoForm = {
          isPublish: true,
          isSelt: false
        };
        this.propertyInfoDialogTitle = "新建产权信息";
        this.propertyInfoDialogVisible = true;
      }
    },
    postPropertyInfo2() {
      this.$refs.propertyInfoForm.validate(valid => {
        if (valid) {
          postPropertyInfo(this.propertyInfoForm)
            .then(res => {
              console.log(res, "请求成功");
              this.propertyInfoDialogVisible = false;
              this.propertyInfoForm = {};
              this.getPropertysInfo2();
            })
            .catch(err => {
              console.log(err, "请求错误");
            });
        } else {
          this.$message({
            message: "请完整填写产权信息",
            type: "error"
          });
        }
      });
    },
    getWantsInfo2(rowInfo) {
      if (rowInfo) {
        getWantsInfo({
          _id: rowInfo._id
        })
          .then(res => {
            console.log(res, "请求成功");
            if (res.data.wants) {
              this.propertyWantsInfo = res.data.wants;
              this.propertyWantsDialogTitle =
                "产权意向信息（ID：" + rowInfo._id + "）";
              this.propertyWantsDialogVisible = true;
            }
          })
          .catch(err => {
            console.log(err, "请求错误");
          });
      }
    }
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

<style lang="stylus">
.property-wants, .property-info {
  width: 900px;
}

@media (max-width: 900px) {
  .property-wants, .property-info {
    width: 100%;
  }
}
</style>