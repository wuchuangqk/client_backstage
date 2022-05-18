<template>
  <div class="sidebar-logo-container">
    <img :src="logo" alt="" class="sidebar-logo">
    <p class="wellcome">欢迎来到蚂蚁后台</p>
    <!-- <transition name="sidebarLogoFade">
      <router-link class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">蚂蚁后台</h1>
      </router-link>
    </transition> -->
  </div>
</template>

<script>
export default {
  name: "SidebarLogo",
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      title: "Vue Element Admin",
      logo: require("@/assets/logo@2x.png"),
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  // height: 50px;
  // line-height: 50px;
  background: white;
  // text-align: center;
  overflow: hidden;
  .sidebar-logo {
    width: 157px;
    height: 44px;
    margin: 38px 0 0 33px;
  }
  .wellcome {
    margin: 24px 0 33px 33px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #8a8a8a;
  }
  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }
}
</style>
