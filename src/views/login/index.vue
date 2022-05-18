<template>
  <div class="content">
    <div class="content_1">
      <div class="content_1_1">蚂蚁管理后台登录</div>
      <div class="content_1_2" />
      <input type="text" class="content_1_3" placeholder="请输入账号" v-model="doLoginParams.user_name">
      <input type="password" class="content_1_3" placeholder="请输入密码" v-model="doLoginParams.password">
      <div class="content_1_4" @click="doLogin">登录</div>
    </div>
  </div>
</template>
<script>
import { dologin } from '@/utils/api';
export default {
  data() {
    return {
      doLoginParams: {},
    };
  },
  methods: {
    // 登录
    doLogin() {
      dologin(this.doLoginParams).then(res => {
        if (res.code === -1) return this.$message.error(res.msg)
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('tree', res.data.tree)
      })
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
