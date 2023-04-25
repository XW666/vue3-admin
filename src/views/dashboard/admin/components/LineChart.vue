<template>
  <div
    ref="echartsRef"
    :style="{ height: height, width: width }"
  ></div>
</template>
<script lang="ts" setup>
import { onMounted, ref, shallowRef, toRefs, watch } from "vue";
import * as echarts from "echarts";

const props = defineProps({
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "350px",
  },
  chartData: {
    type: Object,
    required: true,
  },
});
// Proxy 应用到了整个 ECharts 实例上的问题，不太建议把整个 ECharts 实例这样的对象放到 ref 里，容易影响到实例底层的运行。
// 可以使用 shallowRef 替代，这样 Proxy 不会应用到 ECharts 实例底下的各个属性上。\
const echartsRef = ref<HTMLElement>();
let chart = shallowRef();
watch(
  props.chartData,
  () => {
    initChart();
  },
  {
    deep: true,
  }
);
const initChart = () => {
  chart.value = echarts.init(echartsRef.value!);

  setOptions(props.chartData);
};
const setOptions = (chartData) => {
  chart.value.setOption({
    xAxis: {
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      boundaryGap: false,
      axisTick: {
        show: false,
      },
    },
    grid: {
      left: 10,
      right: 10,
      bottom: 20,
      top: 30,
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      padding: [5, 10],
    },
    yAxis: {
      axisTick: {
        show: false,
      },
    },
    legend: {
      data: ["expected", "actual"],
    },
    series: [
      {
        name: "expected",
        itemStyle: {
          color: "#FF005A",
          lineStyle: {
            color: "#FF005A",
            width: 2,
          },
        },
        smooth: true,
        type: "line",
        data: chartData.expectedData,
        animationDuration: 2800,
        animationEasing: "cubicInOut",
      },
      {
        name: "actual",
        smooth: true,
        type: "line",
        itemStyle: {
          color: "#3888fa",
          lineStyle: {
            color: "#3888fa",
            width: 2,
          },
          areaStyle: {
            color: "#f3f8ff",
          },
        },
        data: chartData.actualData,
        animationDuration: 2800,
        animationEasing: "quadraticOut",
      },
    ],
  });
};
onMounted(() => {
  initChart();

  window.onresize = function () {
    setTimeout(() => {
      if (chart.value) {
        chart.value.resize();
      }
    }, 300);
  };
});
</script>
