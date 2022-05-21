<template>
  <div class="app-page">

    <Head :functionParams="functionParams" @clickBack="clickBack" />
    <el-table v-loading="tableLoading" :data="tableData" :header-cell-style="_headerCellStyle" border
      element-loading-spinner="el-icon-loading" element-loading-text="加载中，请稍候……">
     <el-table-column type="index" label="排序" width="50" align="center" />
      <el-table-column label="标题" prop="title" align="center"></el-table-column>
      <el-table-column label="内容" prop="info" align="center"></el-table-column>
      <el-table-column label="添加时间" prop="addtime" align="center"></el-table-column>
      <el-table-column label="状态" prop="status" align="center"></el-table-column>
    </el-table>
    <footer class="app-pagination-wrap">
      <el-pagination :page-sizes="pageSizes" background layout="prev, pager, next, jumper" :total="total"
        :page-size="searchParams.num" :current-page="searchParams.page" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </footer>
    <MessageForm ref="form" @update-data="fetchData" />
  </div>
</template>

<script>
import Head from "@/components/Head/index.vue";
import listMixin from "@/mixins/listMixin";
import MessageForm from './components/message-form.vue'
import { getMsgList } from '@/utils/api'
export default {
  components: { Head, MessageForm },
  mixins: [listMixin],
  data() {
    return {
      // 按钮参数
      functionParams: [{ text: "添加消息", callback: "addMsg", loading: false }],
    };
  },
  methods: {
    clickBack(fn) {
      this[fn]()
    },
    // 添加消息
    addMsg() {
      this.$refs.form.open()
    },
    // 获取列表数据
    fetchData() {
      getMsgList(this.searchParams).then(res => {
        this.tableData = res.data.list
        this.total = res.data.num
      })
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


