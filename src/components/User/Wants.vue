<template>
  <div>
    <el-table :data="wantsInfo" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="产权ID">
              <span>{{ props.row.property._id || 'null' }}</span>
            </el-form-item>
            <el-form-item label="产权名">
              <span>{{ props.row.property.propertyName || 'null' }}</span>
            </el-form-item>
            <el-form-item label="意向者ID">
              <span>{{ props.row.wanter._id || 'null' }}</span>
            </el-form-item>
            <el-form-item label="用户名">
              <span>{{ props.row.wanter.username || 'null' }}</span>
            </el-form-item>
            <el-form-item label="邮箱">
              <span>{{ props.row.wanter.email || 'null' }}</span>
            </el-form-item>
            <el-form-item label="电话">
              <span>{{ props.row.wanter.telephone || 'null' }}</span>
            </el-form-item>
            <el-form-item label="QQ号码">
              <span>{{ props.row.wanter.qqNumber || 'null' }}</span>
            </el-form-item>
            <el-form-item label="微信号">
              <span>{{ props.row.wanter.wechat || 'null' }}</span>
            </el-form-item>
            <el-form-item label="留言">
              <span>{{ props.row.message || 'null' }}</span>
            </el-form-item>
            <el-form-item label="时间">
              <span>{{ new Date(props.row.createTime).toLocaleString('chinese',{hour12:false}) || 'null' }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="property._id" label="产权名">
      </el-table-column>
      <el-table-column prop="wanter.username" label="用户名">
      </el-table-column>
      <el-table-column prop="message" label="留言">
      </el-table-column>
      <el-table-column label="时间">
        <template slot-scope="scope">
          <div class="cell">{{new Date(scope.row.createTime).toLocaleString('chinese',{hour12:false})}}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getWantsInfo } from "@/axios/api";
//导出组件
export default {
  data() {
    return {
      wantsInfo: []
    };
  },
  mounted() {},
  created() {
    this.getWantsInfo2();
  },
  methods: {
    getWantsInfo2() {
      getWantsInfo()
        .then(res => {
          console.log(res, "请求成功");
          this.wantsInfo = res.data.wants;
        })
        .catch(err => {
          console.log(err, "请求错误");
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