<template>
  <div>
    <el-button @click="handleLogin">登录</el-button>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      redirect: undefined,
      otherQuery: {},
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  methods: {
    handleLogin() {
      this.$store
        .dispatch("user/login")
        .then(() => {
          this.$router.push({
            path: this.redirect || "/",
            query: this.otherQuery,
          });
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
