<template>
  <div>
    <div class="content">
      <div class="content_1">
        <div>
          <el-radio v-model="readingStatus" label="all">全部消息</el-radio>
          <el-radio v-model="readingStatus" label="unread">仅显示未读({{ unreadTotal }})</el-radio>
          <el-radio v-model="readingStatus" label="read">仅显示已读({{ readTotal }}})</el-radio>
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
              <div class="content_2_1_1_1_1" />
              <div class="content_2_1_1_1_2">{{ item.title }}</div>
            </div>
            <div class="content_2_1_1_2">
              <div class="content_2_1_1_2_1">{{ item.addtime }}</div>
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
import { getMessageList } from '@/utils/api';
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
    },
    getMessageList(status) {
      getMessageList({ status }).then(res => {
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
            });
            this.unreadMessage = res.data.list
            this.unreadTotal = res.data.num
            break
          case 1:
            res.data.list.forEach(item => {
              item.rotate = 0;
            });
            this.readMessage = res.data.list
            this.readTotal = res.data.num
            break
        }
      })
    }
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
      if (val === 'all') {
        this.showData = this.allMessage
        this.showTotal = this.allTotal
      } else if (val === 'unread') {
        this.showData = this.unreadMessage
        this.showTotal = this.unreadTotal
      } else {
        this.showData = this.readMessage
        this.showTotal = this.readTotal
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>