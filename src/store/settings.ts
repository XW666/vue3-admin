import {
  defineStore
} from 'pinia'
import layoutSettings from "@/config/settings"

export const useSettingsStore = defineStore('settings', {
  // state 类似组件的data选项，函数形式返回对象
  state: () => {
    return {
      showSettings: layoutSettings.showSettings,
      tagsView: layoutSettings.showTagsView,
      fixedHeader: layoutSettings.fixedHeader,
      sidebarLogo: layoutSettings.showSidebarLogo,

    }
  },
  getters: {},
  actions: {

  }
})