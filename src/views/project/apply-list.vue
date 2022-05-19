<template>
  <div class="app-page">

    <Head :searchParams="templateParams" :functionParams="functionParams" @searchList="doSearch" />
    <el-table v-loading="tableLoading" :data="tableData" :header-cell-style="_headerCellStyle" border
      element-loading-spinner="el-icon-loading" element-loading-text="加载中，请稍候……">
      <el-table-column label="排序" prop="id" align="center" width="100"></el-table-column>
      <el-table-column label="项目名称" prop="title" align="center"></el-table-column>
      <el-table-column label="推广类型" prop="" align="center"></el-table-column>
      <el-table-column label="单价（元）" prop="price" align="center"></el-table-column>
      <el-table-column label="项目流程" prop="" align="center">
        <template slot-scope="scope">
          <el-link type="primary" :underline="false">图片</el-link>
          <el-link type="primary" :underline="false">视频</el-link>
          <el-link type="primary" :underline="false">文件</el-link>
        </template>
      </el-table-column>
      <el-table-column label="申请项目" prop="jiesuan" align="center">
        <template slot-scope="scope">
          <el-link type="primary" :underline="false">申请项目</el-link>
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
import { PROMOTION_TYPE } from "@/utils/const";
import { getProjectList } from "@/utils/api";
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
          key: "name",
          value: "",
          label: "项目名称",
          placeholder: "请输入项目名称",
          type: "input",
        },
        // {
        //   key: "date",
        //   value: "",
        //   label: "推广类型",
        //   placeholder: "请选择",
        //   type: "select",
        //   data: PROMOTION_TYPE,
        // },
      ],
      // 按钮参数
      functionParams: [{ text: "导出", callback: "exportListData" }],
    };
  },
  methods: {
    // 导出列表数据
    exportListData() { },
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
  },
  mounted() {
    // 获取列表数据
    this.fetchData();
  },
};
</script>

<style lang="scss" scoped>
</style>


