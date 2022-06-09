<template>
  <div class="app-page">
    <Head :searchParams="templateParams" :functionParams="functionParams" @searchList="doSearch"
      @clickBack="clickBack" />
    <el-table v-loading="tableLoading" :data="tableData" :header-cell-style="_headerCellStyle" border
      element-loading-spinner="el-icon-loading" element-loading-text="加载中，请稍候……">
      <el-table-column type="index" label="排序" width="50" align="center" />
      <el-table-column label="项目名称" prop="title" align="left"></el-table-column>
      <el-table-column label="推广类型" prop="promotion" align="center"></el-table-column>
      <el-table-column label="单价(元)" prop="price" align="center" v-if="userId != 48 && userId != 58"></el-table-column>
      <el-table-column label="项目流程" prop="" align="center">
        <template slot-scope="scope">
          <el-link v-if="scope.row.pic" type="primary" :underline="false" @click="open(scope.row.pic)">图片</el-link>
          <el-link v-if="scope.row.video" type="primary" :underline="false" @click="open(scope.row.video)">视频</el-link>
          <el-link v-if="scope.row.file" type="primary" :underline="false" @click="open(scope.row.file)">文件</el-link>
        </template>
      </el-table-column>
      <el-table-column label="H5链接" prop="code" align="center"></el-table-column>
      <el-table-column label="二维码" prop="" align="center">
        <template slot-scope="scope">
          <el-link v-if="scope.row.codeImgArr.length" type="primary" :underline="false"
            @click="previewImg(scope.row.codeImgArr)">查看{{ scope.row.codeImgArr.length > 1 ? `(${scope.row.codeImgArr.length})` : '' }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="申请状态" prop="status" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.stateTag">{{ scope.row.stateText }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="申请时间" prop="add_time" align="center"></el-table-column>
    </el-table>
    <footer class="app-pagination-wrap">
      <el-pagination :page-sizes="pageSizes" background layout="prev, pager, next, jumper" :total="total"
        :page-size="searchParams.num" :current-page="searchParams.page" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </footer>
    <el-image src="" :preview-src-list="previewImgs" ref="preview" style="position:absolute;">
    </el-image>
  </div>
</template>

<script>
import Head from "@/components/Head/index.vue";
import listMixin from "@/mixins/listMixin";
import { getUserApplyList } from "@/utils/api";
import { APPLY_STATE } from "@/utils/const";
import excel from "@/vendor/Export2Excel";
export default {
  components: { Head },
  mixins: [listMixin],
  data() {
    return {
      // 列表数据
      tableData: [],
      // 搜索参数
      templateParams: [
        {
          key: "select",
          value: "",
          label: "项目名称",
          placeholder: "请输入",
          type: "input",
        },
      ],
      // 按钮参数
      functionParams: [{ text: "导出", callback: "exportListData", loading: false }],
      applyState: APPLY_STATE,
      previewImgs: [], // 二维码预览
    };
  },
  methods: {
    clickBack(fn) {
      this[fn]()
    },
    // 导出列表数据
    exportListData() {
      this.functionParams[0].loading = true;
      getUserApplyList({ page: 1, num: 99999 }).then((res) => {
        res.data.list.forEach(v => {
          v.stateText = ''
          const item = this.applyState.find(val => val.value === v.status)
          if (item) {
            v.stateText = item.key
          }
        })
        excel.exportArrayToExcel({
          title: [
            "项目名称",
            "推广类型",
            "单价(元)",
            "H5链接",
            "申请状态",
            "申请时间",
          ],
          key: ["title", "promotion", "price", "code", "stateText", "add_time"],
          data: res.data.list,
          autoWidth: true,
          filename: "申请记录",
        });
        this.functionParams[0].loading = false;
      });
    },
    // 获取列表数据
    fetchData() {
      getUserApplyList(this.searchParams).then((res) => {
        res.data.list.forEach(v => {
          v.stateTag = ''
          v.stateText = ''
          const item = this.applyState.find(val => val.value === v.status)
          if (item) {
            v.stateTag = item.tag
            v.stateText = item.key
          }
          v.codeImgArr = v.code_img ? v.code_img.split(',') : []
          v.pic = v.pic && v.pic.trim()
          v.video = v.video && v.video.trim()
          v.file = v.file && v.file.trim()
        })
        this.tableData = res.data.list;
        this.total = res.data.num;
      });
    },
    // 执行搜索
    doSearch(params) {
      this.searchParams = Object.assign(this.searchParams, params);
      this.search();
    },
    // 在新窗口预览
    open(url) {
      window.open(url)
    },
    // 预览二维码
    previewImg(imgArr) {
      this.previewImgs = imgArr
      this.$nextTick(() => {
        this.$refs.preview.clickHandler()
      })
    }
  },
  mounted() {
    // 获取列表数据
    this.fetchData();
    this.userId = this.$store.state.user.userInfo.id;
  },
};
</script>

<style lang="scss" scoped>
::v-deep .header {
  padding: 0;
}
</style>


