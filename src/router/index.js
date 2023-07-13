import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/Layout/index.vue";
import NProgress from "nprogress"; // 导入 nprogress模块
import "nprogress/nprogress.css";

// 默认路由
const constantRoutes = [
  {
    name: "to404",
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error/404.vue"),
    meta: { title: "404" },
  },
];

// 系统相关路由
const routes = [
  {
    path: "",
    component: Layout,
    name: "layout",
    meta: { menuName: "平台功能" },
    redirect: "index",
    // 页面主体部分组件
    children: [
      {
        path: "index",
        rule: "index",
        // 是否显示在侧边栏菜单列表中
        component: () => import("@/views/Index.vue"),
        meta: {
          title: "首页",
          menu: false,
        },
      },
      {
        path: "ontology",
        rule: "ontology",
        component: () => import("@/views/system/Ontology.vue"),
        meta: {
          menu: true,
          title: "本体构建",
        },
      },
      {
        path: "instance",
        name: "instance",
        component: () => import("@/views/system/Instance.vue"),
        meta: {
          menu: true,
          title: "实例构建",
        },
      },
      {
        path: "ontology-result",
        name: "ontology-result",

        component: () => import("@/views/system/Ontology-result.vue"),
        meta: {
          title: "本体构建结果",
          menu: false,
          visByUrl: false,
        },
      },
      {
        path: "entity-result",
        name: "entity-result",
        component: () => import("@/views/system/Entity-result.vue"),
        meta: {
          title: "实例构建结果",
          menu: false,
          visByUrl: false,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes.concat(constantRoutes),
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 };
  },
});
// 路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  // 不能通过url访问的路径重定向至首页
  if (to.meta.visByUrl === false) next("/index");
  if (to.meta.title) document.title = to.meta.title;
  next();
});

router.afterEach(() => {
  NProgress.done();
});
export default router;
export { routes };
