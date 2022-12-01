<template>
  <div class="app-page">

    <Head :searchParams="searchParams" :functionParams="functionParams" @clickBack="clickBack"
      @searchList="searchList" />
    <div class="content">
      <el-table :data="tableData" style="width: 100%" border
        :header-cell-style="{ background: '#F8FBFF', color: '#505050' }">
        <el-table-column type="index" label="排序" width="50" align="center" />
        <el-table-column prop="title" label="项目名称" />
        <el-table-column prop="info" label="详情" />
        <el-table-column prop="price" label="单价(元)" align="right" />
        <el-table-column prop="promotion" label="推广类型" align="center" />
        <el-table-column label="项目流程" align="center">
          <template slot-scope="s">
            <el-link type="primary" :underline="false" v-if="s.row.pic" @click="open(s.row.pic)">图片</el-link>
            <el-link type="primary" :underline="false" v-if="s.row.video" @click="open(s.row.video)">视频</el-link>
            <el-link type="primary" :underline="false" v-if="s.row.file" @click="open(s.row.file)">文件</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="项目状态" align="center" />
        <el-table-column label="修改项目" width="120" align="center">
          <template slot-scope="s">
            <el-link type="primary" :underline="false" @click="updateProjectPre(s.row)">修改</el-link>
            <el-link type="primary" :underline="false" @click="doPause(s.row)" v-if="s.row.status == '启用'">暂停</el-link>
            <el-link type="primary" :underline="false" @click="doRef(s.row)" v-if="s.row.status == '禁用'">开启</el-link>
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
          <el-upload :headers="{ token }" :on-success="picSuccess" ref="picUpload"
            action="http://nad.bdhuoke.com/business_admin/Project/upload">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="流程视频">
          <el-upload :headers="{ token }" :on-success="videoSuccess" ref="videoUpload"
            action="http://nad.bdhuoke.com/business_admin/Project/upload">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="流程文档">
          <el-upload :headers="{ token }" :on-success="fileSuccess" ref="fileUpload"
            action="http://nad.bdhuoke.com/business_admin/Project/upload">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="saveParams.info" placeholder="请输入详情" type="textarea" :rows="3" />
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
        <el-form-item label="详情">
          <el-input v-model="updateParams.info" placeholder="请输入详情" type="textarea" :rows="3" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateProject">确 定</el-button>
      </div>
    </el-dialog>
    <CustomPrice ref="custom" />
  </div>
</template>
<script>
import { PROMOTION_TYPE } from "@/utils/const";
import Head from "../../components/Head/index";
import { getProjectList, saveProject, updateProject, pause, doRef } from "../../utils/api";
import CustomPrice from "./components/CustomPrice.vue";
export default {
  data() {
    return {
      searchParams: [
        {
          label: "项目名称",
          value: "",
          type: "input",
          placeholder: "请输入项目名称",
          key: "select",
        },
        // { label: "推广类型", value: "", type: "select", placeholder: "请选择推广类型", data: [{ value: '1', key: 1 }] }
      ],
      listParams: {
        page: 1,
        num: 10,
      },
      tableData: [],
      total: 0,
      functionParams: [
        { text: "添加项目", callback: "saveProjectPre" },
        { text: "自定义价格", callback: "openCustom" },
      ],
      saveParams: {},
      dialogFormVisible: false,
      promotion: [],
      token: "",
      updateParams: {},
      updateDialog: false,
      pauseLoading: false,
      refLoading: false,
    };
  },
  methods: {
    getProjectList() {
      getProjectList(this.listParams).then((res) => {
        res.data.list.forEach(v => {
          v.pic = v.pic && v.pic.trim()
          v.video = v.video && v.video.trim()
          v.file = v.file && v.file.trim()
          v.status = v.status == 1 ? "启用" : "禁用"
        })
        this.tableData = res.data.list;
        this.total = res.data.num;
      });
    },
    saveProject() {
      saveProject(this.saveParams).then((res) => {
        if (res.code === -1) return this.$message.error(res.msg);
        this.$message.success("添加成功");
        this.getProjectList();
        this.dialogFormVisible = false;
      });
    },
    clickBack(methodName) {
      this[methodName]();
    },
    picSuccess(response) {
      this.saveParams.pic = `http://nad.bdhuoke.com/${response.data}`;
      this.updateParams.pic = `http://nad.bdhuoke.com/${response.data}`;
    },
    fileSuccess(response) {
      this.saveParams.file = `http://nad.bdhuoke.com/${response.data}`;
      this.updateParams.file = `http://nad.bdhuoke.com/${response.data}`;
    },
    videoSuccess(response) {
      this.saveParams.video = `http://nad.bdhuoke.com/${response.data}`;
      this.updateParams.video = `http://nad.bdhuoke.com/${response.data}`;
    },
    saveProjectPre() {
      this.dialogFormVisible = true;
      // 清空字段值
      this.saveParams = {};
      // 清空附件
      this.$nextTick(() => {
        this.$refs.picUpload.clearFiles();
        this.$refs.videoUpload.clearFiles();
        this.$refs.fileUpload.clearFiles();
      });
    },
    updateProject() {
      updateProject(this.updateParams).then((res) => {
        if (res.code === -1) return this.$message.error(res.msg);
        this.getProjectList();
        this.updateDialog = false;
        this.$message.success("修改成功");
      });
    },
    updateProjectPre(item) {
      this.updateParams = item;
      this.updateDialog = true;
    },
    // 暂停项目
    doPause(item) {
      if (this.pauseLoading) return
      this.$confirm("确定暂停吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.pauseLoading = true
          pause({ id: item.id }).then((res) => {
            this.pauseLoading = false
            if (res.code != 1) return this.$message.error(res.msg);
            this.$message.success(res.msg);
            this.getProjectList();
          });
        })
        .catch(() => { });
    },
    searchList(params) {
      this.listParams.select = params.select;
      this.getProjectList();
    },
    currentChange(page) {
      this.listParams.page = page;
      this.getProjectList();
    },
    // 在新窗口预览
    open(url) {
      window.open(url);
    },
    // 打开自定义用户价格窗口
    openCustom() {
      this.$refs.custom.open()
    },
    doRef(item) {
      if (this.refLoading) return
      this.$confirm("确定开启吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.refLoading = true
          doRef({ id: item.id }).then((res) => {
            this.refLoading = false
            if (res.code != 1) return this.$message.error(res.msg);
            this.$message.success(res.msg);
            this.getProjectList();
          });
        })
        .catch(() => { });
    },
  },
  mounted() {
    this.promotion = PROMOTION_TYPE;
    this.token = localStorage.getItem("token");
    this.getProjectList();
  },
  components: { Head, CustomPrice },
};
</script>

<style lang="scss" scoped>
@import "./project_list.scss";

::v-deep .header {
  padding: 0;
}
</style>