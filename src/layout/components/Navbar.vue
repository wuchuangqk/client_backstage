<template>
  <div class="navbar">
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
      </template>
      <el-avatar size="large" :src="photo"></el-avatar>
      <el-dropdown trigger="hover">
        <span class="el-dropdown-link">
          张三
        </span>
        <i class="el-icon-arrow-down el-icon--right"></i>
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  data() {
    return {
      photo: require("@/assets/401_images/401.gif"),
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device"]),
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
      
    }
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 105px;
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
</style>
