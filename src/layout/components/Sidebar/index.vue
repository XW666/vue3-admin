<template>
  <div :class="{ 'has-logo': showLogo }">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <logo
        v-if="settingsStore.sidebarLogo"
        :collapse="isCollapse"
      />
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
      >
        <sidebar-item
          v-for="route in usePermission.routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import SidebarItem from "./SidebarItem.vue";
import Logo from "./Logo.vue";
import { useAppStore } from "@/store/app";
import { usePermissionStore } from "@/store/permission";
import { useSettingsStore } from "@/store/settings";
import { useRoute } from "vue-router";
const route = useRoute();
const appStore = useAppStore();
const usePermission = usePermissionStore();
const settingsStore = useSettingsStore();
const isCollapse = computed(() => {
  return !appStore.sidebar.opened;
});
const activeMenu = computed(() => {
  const { path } = route;

  return path;
});
const showLogo = computed(() => {
  return settingsStore.sidebarLogo;
});
</script>

