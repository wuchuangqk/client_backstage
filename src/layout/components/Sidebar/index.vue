<template>
  <div class="has-logo">
    <Logo />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" :collapse="false" :unique-opened="false"
        :collapse-transition="false" mode="vertical">
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
    <div class="space"></div>
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
      const tree = JSON.parse(localStorage.getItem('tree'))
      return this.filterMenu(constantRoutes, this.getNameFromTree(tree))
      // return constantRoutes
    },
  },
  methods: {
    // 筛选出菜单
    filterMenu(routes, arr) {
      return routes.filter(v => {
        // 没有name或者是隐藏菜单的，直接放行
        if (!v.name || v.hidden) {
          return true
        }
        // 返回的权限菜单里不包含此项
        if (!arr.includes(v.name)) {
          return false
        }
        // 当返回的权限菜单里包含此项里，继续检查菜单下的子项
        if (v.children) {
          v.children = this.filterMenu(v.children, arr)
        }
        return true
      })
    },
    // 提取tree里的name，转成扁平数组
    getNameFromTree(tree, names) {
      tree.forEach(v => {
        if (v.is_menu === 2) {
          names.push(v.name)
        }
        if (v.son) {
          this.getNameFromTree(v.son, names)
        }
      })
    },
    // 路由跳转
    handleOpen(key) {
      this.$router.push(key);
    }
  }
};
</script>
<style scoped lang="scss">
  .space {
    padding: 10px 0;
  }
</style>
