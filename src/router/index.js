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
    meta: { menuName: "流域水循环关系平台" },
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
        component: () => import("@/views/system/OntologyView.vue"),
        meta: {
          menu: true,
          title: "实体库",
        },
      },
      {
        path: "instance",
        name: "instance",
        component: () => import("@/views/system/InstanceView.vue"),
        meta: {
          menu: false,
          title: "关系库",
        },
      },
      {
        path: "attribute",
        name: "attribue",
        component: () => import("@/views/system/Attribute.vue"),
        meta: {
          menu: true,
          title: "属性库",
        },
      },
      {
        path: "ontology-result",
        name: "ontology-result",
        component: () => import("@/views/system/Ontology-result.vue"),
        meta: {
          title: "实体类型构建结果",
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
      {
        path: "OntoView",
        name: "OntoView",
        component: () => import("@/views/system/OntologyView.vue"),
        meta: {
          title: "实体类型查看",
          menu: false,
          visByUrl: false,
        },
      },
      {
        path: "OntoAdd",
        name: "OntoAdd",
        component: () => import("@/views/system/OntologyAdd.vue"),
        meta: {
          title: "类型添加",
          menu: false,
          visByUrl: false,
        },
      },
      {
        path: "OntoWatch",
        name: "OntoWatch",
        component: () => import("@/views/system/OntologyWatch.vue"),
        meta: {
          title: "实体类型浏览",
          menu: false,
          visByUrl: false,
        },
      },  {
        path: "InstanceView",
        name: "InstanceView",
        component: () => import("@/views/system/InstanceView.vue"),
        meta: {
          title: "实例查看",
          menu: false,
          visByUrl: false,
        },
      },
      {
        path: "InstanceAdd",
        name: "InstanceAdd",
        component: () => import("@/views/system/InstanceAdd.vue"),
        meta: {
          title: "实例添加",
          menu: false,
          visByUrl: false,
        },
      },
      {
        path: "InstanceWatch",
        name: "InstanceWatch",
        component: () => import("@/views/system/InstanceWatch.vue"),
        meta: {
          title: "实例浏览",
          menu: false,
          visByUrl: false,
        },
      },

      {
        path: "OtherOnto",
        name: "OtherOnto",
        component: () => import("@/views/system/otherOnto.vue"),
        meta: {
          title: "实体类型查看",
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
  // if (to.meta.visByUrl === false) next("/index");
  if (to.meta.title) document.title = to.meta.title;
  next();
});

router.afterEach(() => {
  NProgress.done();
});
export default router;
export { routes };
