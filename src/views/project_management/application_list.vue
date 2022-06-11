<template>
  <div class="app-page">

    <Head :searchParams="templateParams" @searchList="doSearch" />
    <el-table :data="tableData" style="width: 100%" border
      :header-cell-style="{ background: '#F8FBFF', color: '#505050' }" :row-class-name="tableRowClassName">
      <el-table-column type="index" label="排序" width="50" align="center" />
      <el-table-column prop="real_name" label="申请人" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="city" label="作业城市" />
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
    <footer class="app-pagination-wrap">
      <el-pagination :page-sizes="pageSizes" background layout="prev, pager, next, jumper" :total="total"
        :page-size="searchParams.num" :current-page="searchParams.page" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </footer>
    <!-- <div class="content_1">
      <el-pagination :page-size="10" layout="total, prev, pager, next, jumper" :total="total" background
        @current-change="currentChange" />
    </div> -->
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
        <!-- <el-form-item label="上传二维码">
          <el-upload action="http://nad.bdhuoke.com/business_admin/Project/upload" :on-success="uploadSuccess" ref="codeUpload">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item> -->
        <el-form-item label="上传二维码">
          <el-upload accept=".jpg,.png" action="http://nad.bdhuoke.com/business_admin/Project/upload"
            list-type="picture-card" :on-success="uploadSuccess" ref="codeUpload" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
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
import listMixin from "@/mixins/listMixin";
import Head from "@/components/Head/index.vue";
export default {
  components: { Head },
  mixins: [listMixin],
  data() {
    return {
      // params: { page: 1, num: 10 },
      tableData: [],
      total: 0,
      examineDialog: false,
      examineParams: {},
      // 搜索参数
      templateParams: [
        {
          key: "id",
          value: "",
          label: "申请人",
          placeholder: "请选择",
          type: "select",
          data: [],
        },
      ],
    }
  },
  methods: {
    fetchData() {
      getUserProjectList(this.searchParams).then(res => {
        this.tableData = res.data.list
        this.total = res.data.num
        if (res.data.select && res.data.select.length) {
          this.templateParams[0].data = res.data.select.map((v) => {
            return {
              key: v.real_name,
              value: v.id,
            };
          });
        }
      })
    },
    examine() {
      examine(this.examineParams).then(res => {
        if (res.code === -1) return this.$message.error(res.msg)
        this.$message.success('审核成功')
        this.examineDialog = false
        this.fetchData()
      })
    },
    examineFront(item) {
      this.examineDialog = true
      this.examineParams = { id: item.id }
      this.$nextTick(() => {
        this.$refs.codeUpload.clearFiles()
      })
    },
    uploadSuccess(res, file, fileList) {
      this.examineParams.code_img = fileList.length ? fileList.map(v => 'http://nad.bdhuoke.com/' + v.response.data).join(',') : ''
    },
    handleRemove(file, fileList) {
      this.examineParams.code_img = fileList.length ? fileList.map(v => 'http://nad.bdhuoke.com/' + v.response.data).join(',') : ''
    },
    // 执行搜索
    doSearch(params) {
      this.searchParams = Object.assign(this.searchParams, params);
      this.search();
    },
    // 上级ID不为0的行设置背景颜色灰色
    tableRowClassName({ row }) {
      if (row.p_id != 0) {
        return 'disabled'
      }
    }
    // currentChange(val) {
    //   this.params.page = val
    //   this.fetchData()
    // },
  },
  mounted() {
    this.fetchData()
  },
}
</script>

<style lang="scss" scoped>
// @import './application_list.scss';
::v-deep .disabled {
  color: var(--cell-color);
}

::v-deep .header {
  padding: 0;
}
</style>