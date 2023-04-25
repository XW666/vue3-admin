<template>
  <div
    :class="{'hidden':hidden}"
    class="pagination-container"
  >
    <el-pagination
      :background="background"
      v-model:page="currentPage"
      v-model:limit="pageSize"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>



<script lang="ts" >
import { defineComponent } from "vue";

export default defineComponent({
  name: "pageinaSize",
  props: {
    total: {
      required: true,
      type: Number,
    },
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 20,
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50];
      },
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
    background: {
      type: Boolean,
      default: true,
    },
    autoScroll: {
      type: Boolean,
      default: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["pagination", "update:page", "update:limit"],
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val: number) {
        this.$emit("update:page", val);
      },
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val: number) {
        this.$emit("update:limit", val);
      },
    },
  },
  methods: {
    handleSizeChange(val: number) {
      this.$emit("pagination", { pageIndex: this.currentPage, limit: val });
    },
    handleCurrentChange(val: number) {
      this.$emit("pagination", { pageIndex: val, limit: this.pageSize });
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
