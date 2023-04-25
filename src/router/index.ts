import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const Layout = () => import("../layout/index.vue")

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/redirect",
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import(/* webpackChunkName: "redirect" */ "../views/redirect/index.vue")
      }
    ]
  },
  {
    path: "/login",
    component: () => import(/* webpackChunkName: "login" */ "../views/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import(/* webpackChunkName: "dashboard" */ "../views/dashboard/index.vue"),
        name: "Dashboard",
        meta: {
          title: "首页",
          icon: "HomeFilled",
          affix: true
        }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    children: [
      {
        path: 'user',
        name: 'profile',
        component: () => import(/* webpackChunkName: "dashboard" */ "../views/profile/index.vue"),
        meta: { title: '个人中心', icon: 'profile', noCache: true, hidden: true }
      }
    ]
  },
  {
    path: "/table",
    component: Layout,
    redirect: "/table/table1",
    name: 'table',
    meta: {
      title: '列表',
      icon: "Grid",
    },
    children: [
      {
        path: 'table1',
        name: 'table1',
        component: () => import(/* webpackChunkName: "table1" */ '@/views/table/table1.vue'),
        meta: {
          title: '列表1',
          icon: "List",
        }
      },
      {
        path: 'table2',
        name: 'table2',
        component: () => import(/* webpackChunkName: "table2" */ '@/views/table/table2.vue'),
        meta: {
          title: '列表2',
          icon: "Edit",
        }
      }
    ]
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRoutes
})

export default router
