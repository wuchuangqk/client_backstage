<template>
  <div>
    <div class="content">
      <div class="content_1">
        <div>
          <el-radio v-model="radio" label="1">全部消息</el-radio>
          <el-radio v-model="radio" label="1">仅显示未读(5)</el-radio>
          <el-radio v-model="radio" label="1">仅显示已读(2)</el-radio>
        </div>
        <div class="content_1_2">
          <img src="../../assets/img/biaojwyd@2x.png" class="content_1_2_1">
          <div class="content_1_2_2">全部标记为已读</div>
        </div>
      </div>
      <div class="content_2">
        <div class="content_2_1">
          <div class="content_2_1_1">
            <div class="content_2_1_1_1" />
            <div class="content_2_1_1_2">【官方提醒】项目作业必读提醒！！！</div>
          </div>
          <div class="content_2_1_2">
            <div class="content_2_1_2_1">星期三 16:10</div>
            <img src="../../assets/img/xiala@2x.png" class="content_2_1_2_2">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>