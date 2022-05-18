<template>
  <div>

    <Head :searchParams="searchParams" />
    <div class="content">
      <el-table :data="tableData" style="width: 100%" border
        :header-cell-style="{ background: '#F8FBFF', color: '#505050' }">
        <el-table-column prop="date" label="排序" />
        <el-table-column prop="date" label="结算项目" />
        <el-table-column prop="date" label="结算金额" />
        <el-table-column prop="date" label="收款账号" />
        <el-table-column prop="date" label="状态" />
      </el-table>
    </div>
  </div>
</template>

<script>
import Head from '../../components/Head/index.vue'
export default {
  data() {
    return {
      searchParams: [
        { type: "input", label: "项目名称", value: "", placeholder: "输入项目名称" },
        { type: "select", label: "处理状态", value: "", placeholder: "所有状态", data: [{ value: "1", key: "1" }] },
      ]
    }
  },
  components: { Head }
}
</script>

<style lang="scss" scoped>
@import './clear_list.scss';
</style>