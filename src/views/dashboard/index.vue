<template>
  <div class="app-page">
    <div class="content">
      <div class="content_1">
        <div class="content_1_1" v-for="(item, index) in topData" :key="index">
          <div class="content_1_1_1">{{ item.value }}</div>
          <div class="content_1_1_2">{{ item.key }}</div>
          <div class="content_1_1_3" />
        </div>
      </div>
      <div class="content_2">
        <div class="content_2_1">
          <div class="content_2_1_1">近30天预估收益(元)</div>
          <div class="content_2_1_3" />
        </div>
        <div id="main" style="height:430px;" />
      </div>
      <div class="content_3">
        <div class="content_3_1">
          <div class="content_3_1_1">
            <div class="content_3_1_1_1">审核中项目</div>
            <div class="content_3_1_1_3" @click="navToMore('/project/log')">查看更多>></div>
          </div>
          <div class="content_3_1_2">
            <el-table :data="unpexamine_projectay_table" style="width:100%" border
              :header-cell-style="{ background: '#FAFAFA', color: '#494747' }" :max-height="235">
              <el-table-column prop="title" label="项目名称" align="center" />
              <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="scope">
                  <el-tag :type="scope.row.stateTag">{{ scope.row.stateText }}</el-tag>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="content_3_1">
          <div class="content_3_1_1">
            <div class="content_3_1_1_1">进行中项目</div>
            <div class="content_3_1_1_3" @click="navToMore('/data/running')">查看更多>></div>
          </div>
          <div class="content_3_1_2">
            <el-table :data="runing_project_table" style="width:100%" border
              :header-cell-style="{ background: '#FAFAFA', color: '#494747' }" :max-height="235">
              <el-table-column prop="title" label="项目名称" align="center" />
              <el-table-column prop="price" label="近30天预估收入(元)" align="center" />
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="mask" v-if="remindersDialog">
      <div class="mask_1">
        <div class="mask_1_1">[官方提醒] 项目作业必读提醒</div>
        <div class="mask_1_2">
          <div class="mask_1_2_1">尊敬的会员您好，望项目作业前请您务必阅读以下提醒： </div>
          <div>选择开通项目前请您务必确定自身是否可以作业，开通后的项目链接或者二维码若3天内没有作业将会自动关闭，下次作业前需要会员重新提交申请项目，感谢您的理解！</div>
        </div>
        <div class="mask_1_3" @click="remindersDialog = false">知道了</div>
      </div>
    </div> -->
  </div>
</template>

<script>
import * as echarts from "echarts";
import Vue from "vue";
import { getIndex } from "@/utils/api";
import _ from "lodash";
import { APPLY_STATE } from "@/utils/const";
import { formatDate } from "@/utils";
export default {
  data() {
    return {
      topData: [
        { value: 0, key: "进行中项目", field: "runing_project" },
        { value: 0, key: "审核中项目", field: "examine_project" },
        { value: 0, key: "预估收益(元)", field: "profit_30" },
        { value: 0, key: "结算收益(元)", field: "pay_30" },
        { value: 0, key: "未结算收益(元)", field: "unpay" },
      ],
      option: {
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "预估收益",
            type: "line",
            stack: "Total",
            data: [],
          },
        ],
      },
      // 审核中项目
      unpexamine_projectay_table: [],
      // 进行中项目
      runing_project_table: [],
      remindersDialog: false,
      chart: null, // 图表
      chatResize: null, // 图表自适应
    };
  },
  methods: {
    closeDialog() {},
    // 获取首页数据
    fetchData() {
      getIndex().then((res) => {
        this.topData.forEach((v) => {
          v.value = res.data[v.field];
          if (["profit_30", "pay_30", "unpay"].includes(v.field)) {
            v.value = v.value.toFixed(2);
          }
        });
        res.data.list.forEach((v) => {
          this.option.xAxis.data.push(v.date);
          this.option.series[0].data.push(v.gmv);
        });
        this.chart.setOption(this.option);
        res.data.unpexamine_projectay_table.forEach((v) => {
          v.stateTag = "";
          v.stateText = "";
          const item = APPLY_STATE.find((val) => val.value === v.status);
          if (item) {
            v.stateTag = item.tag;
            v.stateText = item.key;
          }
        });
        // 根据时间倒序排序，并取前三条
        res.data.unpexamine_projectay_table.sort((a, b) => {
          return new Date(b.add_time) > new Date(a.add_time) ? 1 : -1;
        });
        this.unpexamine_projectay_table = res.data.unpexamine_projectay_table.splice(0, 3);
        res.data.runing_project_table.forEach((v) => {
          v.price = v.price.toFixed(2);
        });
        this.runing_project_table = res.data.runing_project_table;
      });
    },
    // 查看更多进行中项目
    navToMore(path) {
      this.$router.push(path);
    },
  },
  mounted() {
    if (localStorage.getItem("date") != formatDate(new Date(), "yyyy-MM-dd")) {
      this.$notify({
        title: '[官方提醒] 项目作业必读提醒',
        dangerouslyUseHTMLString: true,
        message: `
          <div>尊敬的会员您好，望项目作业前请您务必阅读以下提醒：</div>
          <div>选择开通项目前请您务必确定自身是否可以作业，开通后的项目链接或者二维码若3天内没有作业将会自动关闭，下次作业前需要会员重新提交申请项目，感谢您的理解！</div>
        `,
        duration: 0
      });
      localStorage.setItem("date", formatDate(new Date(), "yyyy-MM-dd"));
    }
    // if (this._remindersDialog) this.remindersDialog = false;
    // else Vue.prototype._remindersDialog = true;
    this.chart = echarts.init(document.getElementById("main"));
    // myChart.setOption(this.option);
    // 获取首页数据
    this.fetchData();
    this.chatResize = _.debounce(() => {
      console.log(1);
      this.chart.resize();
    }, 300);
    window.addEventListener("resize", this.chatResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.chatResize);
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>