<template>
  <div class="app-page">
    <el-table v-loading="tableLoading" :data="tableData" :header-cell-style="_headerCellStyle" border
      element-loading-spinner="el-icon-loading" element-loading-text="加载中，请稍候……">
      <el-table-column label="项目名称" prop="title" align="center"></el-table-column>
      <el-table-column label="结算数据" prop="" align="center">
        <template slot-scope="s">
          <el-link type="primary" :underline="false" @click="$refs.detail.open(s.row.date)">查看</el-link>
        </template>
      </el-table-column>
      <el-table-column label="金额(元)" prop="price" align="center"></el-table-column>
      <el-table-column label="状态" prop="status" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.stateTag">{{ scope.row.stateText }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="结算时间" prop="addtime" align="center"></el-table-column>
    </el-table>
    <footer class="app-pagination-wrap">
      <el-pagination :page-sizes="pageSizes" background layout="prev, pager, next, jumper" :total="total"
        :page-size="searchParams.num" :current-page="searchParams.page" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </footer>
    <MoneyDetail ref="detail" />
  </div>
</template>

<script>
import listMixin from "@/mixins/listMixin";
import { getClearLog } from "@/utils/api";
import { CLEAR_STATE } from "@/utils/const";
import MoneyDetail from "./components/money-detail.vue";
export default {
  mixins: [listMixin],
  components: { MoneyDetail },
  data() {
    return {
      // 列表数据
      tableData: [],
    };
  },
  methods: {
    // 获取列表数据
    fetchData() {
      getClearLog(this.searchParams).then((res) => {
        res.data.list.forEach((v) => {
          v.stateTag = "";
          v.stateText = "";
          const item = CLEAR_STATE.find((val) => val.value === v.status);
          if (item) {
            v.stateTag = item.tag;
            v.stateText = item.key;
          }
          v.price = v.price.toFixed(2);
        });
        this.tableData = res.data.list;
        this.total = res.data.num;
      });
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


