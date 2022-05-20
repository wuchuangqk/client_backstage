<template>
  <div class="app-page">

    <Head :searchParams="templateParams" :functionParams="functionParams" @searchList="doSearch" />
    <el-table v-loading="tableLoading" :data="tableData" :header-cell-style="_headerCellStyle" border
      element-loading-spinner="el-icon-loading" element-loading-text="加载中，请稍候……">
      <el-table-column label="排序" prop="id" align="center" width="100"></el-table-column>
      <el-table-column label="项目名称" prop="pid" align="center"></el-table-column>
      <el-table-column label="推广类型" prop="promotion" align="center"></el-table-column>
      <el-table-column label="单价（元）" prop="price" align="center"></el-table-column>
      <el-table-column label="项目流程" prop="" align="center">
        <template slot-scope="scope">
          <el-link v-if="scope.row.pic" type="primary" :underline="false" @click="open(scope.row.pic)">图片</el-link>
          <el-link v-if="scope.row.video" type="primary" :underline="false" @click="open(scope.row.pic)">视频</el-link>
          <el-link v-if="scope.row.file" type="primary" :underline="false" @click="open(scope.row.pic)">文件</el-link>
        </template>
      </el-table-column>
      <el-table-column label="申请状态" prop="status" align="center">
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
import { getUserApplyList } from "@/utils/api";
import { APPLY_STATE } from "@/utils/const";
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
      ],
      // 按钮参数
      functionParams: [{ text: "导出", callback: "exportListData" }],
      applyState: APPLY_STATE
    };
  },
  methods: {
    // 导出列表数据
    exportListData() {},
    // 获取列表数据
    fetchData() {
      getUserApplyList(this.searchParams).then((res) => {
        res.data.forEach(v => {
          v.stateTag = ''
          v.stateText = ''
          const item = this.applyState.find(val => val.value === v.status)
          if (item) {
            v.stateTag = item.tag
            v.stateText = item.key
          }
        })
        this.tableData = res.data;
      });
    },
    // 执行搜索
    doSearch(params) {
      this.searchParams = Object.assign(this.searchParams, params);
      this.search();
    },
    // 在新窗口预览
    open(url) {
      window.open(url)
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


