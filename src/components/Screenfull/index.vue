<template>
  <div @click="click">
    <component
      :is="isFullscreen ? 'Rank' : 'FullScreen'"
      class="screeen-icon"
    />

  </div>
</template>
<script lang="ts" setup>
import screenfull from "screenfull";
import { ref, onUnmounted } from "vue";
import { ElMessage } from "element-plus";
const isFullscreen = ref<boolean>(false);

const click = () => {
  if (!screenfull.isEnabled) {
    ElMessage.warning("您的浏览器无法工作");
    return;
  }
  screenfull.toggle();
};

const change = () => {
  isFullscreen.value = screenfull.isFullscreen;
};

screenfull.on("change", change);
onUnmounted(() => {
  if (screenfull.isEnabled) {
    screenfull.off("change", change);
  }
});
</script>
<style scoped>
.screeen-icon {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
</style>