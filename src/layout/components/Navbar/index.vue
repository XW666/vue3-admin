<template>
  <div class="navbar">
    <Hamburger
      :is-active="appStore.sidebar.opened"
      class="hamburger-container"
      @toggle-click="toggleSidebar"
    />
    <Breadcrumb class="breadcrumb" />
    <div class="right-menu">
      <HeaderSearch class="right-menu-item" />
      <Screenfull class="right-menu-item hover-effect" />
      <el-dropdown class="avatar-container right-menu-item hover-effect">

        <div class="avatar-wrapper">
          <el-avatar
            :icon="UserFilled"
            :size="40"
          />
          <span>{{ userStore.name }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/profile/user">
              <el-dropdown-item>个人中心</el-dropdown-item>
            </router-link>
            <router-link to="/">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>

            <el-dropdown-item
              divided
              @click="logout"
            >
              <span style="display: block">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>

      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Breadcrumb from "../Breadcrumb/index.vue";
import Hamburger from "../Hamburger/index.vue";
import Screenfull from "@/components/Screenfull/index.vue";
import HeaderSearch from "@/components/HeaderSearch/index.vue";
import { UserFilled } from "@element-plus/icons-vue";
import { useUserStore } from "@/store/user";
import { useAppStore } from "@/store/app";
import { useRouter } from "vue-router";

const router = useRouter();
const appStore = useAppStore();
const userStore = useUserStore();
const logout = () => {
  userStore.logout();
  router.push(`/login`);
};
const toggleSidebar = () => {
  appStore.toggleSidebar(false);
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>