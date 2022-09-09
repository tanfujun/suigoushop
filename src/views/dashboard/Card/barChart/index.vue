<template>
  <div class="linechart" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "LineChart",
  mounted() {
    let linechart = echarts.init(this.$refs.charts);
    console.log(linechart);
    linechart.setOption({
      xAxis: {
        type: "category",
        show: false,
      },
      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          smooth: true,
          data: [150, 88, 133, 244, 122, 66, 199, 98,106],
          type: "bar",
          color:'purple',
        },
      ],
    });
  },
};
</script>

<style scoped>
.linechart {
  height: 100%;
  width: 100%;
}
</style>