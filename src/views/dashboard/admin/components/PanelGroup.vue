<template>
  <el-row
    :gutter="40"
    class="panel-group"
  >

    <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
      v-for="(item,index) in paneList"
      :key='index'
    >
      <div
        class="card-panel"
        @click="handleSetLineChartData(item)"
      >
        <div
          class="card-panel-icon-wrapper"
          :class="item.className"
        >
          <el-icon class="card-panel-icon">
            <component :is='item.icon'></component>
          </el-icon>

        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{item.title}}</div>
          <count-to
            :start-val="0"
            :end-val="item.total"
            :duration="2600"
            class="card-panel-num"
          />
        </div>
      </div>

    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import { CountTo } from "vue3-count-to";
import { reactive } from "vue";
const handleSetLineChartData = (item) => {
  console.log("ggg");
};
let paneList = reactive([
  {
    title: "总GMV（积分）",
    total: 102455,
    icon: "UserFilled",
    className: "icon-people",
  },
  {
    title: "总订单数",
    total: 81212,
    icon: "HomeFilled",
    className: "icon-message",
  },
  {
    title: "今日GMV",
    total: 9120,
    icon: "TrendCharts",
    className: "icon-money",
  },
  {
    title: "今日订单数",
    total: 13600,
    icon: "Checked",
    className: "icon-shopping",
  },
]);
</script>
<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
