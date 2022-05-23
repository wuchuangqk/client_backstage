<template>
  <div class="app-page">

    <!-- <Head :searchParams="templateParams" @searchList="doSearch" /> -->
    <el-table :data="tableData" style="width: 100%" border
      :header-cell-style="{ background: '#F8FBFF', color: '#505050' }">
      <el-table-column type="index" label="排序" width="50" align="center" />
      <el-table-column prop="pay_account" label="收款账号" align="center" />
      <el-table-column prop="unpay" label="未结算金额(元)" align="center" />
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.stateTag">{{ scope.row.stateText }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="jiesuan" align="center" width="120">
        <!-- 状态未未结算时，可以结算或拒绝 -->
        <template slot-scope="scope" v-if="scope.row.status === 0">
          <el-link type="primary" :underline="false" @click="doApply(scope.row, 1)">结算</el-link>
          <el-link type="primary" :underline="false" @click="doApply(scope.row, 2)">拒绝</el-link>
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
import Head from "../../components/Head/index.vue";
import { getPayListOfManager, doPay } from "@/utils/api";
import listMixin from "@/mixins/listMixin";
import { CLEAR_STATE } from "@/utils/const";
export default {
  mixins: [listMixin],
  data() {
    return {
      templateParams: [
        {
          type: "input",
          label: "项目名称",
          value: "",
          placeholder: "输入项目名称",
        },
        {
          type: "select",
          label: "处理状态",
          value: "",
          placeholder: "所有状态",
          data: CLEAR_STATE,
        },
      ],
    };
  },
  components: { Head },
  methods: {
    // 获取列表数据
    fetchData() {
      getPayListOfManager(this.searchParams).then((res) => {
        res.data.list.forEach((v) => {
          v.stateTag = "";
          v.stateText = "";
          const item = CLEAR_STATE.find((val) => val.value === v.status);
          if (item) {
            v.stateTag = item.tag;
            v.stateText = item.key;
          }
          v.unpay = v.unpay.toFixed(2)
        });
        this.tableData = res.data.list;
        this.total = res.data.num;
      });
    },
    // 执行搜索
    doSearch(params) {
      this.searchParams = Object.assign(this.searchParams, params);
      this.search();
    },
    // 管理员结算或拒绝项目
    doApply(row, status) {
      this.$confirm(`确定${status === 1 ? '结算' :  '拒绝'}吗`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          doPay({ id: row.id, status }).then((res) => {
            if (res.code != 1) return this.$message.error(res.msg);
            this.$message.success(res.msg);
            this.fetchData();
          });
        })
        .catch(() => {});
    },
  },
  mounted() {
    // 获取列表数据
    this.fetchData();
  },
};
</script>

<style lang="scss" scoped>
@import "./clear_list.scss";
</style>