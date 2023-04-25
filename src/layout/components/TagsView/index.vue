<template>
  <div class="tags-view-container">
    <ScrollPane class="tags-view-wrapper">
      <router-link
        ref="tagRefs"
        v-for="tag in tagsViewStore.visitedViews"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query }"
        class="tags-view-item"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ tag.meta?.title }}
        <el-icon
          v-if="!isAffix(tag)"
          :size="12"
          @click.prevent.stop="closeSelectedTag(tag)"
        >
          <Close />
        </el-icon>
      </router-link>
    </ScrollPane>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li
        v-if="!isAffix(selectedTag)"
        @click="closeSelectedTag(selectedTag)"
      >关闭</li>
      <li @click="closeOthersTags">关闭其它</li>
      <li @click="closeAllTags(selectedTag)">关闭所有</li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { Close } from "@element-plus/icons-vue";
import ScrollPane from "./ScrollPane.vue";
import {
  type RouteRecordRaw,
  type RouteLocationNormalized,
  RouterLink,
  useRoute,
  useRouter,
} from "vue-router";
import { useTagsViewStore } from "@/store/tagsView";
import { getCurrentInstance, onMounted, ref, watch } from "vue";

type ITagView = Partial<RouteLocationNormalized>;
const router = useRouter();
const route = useRoute();
const visible = ref(false);
const top = ref(0);
const left = ref(0);
const selectedTag = ref<ITagView>({});
const instance = getCurrentInstance();
const tagsViewStore = useTagsViewStore();
const isActive = (tag: ITagView) => {
  return tag.path === route.path;
};
const isAffix = (tag: ITagView) => {
  return tag && tag.meta?.affix;
};
// 关闭tag菜单
const closeSelectedTag = (view: ITagView) => {
  tagsViewStore.delVisitedView(view);
  if (isActive(view)) {
    toLastView(tagsViewStore.visitedViews, view);
  }
};

const toLastView = (visitedViews: ITagView[], view: ITagView) => {
  const latestView = visitedViews.slice(-1)[0];
  if (latestView) {
    router.push(latestView.fullPath);
  } else {
    // 如果 TagsView 全部被关闭了，则默认重定向到主页
    if (view.name === "Dashboard") {
      // 重新加载主页
      router.replace({ path: "/redirect" + view.path, query: view.query });
    } else {
      router.push("/");
    }
  }
};
const openMenu = (tag: ITagView, e: MouseEvent) => {
  const menuMinWidth = 105;
  // container margin left
  const offsetLeft = instance!.proxy!.$el.getBoundingClientRect().left;
  // container width
  const offsetWidth = instance!.proxy!.$el.offsetWidth;
  // left boundary
  const maxLeft = offsetWidth - menuMinWidth;
  // 15: margin right
  const left15 = e.clientX - offsetLeft + 15;
  if (left15 > maxLeft) {
    left.value = maxLeft;
  } else {
    left.value = left15;
  }
  top.value = e.clientY;
  visible.value = true;
  selectedTag.value = tag;
};
// 关闭其他
const closeOthersTags = () => {
 
    router.push(selectedTag.value);
  
  tagsViewStore.delOthersVisitedViews(selectedTag.value);
};
//关闭所有
const closeAllTags = (view: ITagView) => {
  tagsViewStore.delAllVisitedViews();

  
  toLastView(tagsViewStore.visitedViews, view);
};
// 初始化tag菜单栏
const addTags = () => {
  if (route.name) {
    tagsViewStore.addVisitedView(route);
  }
};

// 监听路由变化
watch(
  route,
  () => {
    addTags();
  },
  {
    deep: true,
  }
);
onMounted(() => {
  addTags();
});
</script>
<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>