<template>
  <div class="app-page">
    <Head :searchParams="templateParams" :functionParams="functionParams" />
    <el-table v-loading="tableLoading" :data="tableData" :header-cell-style="_headerCellStyle" border
      element-loading-spinner="el-icon-loading" element-loading-text="加载中，请稍候……">
      <el-table-column label="日期" prop="date" align="center"></el-table-column>
      <el-table-column label="项目名称" prop="name" align="center"></el-table-column>
      <el-table-column label="数据" prop="data" align="center"></el-table-column>
      <el-table-column label="次留" prop="ciliu" align="center"></el-table-column>
      <el-table-column label="单价（元）" prop="price" align="center"></el-table-column>
      <el-table-column label="结算金额（元）" prop="jiesuan" align="center"></el-table-column>
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
export default {
  components: { Head },
  mixins: [listMixin],
  data() {
    return {
      // 列表数据
      tableData: [
        {
          date: "2022-1-11",
          name: "龙珠",
          data: "9999",
          ciliu: "20%",
          price: 1.0,
          jiesuan: 999,
        },
        {
          date: "2022-1-11",
          name: "龙珠",
          data: "9999",
          ciliu: "20%",
          price: 1.0,
          jiesuan: 999,
        },
        {
          date: "2022-1-11",
          name: "龙珠",
          data: "9999",
          ciliu: "20%",
          price: 1.0,
          jiesuan: 999,
        },
      ],
      // 搜索参数
      templateParams: [
        {
          key: "name",
          value: "",
          label: "项目名称",
          placeholder: "请输入项目名称",
          type: "input",
        },
        {
          key: "date",
          value: "",
          label: "推广日期",
          placeholder: "请选择",
          type: "date",
        },
      ],
      // 按钮参数
      functionParams: [{ text: "导出", callback: "exportListData" }],
    };
  },
  methods: {
    // 导出列表数据
    exportListData() {},
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
</style>


