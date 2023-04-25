<template>
  <div
    @click="toggleClick"
    style="padding: 0 15px;"
  >
    <el-icon
      :size="20"
      class="icon"
    >
      <Fold v-if="props.isActive" />
      <Expand v-else />
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["toggle-click"]);
const toggleClick = () => {
  emit("toggle-click");
};
</script>
<style lang="scss" scoped>
.icon {
  vertical-align: middle;
}
</style>
