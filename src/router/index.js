import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/Layout/index.vue";
import NProgress from "nprogress"; // 导入 nprogress模块
import "nprogress/nprogress.css";

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
        name: "index",
        // 是否显示在侧边栏菜单列表中
        menu: false,
        component: () => import("@/views/Index.vue"),
        meta: { title: "首页" },
      },
      {
        path: "ontology",
        name: "ontology",
        menu: true,
        component: () => import("@/views/system/Ontology.vue"),
        meta: {
          title: "本体构建",
        },
      },
      {
        path: "instance",
        name: "instance",
        menu: true,
        component: () => import("@/views/system/Instance.vue"),
        meta: {
          title: "实例构建",
        },
      },
      {
        path: "result",
        name: "result",
        menu: false,
        component: () => import("@/views/system/Result.vue"),
        meta: {
          title: "构建结果",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 };
  },
});
// 路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.meta.title) document.title = to.meta.title;
  next();
});

router.afterEach(() => {
  NProgress.done();
});
export default router;
export { routes };
