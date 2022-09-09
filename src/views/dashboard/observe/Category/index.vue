<template>
  <el-card>
    <div slot="header" class="clearfix">
      <div class="header-container">
        <span>销售额占类比</span>
        <el-radio-group v-model="radio1" size="small">
          <el-radio-button label="全部渠道"></el-radio-button>
          <el-radio-button label="线上"></el-radio-button>
          <el-radio-button label="门店"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="chart" ref="chart"></div>
    </div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Category",
  mounted() {
    let chart = echarts.init(this.$refs.chart);
    chart.setOption({
      title: {
        text: "rose 1",
        subtext: "40",
        left: "center",
        top: "center",
      },
      legend: {
        top: "bottom",
      },
      toolbox: {
        show: false,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      series: [
        {
          name: "Nightingale Chart",
          type: "pie",
          radius: [50, 150],
          center: ["50%", "50%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 8,
          },
          label: {},
          data: [
            { value: 40, name: "rose 1" },
            { value: 38, name: "rose 2" },
            { value: 32, name: "rose 3" },
            { value: 30, name: "rose 4" },
            { value: 28, name: "rose 5" },
          ],
        },
      ],
    });
    chart.on("mouseover", (params) => {
      chart.setOption({
        title: {
          text: params.data.name,
          subtext:params.data.value,
        },
      });
    });
  },
};
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.chart {
  height: 400px;
}
</style>