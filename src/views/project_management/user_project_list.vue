<template>
  <div>
    <div class="content">
      <el-table :data="tableData" style="width: 100%" border
        :header-cell-style="{ background: '#F8FBFF', color: '#505050' }">
        <el-table-column type="index" label="排序" width="50" align="center" />
        <el-table-column prop="pid" label="项目名" />
        <el-table-column prop="add_time" label="添加时间" width="160" align="center" />
        <el-table-column label="项目状态" width="80" align="center">
          <template slot-scope="s">
            <el-tag type="danger" v-if="s.row.status == 0">异常</el-tag>
            <el-tag type="success" v-if="s.row.status == 1">正常</el-tag>
            <el-tag v-if="s.row.status == 2">待审核</el-tag>
            <el-tag type="warning" v-if="s.row.status == 3">暂停</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getUserProjectList } from '@/utils/api'
export default {
  data() {
    return {
      tableData: [],
      total: "",
      params: {
        page: 1,
        num: 10
      },
    }
  },
  methods: {
    userProjectList() {
      getUserProjectList(this.params).then(res => {
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
  },
  mounted() {
    this.userProjectList()
  },
}
</script>

<style lang="scss" scoped>
@import './user_project_list.scss';
</style>