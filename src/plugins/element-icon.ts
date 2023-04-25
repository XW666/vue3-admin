import * as ElementPlusIconsVue from "@element-plus/icons-vue"

export default (app: any) => {
  /** 注册所有 Element Plus Icon */
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
