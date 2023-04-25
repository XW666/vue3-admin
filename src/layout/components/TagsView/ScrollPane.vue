<template>
  <el-scrollbar
    ref="scrollbarRef"
    :vertical="false"
    class="scroll-container"
    @wheel.prevent="handleScroll"
    @scroll="scroll"
  >
    <slot />
  </el-scrollbar>
</template>
<script lang="ts" setup>
import { ElScrollbar } from "element-plus";
import { ref } from "vue";
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>();
/** 当前滚动条距离左边的距离 */
let currentScrollLeft = 0;
const tagAndTagSpacing = 4; // tagAndTagSpacing
const handleScroll = (e) => {
  const eventDelta = e.wheelDelta || -e.deltaY * 40;
  // const $scrollWrapper = scrollbarRef;
  let scrollLeft = currentScrollLeft + eventDelta / 4;

  scrollbarRef.value!.setScrollLeft(scrollLeft);
};
/** 滚动时触发 */
const scroll = ({ scrollLeft }: { scrollLeft: number }) => {
  currentScrollLeft = scrollLeft;
};
</script>
