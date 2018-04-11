<template>
  <div>
    <el-table :data="allPropertysInfo" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="产权ID">
              <span>{{ props.row._id || 'null' }}</span>
            </el-form-item>
            <el-form-item label="产权名">
              <span>{{ props.row.propertyName|| 'null' }}</span>
            </el-form-item>
            <el-form-item label="发布者ID">
              <span>{{ props.row.publisher._id || 'null' }}</span>
            </el-form-item>
            <el-form-item label="发布者用户名">
              <span>{{ props.row.publisher.username|| 'null' }}</span>
            </el-form-item>
            <el-form-item label="发布者邮箱">
              <span>{{ props.row.publisher.email|| 'null' }}</span>
            </el-form-item>
            <el-form-item label="是否发布">
              <span>{{ props.row.isPublish ? '发布中' : '未发布' }}</span>
            </el-form-item>
            <el-form-item label="是否售出">
              <span>{{ props.row.isSelt ? '已售出' : '出售中' }}</span>
            </el-form-item>
            <el-form-item label="状态">
              <span>{{ props.row.isDisable ? '被禁用' : '正常' }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ new Date(props.row.createTime).toLocaleString() || 'null' }}</span>
            </el-form-item>
            <el-form-item label="编辑时间">
              <span>{{ new Date(props.row.editTime).toLocaleString() || 'null' }}</span>
            </el-form-item>
            <el-form-item label="摘要">
              <span>{{ props.row.summary || 'null' }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="_id" label="产权ID" min-width="210">
      </el-table-column>
      <el-table-column prop="propertyName" label="产权名" min-width="150">
      </el-table-column>
      <el-table-column prop="publisher._id" label="发布者ID" min-width="210">
      </el-table-column>
      <el-table-column prop="publisher.username" label="发布者用户名" min-width="110">
      </el-table-column>
      <el-table-column prop="publisher.email" label="发布者邮箱" min-width="170">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="50">
        <template slot-scope="scope">
          <el-button @click="editPropertyInfo(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改产权信息弹窗 -->
    <el-dialog :title="propertyInfoDialogTitle" :visible.sync="propertyInfoDialogVisible" width="340px" :append-to-body=true>
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
        <el-form-item label="是否禁用">
          <el-switch v-model="propertyInfoForm.isDisabled"></el-switch>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-date-picker v-model="propertyInfoForm.createTime" type="datetime"></el-date-picker>
        </el-form-item>
        <el-form-item label="修改时间" prop="editTime">
          <el-date-picker v-model="propertyInfoForm.editTime" type="datetime"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="postPropertyInfo2()">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>


<script>
import {
  getAllPropertysInfo,
  getPropertyInfo,
  postPropertyInfo
} from "@/axios/api";
//导出组件
export default {
  data() {
    return {
      allPropertysInfo: [],
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
    this.getAllPropertysInfo2();
  },
  methods: {
    getAllPropertysInfo2() {
      getAllPropertysInfo()
        .then(res => {
          console.log(res, "请求成功");
          this.allPropertysInfo = res.data.propertys;
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
        console.log("姿势不对哦，参数去哪了？");
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
              this.getAllPropertysInfo2();
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