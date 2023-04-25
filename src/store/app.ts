import {
  defineStore
} from 'pinia';
import Cookies from 'js-cookie'
// 传入2个参数，定义仓库并导出
// 第一个参数唯一不可重复，字符串类型，作为仓库ID以区分仓库
// 第二个参数，以对象形式配置仓库的state,getters,actions
// 配置 state getters actions


export const useAppStore = defineStore('app', {
  // state 类似组件的data选项，函数形式返回对象
  state: () => {
    return {
      sidebar: {
        opened: Cookies.get('sidebarStatus') !== "closed",
        withoutAnimation: false,
        device: 'desktop'
      }
    }
  },
  getters: {},
  actions: {
    toggleSidebar(withoutAnimation: boolean) {
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = withoutAnimation
      if (this.sidebar.opened) {
        Cookies.set('sidebarStatus', "opened")
      } else {

        Cookies.set('sidebarStatus', "closed")
      }
    },
    closeSidebar(v: boolean) {
      this.sidebar.opened = false
      this.sidebar.withoutAnimation = v
      Cookies.set('sidebarStatus', "closed")
    },
    toggleDevice(v: string) {
      this.sidebar.device = v
    }
  }
})