<template>
  <el-dialog title="自定义用户价格" :visible.sync="dialog.show" width="1000px" :close-on-click-modal="false"
    :before-close="close">
    <el-form :model="modelData" label-position="left">
      <el-form-item label="用户名称" prop="uid">
        <el-select v-model="modelData.uid" @change="getUserPrice" filterable>
          <el-option v-for="item in userList" :value="item.id" :label="item.real_name" />
        </el-select>
      </el-form-item>
      <el-form-item label="项目名称" prop="title">
        <el-input v-model="modelData.title" clearable @input="debounceInput" style="width: 202px" />
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border :max-height="500"
      :header-cell-style="{ background: '#F8FBFF', color: '#505050' }">
      <el-table-column type="index" label="排序" width="50" align="center" />
      <el-table-column prop="title" label="项目名称" />
      <el-table-column prop="price" label="单价(元)" align="center" />
      <el-table-column prop="custom_price" label="当前自定义单价(元)" align="center" />
      <el-table-column label="自定义单价(元)" align="center">
        <template slot-scope="s">
          <el-input type="number" v-model="s.row.newPrice" @blur="save(s.row)"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <p>共{{ total }}条记录</p>
  </el-dialog>
</template>

<script>
import formMixin from "@/mixins/formMixin";
import { customPrice } from "@/utils/api";
import _ from "lodash";
export default {
  name: "RemarkForm",
  mixins: [formMixin],
  data() {
    return {
      formData: {},
      modelData: {
        uid: "", // 标题
        title: ''
      },
      userList: [],
      tableData: [],
      // 输入防抖
      debounceInput: _.debounce(() => {
        this.filterData();
      }, 300),
      total: 0
    };
  },
  methods: {
    open() {
      this.dialog.show = true;
      this.dialog.loading = false;
      this.getUserPrice()
    },
    save(row) {
      if (this.dialog.loading) return
      this.dialog.loading = true
      customPrice({
        type: 'set',
        uid: this.modelData.uid,
        pid: row.id,
        price: row.newPrice
      }).then(res => {
        this.dialog.loading = false
        if (res.code != 1) return this.$message.error(res.msg);
        this.$message.success("操作成功");
        row.custom_price = (+row.newPrice).toFixed(2)
      })
    },
    getUserPrice() {
      customPrice({
        type: 'get',
        uid: this.modelData.uid
      }).then(res => {
        res.data.list.forEach(v => v.newPrice = '')
        this.originData = res.data.list
        this.total = this.originData.length
        this.filterData()
      })
    },
    // 模糊查询项目
    filterData() {
      this.tableData = this.originData.filter(v => this.modelData.title === '' || v.title.indexOf(this.modelData.title) !== -1)
    }
  },
  created() {
    this.originData = []
  },
  mounted() {
    customPrice({
      type: 'get'
    }).then(res => {
      this.userList = res.data.select
      // 默认选择第一个
      if (this.userList.length) {
        this.modelData.uid = this.userList[0].id
        this.getUserPrice()
      }
    })
  }
};
</script>

<style lang="scss" scope>
</style>
