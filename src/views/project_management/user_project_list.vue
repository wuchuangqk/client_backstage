<template>
  <div>
    <div class="content">
      <el-table :data="tableData" style="width: 100%" border
        :header-cell-style="{ background: '#F8FBFF', color: '#505050' }">
        <el-table-column type="index" label="排序" width="50" align="center" />
        <el-table-column prop="pid" label="项目名" />
        <el-table-column prop="add_time" label="添加时间" width="160" align="center" />
        <el-table-column prop="user_name" label="做单人名称" />
        <el-table-column label="项目状态" width="80" align="center">
          <template slot-scope="s">
            <el-tag type="danger" v-if="s.row.status == 0">异常</el-tag>
            <el-tag type="success" v-if="s.row.status == 1">正常</el-tag>
            <el-tag v-if="s.row.status == 2">待审核</el-tag>
            <el-tag type="warning" v-if="s.row.status == 3">暂停</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="审批" width="80" align="center">
          <template slot-scope="s">
            <el-button type="text" @click="saveProjectDataFront(s.row)">添加数据</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="添加数据" :visible.sync="saveProjectDialog">
      <el-form :model="saveProjectParams" label-position="left" label-width="70px">
        <el-form-item label="日期">
          <el-date-picker v-model="saveProjectParams.date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" />
        </el-form-item>
        <el-form-item label="单价">
          <el-input v-model="saveProjectParams.price" />
        </el-form-item>
        <el-form-item label="数据">
          <el-input v-model="saveProjectParams.data" />
        </el-form-item>
        <el-form-item label="留存">
          <el-input v-model="saveProjectParams.retention" />
        </el-form-item>
        <el-form-item label="结算金额">
          <el-input v-model="saveProjectParams.gmv" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="saveProjectDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveProjectData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserProjectList, saveProjectData } from '@/utils/api'
export default {
  data() {
    return {
      tableData: [],
      total: "",
      params: {
        page: 1,
        num: 10,
        status: 1,
      },
      saveProjectDialog: false,
      saveProjectParams: {},
    }
  },
  methods: {
    userProjectList() {
      getUserProjectList(this.params).then(res => {
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    saveProjectData() {
      saveProjectData(this.saveProjectParams).then(res => {
        if (res.code === -1) return this.$message.error(res.msg)
        this.$message.success('添加成功')
        this.saveProjectDialog = false
        this.userProjectList()
      })
    },
    saveProjectDataFront(item) {
      this.saveProjectParams.id = item.id
      this.saveProjectDialog = true
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