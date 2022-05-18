<template>
  <div class="has-logo">
    <Logo />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" :collapse="false" :unique-opened="false"
        :collapse-transition="false" mode="vertical">
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";
import { constantRoutes } from "@/router/index";

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(["sidebar"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
    permission_routes() {
      // const tree = JSON.parse(localStorage.getItem('tree'))
      // return this.filterMenu(tree)
      return constantRoutes
    },
  },
  methods: {
    // 筛选出菜单
    filterMenu(arr) {
      return arr.filter(v => {
        if (v.is_menu === 2) {
          if (v.son) {
            v.son = this.filterMenu(v.son)
          }
          return true
        }
        return false
      })
    },
    // 路由跳转
    handleOpen(key) {
      this.$router.push(key);
    }
  }
};
</script>
