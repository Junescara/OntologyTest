import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/Layout/index.vue";

const routes = [
  {
    path: "",
    component: Layout,
    rule: "layout",
    redirect: "index",
    // 页面主体部分组件
    children: [
      {
        path: "index",
        rule: "index",
        // 是否显示在侧边栏菜单列表中
        menu: false,
        component: () => import("@/views/Index.vue"),
        meta: { title: "首页" },
      },
      {
        path: "ontology",
        rule: "ontology",
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
  if (to.meta.title) document.title = to.meta.title;
  next();
});

export default router;
export const { children } = routes[0];
