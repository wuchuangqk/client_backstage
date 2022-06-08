<template>
  <div class="app-page">

    <Head :searchParams="templateParams" :functionParams="functionParams" @searchList="doSearch"
      @clickBack="clickBack" />
    <el-table v-loading="tableLoading" :data="tableData" :header-cell-style="_headerCellStyle" border
      element-loading-spinner="el-icon-loading" element-loading-text="加载中，请稍候……">
      <el-table-column type="index" label="排序" width="50" align="center" />
      <el-table-column label="项目名称" prop="title" align="center"></el-table-column>
      <el-table-column label="推广类型" prop="promotion" align="center"></el-table-column>
      <el-table-column label="单价(元)" prop="price" align="center" v-if="userId != 48" />
      <el-table-column label="项目流程" prop="" align="center">
        <template slot-scope="scope">
          <el-link v-if="scope.row.pic" type="primary" :underline="false" @click="open(scope.row.pic)">图片</el-link>
          <el-link v-if="scope.row.video" type="primary" :underline="false" @click="open(scope.row.video)">视频</el-link>
          <el-link v-if="scope.row.file" type="primary" :underline="false" @click="open(scope.row.file)">文件</el-link>
        </template>
      </el-table-column>
      <el-table-column label="申请项目" prop="jiesuan" align="center">
        <template slot-scope="scope">
          <el-link v-if="scope.row.apply !== 0" type="primary" :underline="false" @click="doApply(scope.row)">申请项目
          </el-link>
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
import { getProjectList, saveApply } from "@/utils/api";
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
          key: "select",
          value: "",
          label: "项目名称",
          placeholder: "请输入项目名称",
          type: "input",
        },
      ],
      // 按钮参数
      functionParams: [{ text: "导出", callback: "exportListData", loading: false }],
      userId: ""
    };
  },
  methods: {
    clickBack(fn) {
      this[fn]()
    },
    // 导出列表数据
    exportListData() {
      this.functionParams[0].loading = true;
      getProjectList({ page: 1, num: 99999 }).then((res) => {
        excel.exportArrayToExcel({
          title: [
            "项目名称",
            "推广类型",
            "单价(元)",
          ],
          key: ["title", "promotion", "price"],
          data: res.data.list,
          autoWidth: true,
          filename: "项目申请",
        });
        this.functionParams[0].loading = false;
      });
    },
    // 获取列表数据
    fetchData() {
      getProjectList(this.searchParams).then((res) => {
        this.tableData = res.data.list;
        this.total = res.data.num;
      });
    },
    // 执行搜索
    doSearch(params) {
      this.searchParams = Object.assign(this.searchParams, params);
      this.search();
    },
    // 申请项目
    doApply(row) {
      this.$confirm("确定申请吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          saveApply({ id: row.id }).then((res) => {
            if (res.code != 1) return this.$message.error(res.msg);
            this.$message.success(res.msg);
            this.fetchData();
          });
        })
        .catch(() => { });
    },
    // 在新窗口预览
    open(url) {
      window.open(url)
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


