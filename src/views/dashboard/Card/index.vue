<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6"><el-card>
        <Detail title="销售额" count="￥166890">
            <template slot="charts">
                <span>周同比  56.67%</span><svg style="margin-right:10px" t="1662536782465" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5044" width="200" height="200"><path d="M752.64 376.32 546.56 202.88c-19.2-16-50.56-16-69.76 0L270.72 376.32C240 402.56 261.76 447.36 305.28 447.36L384 447.36C384 447.36 384 448 384 448l0 320c0 35.2 28.8 64 64 64l128 0c35.2 0 64-28.8 64-64L640 448c0 0 0-0.64 0-0.64l78.08 0C761.6 447.36 783.36 402.56 752.64 376.32z" p-id="5045" fill="#d81e06"></path></svg>
                
                <span>日同比  45.67%</span><svg t="1662536743256" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3974" width="200" height="200"><path d="M258.048 568.832l253.952 279.04 253.952-279.04c22.016-24.064 13.312-43.52-18.944-43.52H629.76v-322.56c0-32.768-26.112-58.88-58.88-58.88h-117.76c-32.256 0-58.368 26.112-58.88 58.368v323.072H276.992c-31.744 0-40.448 19.456-18.944 43.52z" fill="#11c23f" p-id="3975"></path></svg>
            </template>
            <template slot="footer">
                <span>日销售额 ￥1589</span> 
            </template>
        </Detail>
      </el-card></el-col>
      <el-col :span="6"><el-card>
        <Detail title="访问量" count="88922" >
            <template slot="charts">
                <LineChart></LineChart>
            </template>
            <template slot="footer">
                <span>日访问量 6822</span> 
            </template>
        </Detail>
      </el-card></el-col>
      <el-col :span="6"><el-card>
        <Detail title="支付笔数" count="66923" >
            <template slot="charts">
                    <BarChart></BarChart>
            </template>
            <template slot="footer">
                <span>转换率 35%</span> 
            </template>
        </Detail>
      </el-card></el-col>
      <el-col :span="6"><el-card>
        <Detail title="运营活动效果" count="78%">
            <template slot="charts">
                    <ProgressChart></ProgressChart>
            </template>
            <template slot="footer">
                <span>周同比 12%</span><svg style="margin-right:10px" t="1662536782465" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5044" width="200" height="200"><path d="M752.64 376.32 546.56 202.88c-19.2-16-50.56-16-69.76 0L270.72 376.32C240 402.56 261.76 447.36 305.28 447.36L384 447.36C384 447.36 384 448 384 448l0 320c0 35.2 28.8 64 64 64l128 0c35.2 0 64-28.8 64-64L640 448c0 0 0-0.64 0-0.64l78.08 0C761.6 447.36 783.36 402.56 752.64 376.32z" p-id="5045" fill="#d81e06"></path></svg>
                
                <span>日同比 11%</span><svg t="1662536743256" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3974" width="200" height="200"><path d="M258.048 568.832l253.952 279.04 253.952-279.04c22.016-24.064 13.312-43.52-18.944-43.52H629.76v-322.56c0-32.768-26.112-58.88-58.88-58.88h-117.76c-32.256 0-58.368 26.112-58.88 58.368v323.072H276.992c-31.744 0-40.448 19.456-18.944 43.52z" fill="#11c23f" p-id="3975"></path></svg>
            </template>

        </Detail>
      </el-card></el-col>
    </el-row>
  </div>
</template>

<script>
import LineChart from './lineChart'
import Detail from './Detail/index.vue';
import BarChart from './barChart'
import ProgressChart from './progressChart'
export default {
    name: "Card",
    components: { Detail,LineChart,BarChart,ProgressChart}
};
</script>

<style>
</style>