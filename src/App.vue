<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'App',
  created() {
    Vue.prototype._headerCellStyle = { background: '#F8FBFF', color: '#505050' };
  }
}
</script>
