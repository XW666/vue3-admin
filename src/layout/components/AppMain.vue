<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <transition
        name="fade-transform"
        mode="out-in"
      >
        <keep-alive>
          <component
            :is="Component"
            :key="key"
          />
        </keep-alive>
      </transition>
    </router-view>
    <!-- <transition
      name="fade-transform"
      mode="out-in"
    >
      <keep-alive>
        <router-view :key="key" />
      </keep-alive>
    </transition> -->
  </section>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const key = computed(() => {
  return route.path;
});
</script>