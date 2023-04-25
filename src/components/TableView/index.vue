<template>
  <div>
    <el-table
      :key="options.type"
      v-loading="options.loading"
      :data="proList"
      :max-height="options.maxHeight"
      :stripe="options.stripe"
      ref="multipleTable"
      tooltip-effect="dark"
      style="width: 100%"
      :border="options.border"
      @selection-change="selectChange"
    >
      <!-- 列样式调整 -->
      <el-table-column
        width="10"
        fixed="left"
      ></el-table-column>

      <!-- 多选框 -->
      <el-table-column
        type="selection"
        v-if="options.select"
        fixed="left"
        align="center"
      ></el-table-column>

      <!-- 序号 -->
      <el-table-column
        v-if="options.indexNum"
        type="index"
        label="序号"
        fixed="left"
        align="center"
      ></el-table-column>

      <!-- 列 -->

      <template
        v-for="(item, index) in columns"
        :key="index"
      >

        <!-- 图片 -->
        <template v-if="item.img">
          <el-table-column
            :label="item.name"
            align="center"
          >
            <template v-slot:default="scope">
              <div class="imgBox">
                <img
                  class="img"
                  :src="scope.row[item.property]"
                  alt=""
                />
              </div>
            </template>
          </el-table-column>
        </template>

        <!-- 选择 -->
        <template v-else-if="item.select">
          <el-table-column
            :label="item.name"
            align="center"
          >
            <template v-slot:default="scope">
              <el-checkbox
                v-model="scope.row[item.property]"
                :disabled="scope.row[item.disabled]"
                @change="selectClick(scope)"
              ></el-checkbox>
            </template>
          </el-table-column>
        </template>

        <!-- 单选 -->
        <template v-else-if="item.singleSelect">
          <el-table-column
            :label="item.name"
            align="center"
          >
            <template v-slot:default="scope">
              <el-radio
                v-model="scope.row[item.property]"
                @change="singleSelectClick(scope.$index)"
                :disabled="scope.row[item.disabled]"
              ></el-radio>
              <!-- <el-checkbox v-model="scope.row[item.property]" :disabled="scope.row[item.disabled]" @change="selectClick(scope)"></el-checkbox> -->
            </template>
          </el-table-column>
        </template>

        <!-- a标签 -->
        <template v-else-if="item.tagA">
          <el-table-column
            :label="item.name"
            align="center"
          >
            <template v-slot:default="scope">
              <a
                class="tagA"
                @click="tagAClick(scope)"
              >{{
                scope.row[item.property]
              }}</a>
            </template>
          </el-table-column>
        </template>

        <!-- input框 -->
        <template v-else-if="item.input">
          <el-table-column
            align="center"
            :label="item.name"
          >
            <template v-slot:default="scope">
              <el-input
                style="width: 100px"
                min="1"
                size="mini"
                :type="item.type"
                v-model.number="scope.row[item.property]"
                :placeholder="item.placeholder"
              ></el-input>&nbsp;&nbsp;<span v-html="item.symbol"></span>
            </template>
          </el-table-column>
        </template>

        <!-- 操作列 -->
        <template v-else-if="item.link">
          <el-table-column
            align="center"
            :label="item.name"
            fixed="right"
            :width="item.width"
          >
            <template v-slot:default="scope">

              <rander-button
                :column="item"
                :row="scope.row"
                :render="item.render"
                :index="scope.$index"
              ></rander-button>

            </template>
          </el-table-column>
        </template>

        <!-- 其他 -->
        <template v-else>
          <!-- 普通 -->

          <el-table-column
            align="center"
            :label="item.name"
            :prop="item.property"
          ></el-table-column>

        </template>
      </template>
    </el-table>
    <el-pagination
      class="page"
      background
      v-if="page.show && proList.length"
      @size-change="pageSizeChange"
      @current-change="pageIndexChange"
      :page-size="page.pageSize"
      :page-sizes="
        page.pageSizeArr && page.pageSizeArr.length > 0
          ? page.pageSizeArr
          : [10, 20, 50]
      "
      :current-page="page.pageIndex"
      layout="total, prev, pager, next,jumper"
      :total="page.total"
      style="margin-top: 20px; text-align: right"
    ></el-pagination>
  </div>
</template>
<script>
/**
 * proList  表格行的参数
 */
/**
 * options：表格参数
 *   maxHeight ： 表格最大高度 Number 默认700
 *   stripe ： 是否为斑马纹 默认true
 *   loading ： 请求数据的加载动画 默认false
 *   select ： 是否支持列表项选中功能 默认false
 *   border: 是否为边框表格 默认true
 *   indexNum: 是否显示序号列 默认false
 */
/**
 * columns：表格列
 *   property ： 对应列内容的字段名 【必传】
 *   label ： 显示的标题 【必传】
 *   list: 一列展示多行时
 *   render： 针对操作列，按钮去填的
 */
/**
 * page ： 分页信息
 *   show ： 控制分页是否显示
 *   total ： 表格数据总条数
 *   pageIndex ： 当前页码
 *   pageSize ： 每页显示条目个数
 *   pageSizeArr： 控制表格的每页显示条目个数 默认[10, 20, 50]
 */
import randerButton from "../renderButton.tsx";
import { defineComponent } from "vue";
export default defineComponent({
  components: { randerButton },
  name: "tableView",
  props: {
    // 表格参数
    options: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // 表格列
    columns: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 表格数据
    proList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    page: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  created() {
    console.log("kk", this.proList);
    // === 表格参数默认值
    this.$parent.options = Object.assign(
      {
        maxHeight: 700,
        stripe: true,
        loading: false,
        mutiSelect: true,
        border: false,
        indexNum: false,
        align: "center",
      },
      this.options
    );
  },
  computed: {},

  methods: {
    // 单选
    radioChange(item, val) {
      console.log(item);
      this.radioIndex = item;
      this.$emit("radioChange", val);
    },
    // 多选
    selectChange(val) {
      this.$emit("selectChange", val);
    },
    // 勾选
    selectClick(scope) {
      this.$emit("selectClick", scope);
    },
    // 单选
    singleSelectClick(scope) {
      this.$emit("singleSelectClick", scope);
    },
    // 显示条数改变
    pageSizeChange(val) {
      this.$emit("pageSizeChange", val);
    },
    // 切换页数
    pageIndexChange(val) {
      this.$emit("pageIndexChange", val);
    },
    // 点击表格头部按钮
    headerBtnClick(btn) {
      this.$emit("headerBtnClick", btn);
    },
    // 导出当前页数据
    downloadThis() {
      this.$emit("downloadThis");
    },
    // 导出全部数据
    downloadAll() {
      this.$emit("downloadAll");
    },
    // 单独的导出按钮
    download() {
      this.$emit("download");
    },
    // tagAClick <a> 跳转
    tagAClick(item) {
      console.log(item);
      this.$emit("tagAClick", item);
    },
  },
});
</script>

<style scoped>
/* @import "~assets/style/list.scss"; */
h4 {
  display: inline-block;
}
.tableHeader {
  margin-top: 10px;
  padding: 20px;
  background: #f5f5f5 !important;
}
.imgBox {
  width: 100px;
  height: 100px;
  margin: 0 auto;
}
.imgBox .img {
  position: relative;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin: 0 auto;
}
.page {
  margin-bottom: 20px;
}
.tagA {
  color: red;
}
</style>