import {
  defineStore
} from 'pinia';
import { constantRoutes } from "@/router";

/**
 * 通过meta.perms判断是否与当前用户权限匹配
 * @param perms
 * @param route
 */
const hasPermission = (perms, route) => {
  if (route.meta && route.meta.perms) {
    return perms.some(perm => route.meta.perms.includes(perm))
  } else {
    return true
  }
}



export const usePermissionStore = defineStore('permission', {
  // state 类似组件的data选项，函数形式返回对象
  state: () => {
    return {
      routes: constantRoutes,
      addRoutes: [],
      perms: []
    }
  },
  getters: {},
  actions: {
    GenerateRoutes() {

    }
  }
})