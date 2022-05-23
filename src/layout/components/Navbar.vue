<template>
  <div class="navbar">
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <div class="download">
        <el-link :underline="false" @click="downloadPdf">操作手册</el-link>
        <img :src="downloadIcon" alt="" class="img">
      </div>
      <el-badge :value="msgCount" :hidden="msgCount === 0" class="bell-wrap">
        <div class="bell" @click="navToMessage">
          <img :src="bellImg" alt="" class="img">
        </div>
      </el-badge>

      <el-dropdown trigger="hover">
        <div class="app-flex-center">
          <el-avatar size="large" :src="userInfo.photo"></el-avatar>
          <span class="el-dropdown-link">
            {{ `${userInfo.name}(ID:${userInfo.id})` }}
          </span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="modifyPassword">
            <i class="el-icon-lock"></i>
            <span>修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <i class="el-icon-switch-button"></i>
            <span>退出系统</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <ModifyPassword ref="password" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import ModifyPassword from "./modify-password.vue";
import { getUnReadMsg } from "@/utils/api";

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ModifyPassword,
  },
  data() {
    return {
      // 小铃铛图片
      bellImg: require("@/assets/img/xiaoxi@2x.png"),
      downloadLoading: false,
      // 下载icon
      downloadIcon: require("@/assets/img/xaizai@2x.png"),
      // 定时器
      pullTimer: null,
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device"]),
    // 用户头像和姓名
    userInfo() {
      const user = {
        photo: require("@/assets/img/default.png"), // 头像
        name: "", // 真实姓名
        id: "", // id
      };
      let info = this.$store.state.user.userInfo;
      // 判断是否刷新了
      if (Object.keys(info).length === 0) {
        info = JSON.parse(localStorage.getItem("user"));
        this.$store.dispatch("user/updateUserInfo", info);
      }
      if (info) {
        const { head, user_name, real_name, id } = info;
        user.photo = head || require("@/assets/img/default.png");
        user.name = real_name || user_name;
        user.id = id;
      }
      return user;
    },
    // 未读消息数量
    msgCount() {
      return this.$store.state.app.msgCount;
    },
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    // 退出登录
    logout() {
      this.$confirm("确定退出吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 清除本地缓存
          localStorage.removeItem("token");
          localStorage.removeItem("tree");
          this.$router.push(`/login?redirect=${this.$route.fullPath}`);
        })
        .catch(() => {});
    },
    // 修改密码
    modifyPassword() {
      this.$refs.password.open();
    },
    // 跳转到消息页面
    navToMessage() {
      this.$router.push("/message_content/list");
    },
    // 轮询未读消息数量
    pull() {
      getUnReadMsg().then((res) => {
        this.$store.dispatch("app/setMsgCount", (res.data || []).length);
      });
      // 时间间隔：1分钟
      const interval = 1 * 60 * 1000;
      this.pullTimer = setInterval(() => {
        getUnReadMsg().then((res) => {
          this.$store.dispatch("app/setMsgCount", (res.data || []).length);
        });
      }, interval);
    },
    // 下载操作手册
    downloadPdf() {
      if (this.downloadLoading) {
        return;
      }
      this.downloadLoading = true;
      const link = document.createElement("a");
      link.href = "http://mayi.dingdangkuaibao.com/manual.pdf";
      link.download = "操作手册";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => {
        this.downloadLoading = false;
      }, 2000);
    },
  },
  mounted() {
    clearInterval(this.pullTimer);
    // 轮询未读消息数量
    this.pull();
  },
  beforeDestroy() {
    // 组件卸载时清楚定时器
    clearInterval(this.pullTimer);
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 80px;
  overflow: hidden;
  position: relative;
  background: #fbfbfb;
  display: flex;
  align-items: center;

  .breadcrumb-container {
    float: left;
    display: flex;
    align-items: center;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    margin-left: auto;
    display: flex;
    align-items: center;
    .el-dropdown-link {
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #686868;
      margin: 0 0px 0 19px;
    }
    .el-icon-arrow-down {
      margin-right: 30px;
    }
    .el-dropdown-link:hover,
    .el-icon-arrow-down:hover {
      cursor: pointer;
    }
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.bell {
  width: 43px;
  height: 43px;
  background: #ffffff;
  border: 1px solid #c2c2c2;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: #f3f6fb;
  }
  .img {
    width: 20px;
    height: 24;
  }
}
.bell-wrap {
  margin-right: 32px;
}
.download {
  margin-right: 32px;
  .el-link {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #367afd;
    text-decoration: none;
  }
  .img {
    width: 19px;
    height: 17px;
    margin-left: 6px;
    vertical-align: text-bottom;
  }
}
</style>
