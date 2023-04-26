<template>

  <div
    :class="classObj"
    class="app-wrapper"
  >
    <div
      v-if="appStore.sidebar.device==='mobile'&&appStore.sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <Navbar />
      <tags-view />

      <app-main />
    </div>
  </div>
</template>
<script lang="ts" setup >
import { computed } from "vue";
import { useAppStore } from "../store/app";
import { AppMain, Sidebar, TagsView, Navbar } from "./components";
import useResize from "./hooks/useResize";
const appStore = useAppStore();
const classObj = computed(() => {
  return {
    hideSidebar: !appStore.sidebar.opened,
    openSidebar: appStore.sidebar.opened,
    withoutAnimation: appStore.sidebar.withoutAnimation,
    mobile: appStore.sidebar.device === "mobile",
  };
});
useResize();
const handleClickOutside = () => {
  appStore.closeSidebar(false);
};
</script>
<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>