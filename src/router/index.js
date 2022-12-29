import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";

import AuthRoutes from "./auth.routes";
import UIRoutes from "./ui.routes";
import LandingRoutes from "./landing.routes";
import UtilityRoutes from "./utility.routes";
import PagesRoutes from "./pages.routes";

export const constantRoutes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/landPage.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "error",
    meta: {
      layout: "simple",
    },
    component: () =>
      import(
        /* webpackChunkName: "error" */ "@/views/pages/error/NotFoundPage.vue"
      ),
  },
  ...LandingRoutes,
  ...AuthRoutes,
  ...PagesRoutes,
  ...UtilityRoutes,
  ...UIRoutes,
];

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [];

const router = createRouter({
  history: createWebHistory(),
  // hash模式：createWebHashHistory，history模式：createWebHistory
  // process.env.NODE_ENV === "production"
  //   ? createWebHistory()
  //   : createWebHashHistory(),
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;