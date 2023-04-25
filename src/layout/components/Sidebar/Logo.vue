

<template>
  <div
    class="sidebar-logo-container"
    :class="{ collapse: props.collapse }"
  >
    <transition name="sidebar-logo-fade">
      <router-link
        v-if="props.collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <img
          v-if="logo"
          src="@/assets/logo.png"
          class="sidebar-logo"
        />
        <h1
          v-else
          class="sidebar-title"
        >{{ title }}</h1>
      </router-link>
      <router-link
        v-else
        key="expand"
        class="sidebar-logo-link"
        to="/"
      >
        <img
          v-if="logo"
          src="@/assets/logo.png"
          class="sidebar-logo"
        />
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const props = defineProps({
  collapse: {
    type: Boolean,
    default: true,
  },
});
let title = ref<string>("admin后台管理");
let logo = ref<boolean>(true);
</script>
<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: #304156;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 25px;
      height: 19px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
