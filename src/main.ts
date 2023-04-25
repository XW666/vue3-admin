import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style/index.scss'

import './permission'

// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

//引入element-plus组件
import installElementPlus from './plugins/element'
import loadElementPlusIcon from './plugins/element-icon'

// 导入构造函数
import { createPinia } from 'pinia'
// 实例化 Pinia
const pinia = createPinia()
// 创建Vue应用实例app
const app = createApp(App)

// 应用以插件形式挂载Pinia实例

installElementPlus(app)
loadElementPlusIcon(app)
// app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.mount('#app')
