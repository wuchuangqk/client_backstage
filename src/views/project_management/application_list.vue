<template>
  <div>
    <div class="content">
      <el-table :data="tableData" style="width: 100%" border
        :header-cell-style="{ background: '#F8FBFF', color: '#505050' }">
        <el-table-column type="index" label="排序" width="50" align="center" />
        <el-table-column prop="user_name" label="申请人" />
        <el-table-column prop="title" label="项目名称" />
        <el-table-column prop="promotion" label="推广方式" width="80" align="center" />
        <el-table-column prop="price" label="项目单价" align="right" />
        <el-table-column prop="add_time" label="添加时间" width="160" align="center" />
        <el-table-column label="审核状态" width="100" align="center">
          <template slot-scope="s">
            <el-tag type="danger" v-if="s.row.status == 0">未通过</el-tag>
            <el-tag type="success" v-if="s.row.status == 1">审核通过</el-tag>
            <el-tag v-if="s.row.status == 2">待审核</el-tag>
            <el-tag type="warning" v-if="s.row.status == 3">审核通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="60" align="center">
          <template slot-scope="s">
            <el-button type="text" v-if="s.row.status == 2" @click="examineFront(s.row)">审批</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="content_1">
        <el-pagination :page-size="10" layout="total, prev, pager, next, jumper" :total="total" background
          @current-change="currentChange" />
      </div>
    </div>
    <el-dialog title="审批项目" :visible.sync="examineDialog">
      <el-form :model="examineParams" label-position="left" label-width="100px">
        <el-form-item label="审批状态">
          <el-select v-model="examineParams.status" placeholder="选择审批">
            <el-option label="通过" :value="1" />
            <el-option label="未通过" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="项目链接">
          <el-input v-model="examineParams.code" placeholder="请输入H5链接" />
        </el-form-item>
        <el-form-item label="上传二维码">
          <el-upload action="http://nad.bdhuoke.com/business_admin/Project/upload" :on-success="uploadSuccess"
            ref="codeUpload">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="examineDialog = false">取 消</el-button>
        <el-button type="primary" @click="examine">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { examine, getUserProjectList } from '@/utils/api'
export default {
  data() {
    return {
      params: { page: 1, num: 10 },
      tableData: [],
      total: 0,
      examineDialog: false,
      examineParams: {},
    }
  },
  methods: {
    getUserApplyList() {
      getUserProjectList(this.params).then(res => {
        this.tableData = res.data.list
        this.total = res.data.num
      })
    },
    examine() {
      examine(this.examineParams).then(res => {
        if (res.code === -1) return this.$message.error(res.msg)
        this.$message.success('审核成功')
        this.examineDialog = false
        this.getUserApplyList()
      })
    },
    examineFront(item) {
      this.examineDialog = true
      this.examineParams = { id: item.id }
      this.$nextTick(() => {
        this.$refs.codeUpload.clearFiles()
      })
    },
    uploadSuccess(res) {
      this.examineParams.code_img = `http://nad.bdhuoke.com/${res.data}`
    },
    currentChange(val) {
      this.params.page = val
      this.getUserApplyList()
    },
  },
  mounted() {
    this.getUserApplyList()
  },
}
</script>

<style lang="scss" scoped>
@import './application_list.scss';
</style>