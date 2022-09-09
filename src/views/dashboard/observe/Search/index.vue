<template>
  <el-card>
    <div slot="header" class="clearfix">
      <div class="header-text">
        <span>线上热门搜索</span
        ><el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-row>
      <el-col :span="12">
        <line-charts title="搜索用户数">
          <template slot="center">
            <span style="margin-right: 10px">12321</span
            ><span class="mini">17.1</span
            ><svg
              t="1662536782465"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5044"
              width="20"
              height="20"
            >
              <path
                d="M752.64 376.32 546.56 202.88c-19.2-16-50.56-16-69.76 0L270.72 376.32C240 402.56 261.76 447.36 305.28 447.36L384 447.36C384 447.36 384 448 384 448l0 320c0 35.2 28.8 64 64 64l128 0c35.2 0 64-28.8 64-64L640 448c0 0 0-0.64 0-0.64l78.08 0C761.6 447.36 783.36 402.56 752.64 376.32z"
                p-id="5045"
                fill="#d81e06"
              ></path>
            </svg>
          </template>
        </line-charts>
      </el-col>
      <el-col :span="12">
        <line-charts title="人均搜索次数">
          <template slot="center">
            <span style="margin-right: 10px">12321</span
            ><span class="mini">26.2</span
            ><svg
              t="1662536743256"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3974"
              width="200"
              height="200"
            >
              <path
                d="M258.048 568.832l253.952 279.04 253.952-279.04c22.016-24.064 13.312-43.52-18.944-43.52H629.76v-322.56c0-32.768-26.112-58.88-58.88-58.88h-117.76c-32.256 0-58.368 26.112-58.88 58.368v323.072H276.992c-31.744 0-40.448 19.456-18.944 43.52z"
                fill="#11c23f"
                p-id="3975"
              ></path>
            </svg>
          </template>
        </line-charts>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table
      border
      :data="tableData"
      style="width: 100%; margin-top: 10px"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column prop="date" label="排名" width="180"> </el-table-column>
      <el-table-column prop="name" label="搜索关键字" width="180">
      </el-table-column>
      <el-table-column prop="address" label="用户数" sortable>
      </el-table-column>
      <el-table-column prop="address" label="周涨幅" sortable>
      </el-table-column>
    </el-table>
    <el-pagination small layout="prev, pager, next" :total="50" style="float:right;margin-top:10px">
    </el-pagination>
  </el-card>
</template>

<script>
import LineCharts from "./lineCharts/index.vue";
export default {
  components: { LineCharts },
  data() {
    return {
      tableData: [],
    };
  },
};
</script>

<style scoped>
.header-text {
  display: flex;
  justify-content: space-between;
}
.chart-container {
  height: 60px;
}
</style>