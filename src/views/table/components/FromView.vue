<template>
  <div>
    <el-dialog
      v-model="Visible"
      title="Tips"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
      >
        <el-form-item
          label="账号"
          prop="username"
        >
          <el-input v-model="ruleForm.username" />
        </el-form-item>
        <el-form-item
          label="名称"
          prop="nickname"
        >
          <el-input v-model="ruleForm.nickname" />
        </el-form-item>

      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetForm('ruleFormRef')">取消</el-button>
          <el-button
            type="primary"
            @click="submitForm('ruleFormRef')"
          >保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" >
import { defineComponent } from "vue";
import type { FormInstance } from "element-plus";
export default defineComponent({
  name: "FromView",
  props: {
    ruleForm: {
      type: Object,
      default: null,
    },
    rules: {
      type: Object,
      default: null,
    },
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formSize: "default",
    };
  },
  computed: {
    Visible: {
      get() {
        return this.dialogVisible;
      },
      set(val: boolean) {
        this.$emit("update:dialogVisible", val);
      },
    },
  },
  emits: ["update:dialogVisible", "submitForm"],
  methods: {
    async submitForm(formEl: string) {
      if (!formEl) return;
      let formName: any = this.$refs[formEl];
      await formName.validate((valid: boolean) => {
        if (valid) {
          console.log("submit!", this.ruleForm);
          this.$emit("submitForm", this.ruleForm);
        } else {
          console.log("error submit!");
        }
      });
    },
    resetForm(formEl: string) {
      if (!formEl) return;
      let formName: any = this.$refs[formEl];
      formName.resetFields();
      this.$emit("update:dialogVisible", false);
    },
    handleClose(done: () => void) {
      this.$emit("update:dialogVisible", false);
    },
  },
});
</script>
