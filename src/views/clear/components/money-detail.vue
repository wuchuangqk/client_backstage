<template>
  <el-dialog title="结算数据" :visible.sync="dialog.show" width="800px" :close-on-click-modal="false">
    <el-table :data="tableData" :header-cell-style="_headerCellStyle" border>
      <el-table-column label="日期" prop="date" align="center"></el-table-column>
      <el-table-column label="金额（元）" prop="price" align="center"></el-table-column>
    </el-table>
    <div slot="footer">
      <el-button type="default" @click="close">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import formMixin from "@/mixins/formMixin";
export default {
  name: "RemarkForm",
  mixins: [formMixin],
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    open(data) {
      this.dialog.show = true;
      this.dialog.loading = false;
      this.tableData = data
    },
  },
};
</script>

<style lang="scss" scope>
</style>
