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
        
        show: false,
        min:0,
        max:100
      },
      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      yAxis: {
        type: "category",
        show: false,
      },
      series: [
        {
          smooth: true,
          data: [78],
          type: "bar",
          color:'yellowgreen',
          barWidth:10,
          showBackground:true,
          backgroundStyle:{
            color:'#eee'
          },
          label:{
            show:true,
            formatter:'|',
            position:'right'
          }
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