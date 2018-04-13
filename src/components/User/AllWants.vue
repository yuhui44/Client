<template>
  <div>
    <el-table :data="allWantsInfo" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="产权ID">
              <span>{{ props.row.property._id || 'null' }}</span>
            </el-form-item>
            <el-form-item label="产权名">
              <span>{{ props.row.property.propertyName || 'null' }}</span>
            </el-form-item>
            <el-form-item label="产权是否禁用">
              <span>{{ props.row.property.isDisabled ? '被禁用' : '未被禁用' }}</span>
            </el-form-item>
            <el-form-item label="产权是否发布">
              <span>{{ props.row.property.isPublish ? '发布中' : '未发布' }}</span>
            </el-form-item>
            <el-form-item label="产权是否售出">
              <span>{{ props.row.property.isSelt ? '已售出' : '未售出' }}</span>
            </el-form-item>
            <el-form-item label="持有者ID">
              <span>{{ props.row.keeper._id || 'null' }}</span>
            </el-form-item>
            <el-form-item label="持有者名">
              <span>{{ props.row.keeper.username || 'null' }}</span>
            </el-form-item>
            <el-form-item label="持有者邮箱">
              <span>{{ props.row.keeper.email || 'null' }}</span>
            </el-form-item>
            <el-form-item label="持有者状态">
              <span>{{ props.row.keeper.isDisabled ? '被禁用' : '正常' }}</span>
            </el-form-item>
            <el-form-item label="持有者电话">
              <span>{{ props.row.keeper.telephone || 'null' }}</span>
            </el-form-item>
            <el-form-item label="持有者QQ号码">
              <span>{{ props.row.keeper.qqNumber || 'null' }}</span>
            </el-form-item>
            <el-form-item label="持有者微信号">
              <span>{{ props.row.keeper.wechat || 'null' }}</span>
            </el-form-item>
            <el-form-item label="意向者ID">
              <span>{{ props.row.wanter._id || 'null' }}</span>
            </el-form-item>
            <el-form-item label="意向者名">
              <span>{{ props.row.wanter.username || 'null' }}</span>
            </el-form-item>
            <el-form-item label="意向者邮箱">
              <span>{{ props.row.wanter.email || 'null' }}</span>
            </el-form-item>
            <el-form-item label="意向者状态">
              <span>{{ props.row.wanter.isDisabled ? '被禁用' : '正常' }}</span>
            </el-form-item>
            <el-form-item label="意向者电话">
              <span>{{ props.row.wanter.telephone || 'null' }}</span>
            </el-form-item>
            <el-form-item label="意向者QQ号码">
              <span>{{ props.row.wanter.qqNumber || 'null' }}</span>
            </el-form-item>
            <el-form-item label="意向者微信号">
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
      <el-table-column prop="keeper.username" label="持有者">
      </el-table-column>
      <el-table-column prop="wanter.username" label="意向者">
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
import { getAllWantsInfo } from "@/axios/api";
//导出组件
export default {
  data() {
    return {
      allWantsInfo: []
    };
  },
  mounted() {},
  created() {
    this.getAllWantsInfo2();
  },
  methods: {
    getAllWantsInfo2() {
      getAllWantsInfo()
        .then(res => {
          console.log(res, "请求成功");
          this.allWantsInfo = res.data.wants;
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