<template>
  <div>
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
          <div class="content_2_1_1">近30天预估收益(远)</div>
          <div class="content_2_1_2">
            <el-select v-model="value" placeholder="请选择">
              <el-option>近30天预估收益</el-option>
            </el-select>
          </div>
          <div class="content_2_1_3" />
        </div>
        <div id="main" style="width: 1542px;height:430px;" />
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      topData: [
        { value: "0", key: "进行中项目" },
        { value: "3", key: "进行中项目" },
        { value: "4561657", key: "进行中项目" },
        { value: "1234654", key: "进行中项目" },
        { value: "45613213", key: "进行中项目" },
      ],
      option: {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
        ]
      }
    };
  },
  mounted() {
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption(this.option);
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>