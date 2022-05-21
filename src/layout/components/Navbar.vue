<template>
  <div class="navbar">
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <el-badge :value="msgCount" :hidden="msgCount === 0" class="bell-wrap">
        <div class="bell" @click="navToMessage">
          <img :src="bellImg" alt="" class="img">
        </div>
      </el-badge>

      <el-dropdown trigger="hover">
        <div class="app-flex-center">
          <el-avatar size="large" :src="userInfo.photo"></el-avatar>
          <span class="el-dropdown-link">
            {{ userInfo.name }}
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
      // 消息数量
      msgCount: 0
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device"]),
    // 用户头像和姓名
    userInfo() {
      const user = {
        photo: "",
        name: "",
      };
      let info = this.$store.state.user.userInfo;
      // 判断是否刷新了
      if (Object.keys(info).length === 0) {
        info = JSON.parse(localStorage.getItem("user"));
        this.$store.dispatch("user/updateUserInfo", info);
      }
      const { head, user_name, real_name } = info;
      user.photo = head || require("@/assets/401_images/401.gif");
      user.name = real_name || user_name;
      return user;
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
</style>
