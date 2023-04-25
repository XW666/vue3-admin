<template>
  <el-breadcrumb class="app-breadcrumb">
    <el-breadcrumb-item
      v-for="(item, index) in breadcrumbs"
      :key="item.path"
    >
      <span
        v-if="item.redirect === 'noRedirect' || index === breadcrumbs.length - 1"
        class="no-redirect"
      >
        {{ item.meta.title }}
      </span>
      <a
        v-else
        @click.prevent="handleLink(item)"
      >
        {{ item.meta.title }}
      </a>
    </el-breadcrumb-item>

  </el-breadcrumb>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import { type RouteLocationMatched, useRoute, useRouter } from "vue-router";
import { compile } from "path-to-regexp";

const route = useRoute();
const router = useRouter();

const breadcrumbs = ref<RouteLocationMatched[]>([]);

const getBreadcrumb = () => {
  let matched = route.matched.filter((item) => item.meta && item.meta.title);
  const first = matched[0];

  if (!isDashboard(first)) {
    matched = [{ path: "/dashboard", meta: { title: "首页" } }].concat(matched);
  }

  breadcrumbs.value = matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  );
  // breadcrumbs.value = route.matched.filter((item) => {
  //   return item.meta && item.meta.title && item.meta.breadcrumb !== false;
  // });
};
const isDashboard = (route) => {
  const name = route && route.name;
  if (!name) {
    return false;
  }
  return name.trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase();
};
const handleLink = (item: RouteLocationMatched) => {
  const { redirect, path } = item;
  if (redirect) {
    router.push(redirect as string);
    return;
  }

  router.push(pathCompile(path));
};
const pathCompile = (path: string) => {
  const { params } = route;
  const toPath = compile(path);
  return toPath(params);
};

watch(
  () => route.path,
  (path) => {
    getBreadcrumb();
  }
);
getBreadcrumb();
</script>
<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>