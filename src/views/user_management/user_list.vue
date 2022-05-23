<template>
  <div>
    <div class="content app-page">
      <div class="content_2">
        <el-button type="primary" @click="dialogFormVisible2 = true" v-if="addPermission">添加用户</el-button>
      </div>
      <el-table border :header-cell-style="_headerCellStyle" :data="userList">
        <el-table-column prop="id" label="ID" width="80" align="center" />
        <el-table-column prop="user_name" label="管理员名称" />
        <el-table-column prop="login_times" label="登录次数" />
        <el-table-column prop="source" label="来源" />
        <el-table-column prop="last_login_ip" label="上次登录IP" width="130" />
        <el-table-column prop="last_login_time" label="上次登录时间" width="160" align="center" />
        <el-table-column prop="real_name" label="真实姓名" />
        <el-table-column label="状态" width="70" align="center">
          <template slot-scope="s">
            <el-tag type="success" v-if="s.row.status === '正常'">{{ s.row.status }}</el-tag>
            <el-tag type="success" v-if="s.row.danger === '禁用'">{{ s.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template v-if="s.row.id !== 1" slot-scope="s">
            <el-button type="text" @click="userdel(s.row)" v-if="delPermission">删除</el-button>
            <el-button type="text" @click="beforeEdit(s.row)" v-if="editPermission">编辑</el-button>
            <el-button type="text" @click="bindNode(s.row)">绑定节点</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="content_1">
        <el-pagination background layout="prev, pager, next,jumper" :total="userListTotal" @current-change="changePage" />
      </div>
    </div>
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisible">
      <el-form :model="userItem" label-width="1.25rem" label-position="left" width="10rem">
        <el-form-item label="真实姓名">
          <el-input v-model="userItem.real_name" />
        </el-form-item>
        <el-form-item label="登录账号">
          <el-input v-model="userItem.user_name" />
        </el-form-item>
        <el-form-item label="账号来源">
          <el-input v-model="userItem.source" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="useredit">确 定</el-button>
      </div>
    </el-dialog>
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
        <!-- <el-form-item label="当前角色">
          <el-select v-model="useraddParams.role_id" placeholder="请选择角色">
            <el-option v-for="(item, index) in roleList" :key="index" :value="item.id" :label="item.role_name" />
          </el-select>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="useradd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate, getPermission } from '@/utils';
import { getUserList, saveUser, delUser, updateUser } from '@/utils/api';
export default {
  data() {
    return {
      // 管理员列表参数
      userListParams: { page: 1, num: 10 },
      // 管理员列表
      userList: [],
      // 管理员列表总数
      userListTotal: 0,
      // 管理员信息
      userItem: {},
      // 修改管理员对话框
      dialogFormVisible: false,
      // 角色列表
      roleList: [],
      // 添加管理员对话框
      dialogFormVisible2: false,
      // 添加管理员参数
      useraddParams: {},
      // 添加管理员权限
      addPermission: true,
      // 修改管理员权限
      editPermission: true,
      // 删除管理员权限
      delPermission: true,
    };
  },
  methods: {
    // 更改页码
    changePage(page) {
      this.userListParams.page = page;
      this.getUserList();
    },
    // 管理员列表
    getUserList() {
      getUserList(this.userListParams).then(res => {
        res.data.list.forEach(item => {
          item.last_login_time = formatDate(item.last_login_time * 1000, 'yyyy-MM-dd hh:mm:ss');
        });
        this.userList = res.data.list;
        this.userListTotal = res.data.rows;
      });
    },
    // 删除管理员
    userdel(item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        delUser({ id: item.id }).then(res => {
          if (res.code != 1) return this.$message.error(res.msg);
          this.$message.success('删除成功');
          this.getUserList();
        });
      });
    },
    // 修改管理员前置
    beforeEdit(row) {
      this.userItem = JSON.parse(JSON.stringify(row));
      this.dialogFormVisible = true;
    },
    // 修改管理员
    useredit() {
      updateUser(this.userItem).then(res => {
        if (res.code != 1) return this.$message.error(res.msg);
        this.$message.success('修改成功');
        this.dialogFormVisible = false;
        this.getUserList();
      });
    },
    // 添加管理员
    useradd() {
      saveUser(this.useraddParams).then(res => {
        if (res.code != 1) return this.$message.error(res.msg);
        this.$message.success('添加成功');
        this.dialogFormVisible2 = false;
        this.getUserList();
      });
    },
    // 初始化参数
    initParams() {
      this.addPermission = getPermission('用户管理', '用户列表', '添加管理员');
      this.editPermission = getPermission('用户管理', '用户列表', '编辑管理员');
      this.delPermission = getPermission('用户管理', '用户列表', '删除管理员');
    },
    // 绑定节点
    bindNode({ id, rule }) {
      this.$router.push({
        path: '/message_center/node',
        query: {
          id,
          rule
        }
      })
    }
  },
  mounted() {
    // 初始化参数
    // this.initParams();
    // 管理员列表
    this.getUserList();
  },
};
</script>

<style lang="scss" scoped>
@import './user_list.scss';
</style>
