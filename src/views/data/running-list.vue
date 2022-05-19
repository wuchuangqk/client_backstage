<template>
  <div class="app-page">

    <Head :searchParams="templateParams" @searchList="doSearch">
      <el-button type="primary" :loading="exportLoading" @click="exportListData">导出</el-button>
    </Head>
    <el-table v-loading="tableLoading" :data="tableData" :header-cell-style="_headerCellStyle" border
      element-loading-spinner="el-icon-loading" element-loading-text="加载中，请稍候……">
      <el-table-column label="日期" prop="date" align="center"></el-table-column>
      <el-table-column label="项目名称" prop="upid" align="center"></el-table-column>
      <el-table-column label="数据" prop="data" align="center"></el-table-column>
      <el-table-column label="次留" prop="retention" align="center"></el-table-column>
      <el-table-column label="单价（元）" prop="price" align="center"></el-table-column>
      <el-table-column label="结算金额（元）" prop="gmv" align="center"></el-table-column>
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
import { getRunningProject } from "@/utils/api";
import excel from "@/vendor/Export2Excel";
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
          placeholder: "所有项目",
          type: "select",
          data: [],
        },
        // {
        //   key: "date",
        //   value: "",
        //   label: "推广日期",
        //   placeholder: "请选择",
        //   type: "date",
        // },
      ],
      // 导出加载中状态
      exportLoading: false,
    };
  },
  methods: {
    // 导出列表数据
    exportListData() {
      this.exportLoading = true;
      getRunningProject({ page: 1, num: 99999 }).then((res) => {
        excel.exportArrayToExcel({
          title: [
            "日期",
            "项目名称",
            "数据",
            "次留",
            "单价（元）",
            "结算金额（元）",
          ],
          key: ["date", "upid", "data", "retention", "price", "gmv"],
          data: res.data.list,
          autoWidth: true,
          filename: "进行中项目",
        });
        this.exportLoading = false;
      });
    },
    // 获取列表数据
    fetchData() {
      getRunningProject(this.searchParams).then((res) => {
        this.tableData = res.data.list;
        this.total = res.data.num;
        this.templateParams[0].data = res.data.select.map((v) => {
          return {
            key: v.pid,
            value: v.id,
          };
        });
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
  },
};
</script>

<style lang="scss" scoped>
::v-deep .header {
  padding: 0;
}
</style>


