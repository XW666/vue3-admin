<template>
  <div class="dashboard-editor-container">

    <panel-group />
    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">
      <line-chart
        :chartData="lineChartData"
        className="lineChart"
        id="lineChart"
      />
    </el-row>
    <el-row :gutter="32">
      <el-button
        type="primary"
        @click="bthnClick()"
      >修改数据</el-button>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { ref, toRefs, reactive, h, watch } from "vue";
import PanelGroup from "./components/PanelGroup.vue";
import LineChart from "./components/LineChart.vue";

let lineChartData = reactive({
  expectedData: [100, 120, 161, 134, 105, 160, 165],
  actualData: [120, 82, 91, 154, 162, 140, 145],
});
const bthnClick = () => {
  let arr = [10, 12, 61, 34, 15, 60, 65];
  let arr2 = [160, 182, 191, 254, 362, 140, 145];
  Object.assign(lineChartData, { expectedData: arr, actualData: arr2 });
};
</script>
<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
</style>
