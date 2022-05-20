<template>
  <div>

    <Head :searchParams="searchParams" :functionParams="functionParams" @clickBack="clickBack"
      @searchList="searchList" />
    <div class="content">
      <el-table :data="tableData" style="width: 100%" border
        :header-cell-style="{ background: '#F8FBFF', color: '#505050' }">
        <el-table-column type="index" label="排序" width="50" align="center" />
        <el-table-column prop="title" label="项目名称" />
        <el-table-column prop="price" label="单价(元)" align="right" />
        <el-table-column prop="promotion" label="推广类型" width="80" align="center" />
        <el-table-column label="项目流程" width="150" align="center">
          <template slot-scope="s">
            <el-link type="primary" :underline="false" v-if="s.row.pic">图片</el-link>
            <el-link type="primary" :underline="false" v-if="s.row.file">视频</el-link>
            <el-link type="primary" :underline="false" v-if="s.row.video">文件</el-link>
          </template>
        </el-table-column>
        <el-table-column label="修改项目" width="80" align="center">
          <template slot-scope="s">
            <el-link type="primary" :underline="false" @click="updateProjectPre(s.row)">修改</el-link>
          </template>
        </el-table-column>
      </el-table>
      <div class="content_1">
        <el-pagination :page-size="10" layout="total, prev, pager, next, jumper" :total="total" background
          @current-change="currentChange" />
      </div>
    </div>
    <el-dialog title="添加项目" :visible.sync="dialogFormVisible">
      <el-form :model="saveParams" label-position="left" label-width="70px">
        <el-form-item label="项目标题">
          <el-input v-model="saveParams.title" placeholder="请输入项目标题" />
        </el-form-item>
        <el-form-item label="推广方式">
          <el-select v-model="saveParams.promotion" placeholder="请选择推广方式">
            <el-option v-for="(item, index) in promotion" :key="index" :label="item.key" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="项目单价">
          <el-input v-model="saveParams.price" placeholder="请输入项目单价" />
        </el-form-item>
        <el-form-item label="流程图片">
          <el-upload :headers="{ token }" :on-success="picSuccess"
            action="http://nad.bdhuoke.com/business_admin/Project/upload">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="流程视频">
          <el-upload :headers="{ token }" :on-success="videoSuccess"
            action="http://nad.bdhuoke.com/business_admin/Project/upload">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="流程文档">
          <el-upload :headers="{ token }" :on-success="fileSuccess"
            action="http://nad.bdhuoke.com/business_admin/Project/upload">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveProject">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改项目" :visible.sync="updateDialog">
      <el-form :model="updateParams" label-position="left" label-width="70px">
        <el-form-item label="项目标题">
          <el-input v-model="updateParams.title" placeholder="请输入项目标题" />
        </el-form-item>
        <el-form-item label="推广方式">
          <el-select v-model="updateParams.promotion" placeholder="请选择推广方式">
            <el-option v-for="(item, index) in promotion" :key="index" :label="item.key" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="项目单价">
          <el-input v-model="updateParams.price" placeholder="请输入项目单价" />
        </el-form-item>
        <el-form-item label="流程图片">
          <el-upload :headers="{ token }" :on-success="picSuccess"
            action="http://nad.bdhuoke.com/business_admin/Project/upload">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="流程视频">
          <el-upload :headers="{ token }" :on-success="videoSuccess"
            action="http://nad.bdhuoke.com/business_admin/Project/upload">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="流程文档">
          <el-upload :headers="{ token }" :on-success="fileSuccess"
            action="http://nad.bdhuoke.com/business_admin/Project/upload">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateProject">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { PROMOTION_TYPE } from '@/utils/const'
import Head from '../../components/Head/index'
import { getProjectList, saveProject, updateProject } from '../../utils/api'
export default {
  data() {
    return {
      searchParams: [
        { label: "项目名称", value: "", type: "input", placeholder: "请输入项目名称", key: 'title' },
        { label: "推广类型", value: "", type: "select", placeholder: "请选择推广类型", data: [{ value: '1', key: 1 }] }
      ],
      listParams: {
        page: 1,
        num: 10
      },
      tableData: [],
      total: 0,
      functionParams: [
        { text: "添加项目", callback: "saveProjectPre" }
      ],
      saveParams: {},
      dialogFormVisible: false,
      promotion: [],
      token: '',
      updateParams: {},
      updateDialog: false,
    }
  },
  methods: {
    getProjectList() {
      getProjectList(this.listParams).then(res => {
        this.tableData = res.data.list
        this.total = res.data.num
      })
    },
    saveProject() {
      saveProject(this.saveParams).then(res => {
        if (res.code === -1) return this.$message.error(res.msg)
        this.$message.success('添加成功')
        this.getProjectList()
        this.dialogFormVisible = false
      })
    },
    clickBack(methodName) {
      this[methodName]()
    },
    picSuccess(response) {
      this.saveParams.pic = `http://nad.bdhuoke.com/${response.data}`
      this.updateParams.pic = `http://nad.bdhuoke.com/${response.data}`
    },
    fileSuccess(response) {
      this.saveParams.file = `http://nad.bdhuoke.com/${response.data}`
      this.updateParams.file = `http://nad.bdhuoke.com/${response.data}`
    },
    videoSuccess(response) {
      this.saveParams.video = `http://nad.bdhuoke.com/${response.data}`
      this.updateParams.video = `http://nad.bdhuoke.com/${response.data}`
    },
    saveProjectPre() {
      this.dialogFormVisible = true
    },
    updateProject() {
      updateProject(this.updateParams).then(res => {
        if (res.code === -1) return this.$message.error(res.msg)
        this.getProjectList()
        this.updateDialog = false
        this.$message.success('修改成功')
      })
    },
    updateProjectPre(item) {
      this.updateParams = item
      this.updateDialog = true
    },
    searchList(params) {
      this.listParams.title = params.title
      this.getProjectList()
    },
    currentChange(page) {
      this.listParams.page = page
      this.getProjectList()
    },
  },
  mounted() {
    this.promotion = PROMOTION_TYPE
    this.token = localStorage.getItem('token')
    this.getProjectList()
  },
  components: { Head }
}
</script>

<style lang="scss" scoped>
@import './project_list.scss';
</style>