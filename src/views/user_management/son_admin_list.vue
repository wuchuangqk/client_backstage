<template>
  <div>
    <div class="content app-page">
      <div class="content_2">
        <el-button type="primary" @click="dialogFormVisible2 = true">添加账号</el-button>
      </div>
      <el-table border :header-cell-style="_headerCellStyle" :data="list">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="user_name" label="管理员名称" />
        <el-table-column prop="login_times" label="登录次数" />
        <el-table-column prop="source" label="来源" />
        <el-table-column prop="last_login_ip" label="上次登录IP" align="center" width="130" />
        <el-table-column prop="last_login_time" label="上次登录时间" align="center" width="160" />
        <el-table-column prop="real_name" label="真实姓名" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="share" label="分成比例" align="right" />
        <el-table-column prop="city" label="作业城市" />
        <el-table-column label="状态" align="center" width="70">
          <template slot-scope="s">
            <el-tag type="success" v-if="s.row.status === '正常'">{{ s.row.status }}</el-tag>
            <el-tag type="success" v-if="s.row.danger === '禁用'">{{ s.row.status }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <div class="content_1">
        <el-pagination background layout="prev, pager, next,jumper" :total="count" @current-change="changePage" />
      </div>
    </div>
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible2" label-position="left" width="10rem">
      <el-form :model="useraddParams" label-width="1.25rem">
        <el-form-item label="真实姓名">
          <el-input v-model="useraddParams.real_name" />
        </el-form-item>
        <el-form-item label="登录账号">
          <el-input v-model="useraddParams.user_name" />
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input v-model="useraddParams.password" type="password" />
        </el-form-item>
        <el-form-item label="账号来源">
          <el-input v-model="useraddParams.source" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="useraddParams.phone" />
        </el-form-item>
        <el-form-item label="作业城市">
          <el-input v-model="useraddParams.city" />
        </el-form-item>
        <el-form-item label="分成比例">
          <el-input v-model="useraddParams.share" placeholder="请输入小数，例：0.8  为该账号获取所有收益的80%，剩余部分归该账号上级所有" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="share_useradd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from '@/utils';
import { share_index, share_useradd } from '@/utils/api'
export default {
  data() {
    return {
      params: { page: 1, num: 10 },
      list: [],
      count: 0,
      dialogFormVisible2: false,
      useraddParams: {}
    }
  },
  methods: {
    share_index() {
      share_index(this.params).then(res => {
        res.data.list.forEach(item => {
          item.last_login_time = formatDate(item.last_login_time * 1000, 'yyyy-dd-mm hh:MM:ss')
        });
        this.list = res.data.list
        this.count = res.data.rows
      })
    },
    changePage(page) {
      this.params.page = page
      this.share_index()
    },
    share_useradd() {
      share_useradd(this.useraddParams).then(res => {
        if (res.code == -1) return this.$message.error(res.msg)
        this.dialogFormVisible2 = false
        this.$message.success('添加成功')
        this.share_index()
      })
    },
  },
  mounted() {
    this.share_index()
  },
}
</script>

<style lang="scss" scoped>
@import './user_list.scss';
</style>