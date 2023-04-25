<template>
  <div class="login-container">

    <div class="login-card">
      <div class="title">
        admin后台管理
      </div>
      <div class="content">
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginFormRules"
        >
          <el-form-item prop="username">
            <el-input
              v-model.trim="loginForm.username"
              placeholder="用户名"
              type="text"
              tabindex="1"
              :prefix-icon="User"
              size="large"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="loginForm.password"
              placeholder="密码"
              type="password"
              tabindex="2"
              :prefix-icon="Lock"
              size="large"
              show-password
            />
          </el-form-item>
          <!-- <el-form-item prop="code">
            <el-input
              v-model.trim="loginForm.code"
              placeholder="验证码"
              type="text"
              tabindex="3"
              :prefix-icon="Key"
              maxlength="7"
              size="large"
            >
              <template #append>
                <el-image
                  :src="codeUrl"
                  @click="createCode"
                  draggable="false"
                >
                  <template #placeholder>
                    <el-icon>
                      <Picture />
                    </el-icon>
                  </template>
                  <template #error>
                    <el-icon>
                      <Loading />
                    </el-icon>
                  </template>
                </el-image>
              </template>
            </el-input>
          </el-form-item> -->
          <el-button
            :loading="loading"
            type="primary"
            size="large"
            @click.prevent="handleLogin"
          > 登 录 </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useUserStore } from "@/store/user";
import { type ILoginRequestData } from "@/api/types/login";
import { useRouter } from "vue-router";

const router = useRouter();
/** 登录表单数据 */
const loginForm: ILoginRequestData = reactive({
  username: "admin",
  password: "12345678",
});
/** 登录按钮 Loading */
const loading = ref(false);
/** 登录表单校验规则 */
const loginFormRules: FormRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" },
  ],
};
const loginFormRef = ref<FormInstance>();

const handleLogin = () => {
  loginFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      loading.value = true;
      useUserStore()
        .login({
          username: loginForm.username,
          password: loginForm.password,
        })
        .then(() => {
          router.push({ path: "/" });
        })
        .catch(() => {});
    } else {
      return false;
    }
  });
};
</script>
<style lang="scss" scoped>
.login-container {
  width: 100%;
  min-height: 100%;
  position: relative;

  .login-card {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    width: 500px;
    max-width: 100%;
    padding: 0px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;
    background-color: #fff;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 150px;
      img {
        height: 100%;
      }
    }
    .content {
      padding: 20px 50px 50px 50px;
      :deep(.el-input-group__append) {
        padding: 0;
        overflow: hidden;
        .el-image {
          width: 100px;
          height: 40px;
          border-left: 0px;
          user-select: none;
          cursor: pointer;
          text-align: center;
        }
      }
      .el-button {
        width: 100%;
        margin-top: 10px;
      }
    }
  }
}
</style>