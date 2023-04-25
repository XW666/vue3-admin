import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//显示中文
import lang from 'element-plus/lib/locale/lang/zh-cn'


export default (app: any) => {
  app.use(ElementPlus, { locale: lang })

} 