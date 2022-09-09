<template>
  <div>
    <div class="header">
        <span style="margin-right:10px">{{title}}</span><svg t="1662535420511" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="988" width="200" height="200"><path d="M511.981695 1023.999913C230.910811 1024.174383 0.145392 794.048686 0 513.413976 0 227.603328 228.933486-1.504628 516.256206 0.007444A510.35331 510.35331 0 0 1 1024.13786 510.709694c0.756036 283.833324-228.700859 513.086671-512.156165 513.290219zM929.284433 511.785591C925.853193 279.944275 745.596788 96.111238 512.824966 95.471515 283.484384 94.831793 95.609463 276.803818 95.958403 512.65794c0 230.678184 182.05926 414.947395 415.092786 415.528962 234.400207 0.610644 415.063709-184.647229 418.233244-416.401311z" p-id="989" fill="#8a8a8a"></path><path d="M560.426149 604.312754v180.51811c0 26.664805-14.015742 46.205425-36.318801 51.730302-30.299593 7.502202-57.487807-13.317863-60.046697-46.030955-0.17447-2.180873-0.145392-4.361746-0.145392-6.542618v-358.826269c0-24.949185 10.991599-42.832342 30.561297-50.509014 32.654935-12.823532 65.600653 10.875286 65.83328 48.066437 0.378018 60.541029 0.116313 121.052979 0.116313 181.594007zM512.359713 232.633875a47.368557 47.368557 0 0 1 47.921045 47.397635 48.764315 48.764315 0 0 1-48.299063 47.543026c-25.937847 0-48.211828-22.361216-47.921044-47.921044A47.339479 47.339479 0 0 1 512.359713 232.633875z" p-id="990" fill="#8a8a8a"></path></svg>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="linechart" ref="charts">

    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "LineCharts",
  props:['title'],
  mounted() {
    let linechart = echarts.init(this.$refs.charts);
    linechart.setOption({
      xAxis: {
        type: "category",
        show: false,
      },
      grid: {
        top: 0,
        bottom: 0,
        left: -15,
        right: 10,
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


<style scoped lang="scss">
  .header{
    display: flex;
    align-items: center;
    color:rgb(140, 140, 140);
    font-size: 14px;
  }
  .center{
    margin-top: 10px;
    .mini{
      font-size: 15px;
    }
    span{
      font-size: 30px;
    }

  }
.icon{
    width: 15px;
    height: 15px;
}
.linechart {
  height: 50px;
  width: 100%;
}
</style>