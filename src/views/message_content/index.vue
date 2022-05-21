<template>
  <div>
    <div class="content">
      <div class="content_1">
        <div>
          <el-radio v-model="readingStatus" label="all">全部消息</el-radio>
          <el-radio v-model="readingStatus" :label="0">仅显示未读({{ unreadTotal }})</el-radio>
          <el-radio v-model="readingStatus" :label="1">仅显示已读({{ readTotal }})</el-radio>
        </div>
        <div class="content_1_2">
          <img src="../../assets/img/biaojwyd@2x.png" class="content_1_2_1">
          <div class="content_1_2_2">全部标记为已读</div>
        </div>
      </div>
      <div class="content_2">
        <div class="content_2_1" @click="unfoldInfo(item)" v-for="(item, index) in showData" :key="index">
          <div class="content_2_1_1">
            <div class="content_2_1_1_1">
              <div class="content_2_1_1_1_1"
                :style="item.status == 0 ? ' background: #fd3636;' : ' background: #CACACA'" />
              <div class="content_2_1_1_1_2" :style="item.status == 0 ? ' color: #565656;' : ' color: #A0A0A0'">
                {{ item.title }}</div>
            </div>
            <div class="content_2_1_1_2">
              <div class="content_2_1_1_2_1" :style="item.status == 0 ? 'color: #565656;' : 'color: #A0A0A0'">
                {{ item.addtime }}</div>
              <img src="../../assets/img/xiala@2x.png" class="content_2_1_1_2_2" :id="item.id">
            </div>
          </div>
          <div class="content_2_1_2" v-show="item.rotate === 180"> {{ item.info }}</div>
        </div>
      </div>
      <div class="content_3">
        <el-pagination :page-size="10" layout="total, prev, pager, next, jumper" :total="showTotal" background />
      </div>
    </div>
  </div>
</template>

<script>
import { getMessageList, markMessage } from '@/utils/api';
export default {
  data() {
    return {
      allMessage: [],
      unreadMessage: [],
      readMessage: [],
      allTotal: 0,
      unreadTotal: 0,
      readTotal: 0,
      readingStatus: "all",
      showData: [],
      showTotal: 0,
    }
  },
  methods: {
    unfoldInfo(item) {
      item.rotate = item.rotate === 0 ? 180 : 0;
      document.getElementById(item.id).style.transform = `rotate(${item.rotate}deg)`;
      if (item.status == 0) this.markMessage(item.id)
      item.status = 1
    },
    getMessageList(status, assign = false) {
      let params = status || status == 0 ? { status } : { status: this.readingStatus }
      getMessageList(params).then(res => {
        switch (status) {
          case 'all':
            res.data.list.forEach(item => {
              item.rotate = 0;
            });
            this.allMessage = res.data.list
            this.allTotal = res.data.num
            this.showData = this.allMessage
            this.showTotal = this.allTotal
            break;
          case 0:
            res.data.list.forEach(item => {
              item.rotate = 0;
              item.status = 0
            });
            this.unreadMessage = res.data.list
            this.unreadTotal = res.data.num
            assign && ([this.showData, this.showTotal] = [this.unreadMessage, this.unreadTotal])
            this.$store.dispatch('app/setMsgCount', res.data.num)
            break
          case 1:
            res.data.list.forEach(item => {
              item.rotate = 0;
              item.status = 1
            });
            this.readMessage = res.data.list
            this.readTotal = res.data.num
            assign && ([this.showData, this.showTotal] = [this.readMessage, this.readTotal])
            break
        }
      })
    },
    markMessage(mid) {
      if (this.readingStatus === 1) return
      markMessage({ mid }).then(res => {
        if (res.code === -1) return this.$message.error(res.msg)
        this.unreadTotal != 0 && (this.unreadTotal -= 1)
        this.readTotal != 0 && (this.readTotal += 1)
        this.$store.dispatch('app/setMsgCount', this.unreadTotal)
      })
    },
  },
  mounted() {
    this.getMessageList('all');
    this.getMessageList(0);
    this.getMessageList(1);
    setTimeout(() => {
      this.getMessageList('all');
      this.getMessageList(0);
      this.getMessageList(1);
    }, 60 * 1000)
  },
  watch: {
    readingStatus(val) {
      this.getMessageList(val, true)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>