<template>
  <div
    v-if="!props.item.meta?.hidden"
    class="menu-wrapper"
  >
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!alwaysShowRootMenu">

      <app-link
        v-if="onlyOneChild.meta"
        :to="resolvePath(onlyOneChild.path)"
      >
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <component
            v-if="onlyOneChild.meta.icon"
            :is="onlyOneChild.meta.icon"
            class="el-icon"
          />
          <template
            v-if="onlyOneChild.meta.title"
            #title
          >
            {{ onlyOneChild.meta.title }}
          </template>

        </el-menu-item>
      </app-link>
    </template>
    <el-sub-menu
      v-else
      ref="subMenu"
      :index="resolvePath(props.item.path)"
      teleported
    >
      <template #title>
        <component
          v-if="props.item.meta && props.item.meta.icon"
          :is="props.item.meta.icon"
          class="el-icon"
        />
        <span v-if="props.item.meta.title">{{ props.item.meta.title }}</span>
      </template>
      <template v-if="props.item.children">
        <sidebar-item
          v-for="child in props.item.children"
          :key="child.path"
          :is-collapse="props.isCollapse"
          :item="child"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
      </template>
    </el-sub-menu>
  </div>
</template>
<script lang="ts" setup>
import { isExternal } from "@/utils/validate";
import AppLink from "./Link.vue";
import path from "path-browserify";
import { computed } from "vue";

import { ref } from "vue";
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },

  basePath: {
    type: String,
    default: "",
  },
  isCollapse: {
    type: Boolean,
    default: false,
  },
});

const alwaysShowRootMenu = computed(() => {
  return props.item.meta && props.item.meta.alwaysShow;
});

let onlyOneChild = ref(null);
const hasOneShowingChild = (children = [], parent) => {
  const showingChildren = children.filter((item: any) => {
    if (item.meta && item.meta.hidden) {
      return false;
    } else {
      onlyOneChild.value = item;
      return true;
    }
  });

  if (showingChildren.length === 1) {
    return true;
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };

    return true;
  }

  return false;
};

const resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  return path.resolve(props.basePath, routePath);
};
</script>
