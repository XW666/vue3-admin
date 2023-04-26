<template>
  <div
    :class="{ show: show }"
    class="header-search"
  >
    <el-icon
      class="el-icon-search search-icon"
      @click.stop="click"
    >
      <Search />
    </el-icon>

    <el-select
      ref="headerSearchSelect"
      v-model="search"
      :remote-method="remoteMethod"
      filterable
      remote
      default-first-option
      :loading="loading"
      placeholder="搜索"
      class="header-search-select"
      @change="change"
    >
      <el-option
        v-for="item in options"
        :key="item.path"
        :value="item.value"
        :label="item.label.join(' > ')"
      />
    </el-select>
  </div>
</template>
<script lang="ts" setup>
import { ref, onUnmounted, reactive, onMounted, watch } from "vue";
interface ListItem {
  value: string;
  label: string;
}

let show = ref<Boolean>(false);
const options = ref<ListItem[]>([]);
let search = ref("");
const loading = ref<Boolean>(false);
const headerSearchSelect = ref<HTMLElement>();

const click = () => {
  show.value = !show.value;
  if (show) {
    headerSearchSelect.value && headerSearchSelect.value.focus();
  }
};
const remoteMethod = (query: string) => {
  if (query) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      options.value = [];
      // options.value = list.value.filter((item) => {
      //   return item.label.toLowerCase().includes(query.toLowerCase());
      // });
    }, 200);
  } else {
    options.value = [];
  }
};
const change = () => {};
const close = () => {
  show.value = false;
};
watch(show, (value) => {
  if (value) {
    document.body.addEventListener("click", close);
  } else {
    document.body.removeEventListener("click", close);
  }
});
</script>
 <style lang="scss" scoped>
.header-search {
  font-size: 0 !important;

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__wrapper {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>