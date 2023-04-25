

<template>
  <component :is="currentRole === 'admin' ? AdminDashboard : EditorDashboard" />
</template>
<script lang="ts" setup>
import { ref } from "vue";

import AdminDashboard from "./admin/index.vue";
import EditorDashboard from "./editor/index.vue";

type CurrentRoleType = "admin" | "editor";

const currentRole = ref<CurrentRoleType>("admin");
</script>