import router from "@/router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { getToken } from "@/utils/auth"

NProgress.configure({ showSpinner: false })

const whiteList = ['/login'] // no redirect whitelist
router.beforeEach((to, from, next) => {

  if (getToken()) {
    if (to.path === "/login") {
      // 如果已经登录，并准备进入 Login 页面，则重定向到主页
      next({ path: "/" })
      NProgress.done()
    } else {
      next()
    }
  } else {

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login`)
      NProgress.done()
    }
  }

})

router.afterEach(() => {
  NProgress.done()
})