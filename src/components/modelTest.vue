<template>
  <div>
    <el-input
      v-model="value"
      placeholder="Please input"
      @change='inputClick()'
    />
  </div>
</template>
<script lang="ts" >
import { defineComponent } from "vue";

export default defineComponent({
  name: "modelTest",
  props: {
    msgTitle: String,
  },
  computed: {
    value: {
      get() {
        return this.msgTitle;
      },
      set(val: any) {
        this.$emit("update:msgTitle", val);
      },
    },
  },
  emits: ["update:msgTitle"],
  methods: {
    inputClick(val: any) {
      console.log(val);
      // this.$emit("update:msgTitle", val);
    },
  },
});
</script>
