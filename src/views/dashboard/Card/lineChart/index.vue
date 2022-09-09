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
          data: [150, 60, 224, 70, 122, 66, 199, 98],
          type: "line",
          itemStyle: { opacity: 0 },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "blue", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#fff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
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