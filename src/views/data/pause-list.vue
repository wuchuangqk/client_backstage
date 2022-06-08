<template>
  <div class="app-page">

    <Head :searchParams="templateParams" :functionParams="functionParams" @searchList="doSearch"
      @clickBack="clickBack" />
    <el-table v-loading="tableLoading" :data="tableData" :header-cell-style="_headerCellStyle" border
      element-loading-spinner="el-icon-loading" element-loading-text="加载中，请稍候……">
      <el-table-column label="日期" prop="date" align="center"></el-table-column>
      <el-table-column label="项目名称" prop="upid" align="center"></el-table-column>
      <el-table-column label="数据" prop="data" align="center"></el-table-column>
      <el-table-column label="次留（%）" prop="retention" align="center"></el-table-column>
      <el-table-column label="单价(元)" prop="price" align="center" v-if="userId != 48"></el-table-column>
      <el-table-column label="结算金额(元)" prop="gmv" align="center" v-if="userId != 48"></el-table-column>
      <el-table-column label="结算状态" prop="pay" align="center" v-if="userId != 48">
        <template slot-scope="scope">
          <el-tag :type="scope.row.stateTag">{{ scope.row.stateText }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <footer class="app-pagination-wrap">
      <el-pagination :page-sizes="pageSizes" background layout="prev, pager, next, jumper" :total="total"
        :page-size="searchParams.num" :current-page="searchParams.page" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </footer>
  </div>
</template>

<script>
import Head from "@/components/Head/index.vue";
import listMixin from "@/mixins/listMixin";
import { getPauseProject } from "@/utils/api";
import excel from "@/vendor/Export2Excel";
import { CLEAR_STATE } from "@/utils/const";
export default {
  components: { Head },
  mixins: [listMixin],
  data() {
    return {
      // 列表数据
      tableData: [],
      // 搜索参数
      templateParams: [
        {
          key: "upid",
          value: "",
          label: "项目名称",
          placeholder: "请选择",
          type: "select",
          data: [],
        },
      ],
      // 按钮参数
      functionParams: [{ text: "导出", callback: "exportListData", loading: false }],
    };
  },
  methods: {
    clickBack(fn) {
      this[fn]()
    },
    // 导出列表数据
    exportListData() {
      this.functionParams[0].loading = true;
      getPauseProject({ page: 1, num: 99999 }).then((res) => {
        res.data.list.forEach((v) => {
          v.stateText = "";
          v.stateTag = "";
          const item = CLEAR_STATE.find((val) => val.value === v.pay);
          if (item) {
            v.stateText = item.key;
            v.stateTag = item.tag;
          }
        });
        excel.exportArrayToExcel({
          title: [
            "日期",
            "项目名称",
            "数据",
            "次留",
            "单价(元)",
            "结算金额(元)",
          ],
          key: ["date", "upid", "data", "retention", "price", "gmv"],
          data: res.data.list,
          autoWidth: true,
          filename: "暂停项目",
        });
        this.functionParams[0].loading = false;
      });
    },
    // 获取列表数据
    fetchData() {
      getPauseProject(this.searchParams).then((res) => {
        res.data.list.forEach((v) => {
          v.stateText = "";
          v.stateTag = "";
          const item = CLEAR_STATE.find((val) => val.value === v.pay);
          if (item) {
            v.stateText = item.key;
            v.stateTag = item.tag;
          }
        });
        this.tableData = res.data.list;
        this.total = res.data.num;
        if (res.data.select && res.data.select.length) {
          this.templateParams[0].placeholder = res.data.select[0].pid;
          this.templateParams[0].data = res.data.select.map((v) => {
            return {
              key: v.pid,
              value: v.id,
            };
          });
        }
      });
    },
    // 执行搜索
    doSearch(params) {
      this.searchParams = Object.assign(this.searchParams, params);
      this.search();
    },
  },
  mounted() {
    // 获取列表数据
    this.fetchData();
    this.userId = this.$store.state.user.userInfo.id;
  },
};
</script>

<style lang="scss" scoped>
::v-deep .header {
  padding: 0;
}
</style>


