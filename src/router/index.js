import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/ontology',
    component: Layout,
    redirect: '/ontology/list',
    name: '本体',
    meta: { title: '本体', icon: 'example' },
    children: [
      {
        path: 'table',
        name: '本体列表',
        component: () => import('@/views/neo4j/ontology/list'),
        meta: { title: '本体列表', icon: 'table' }
      }
    ]
  },
  {
    path: '/river',
    component: Layout,
    redirect: '/river/table',
    name: '河流节点',
    meta: { title: '河流节点', icon: 'example' },
    children: [
      {
        path: 'table',
        name: '河流节点列表',
        component: () => import('@/views/neo4j/river/list'),
        meta: { title: '河流节点列表', icon: 'table' }
      }
      // {
      //   path: 'relation',
      //   name: '河流节点关系',
      //   component: () => import('@/views/neo4j/river/relation'),
      //   meta: { title: '河流节点关系', icon: 'table' }
      // }
    ]
  },
  {
    path: '/kg',
    component: Layout,
    redirect: '/kg/index',
    name: 'kgroot',
    meta: { title: '图谱实例', icon: 'example' },
    children: [
      {
        path: 'index',
        name: 'KgMananement',
        component: () => import('@/views/neo4j/kg/Index'),
        meta: { title: '知识平台', icon: 'table' }
      },
      {
        path: 'KgOntoMananement',
        name: 'KgOntoMananement',
        component: () => import('@/views/neo4j/kg/components/KGOntoManagement'),
        meta: { title: '知识库管理', icon: 'table' },
        hidden: true
      },
      /*{
        path: 'KGAnalysisPoint',
        name: 'KGAnalysisPoint',
        component: () => import('@/views/neo4j/kg/components/KGAnalysisPoint'),
        meta: { title: '点查询', icon: 'table' },
        hidden: true
      },*/
      {
        path: 'KGHistoryCase',
        name: 'KGHistoryCase',
        component: () => import('@/views/pattern/common/index'),
        meta: { title: '历史场次', icon: 'table' },
        hidden: true
      },
      {
        path: 'KGPattern',
        name: 'KGPattern',
        component: () => import('@/views/pattern/slide/index'),
        meta: { title: '历史场次', icon: 'table' },
        hidden: true
      },
      /*{
        path: 'KGAnalysisRelationClass',
        name: 'KGAnalysisRelationClass',
        component: () => import('@/views/neo4j/kg/components/KGAnalysisRelationClass'),
        meta: { title: '关联对象查询', icon: 'table' },
        hidden: true
      },*/
      {
        path: 'KGRiverSectionTopo',
        name: 'KGRiverSectionTopo',
        component: () => import('@/views/workflow/choose'),
        meta: { title: '流域拓扑', icon: 'table' },
        hidden: true
      },
      {
        path: 'KGManagementList',
        name: 'KGManagementList',
        component: () => import('@/views/neo4j/kg/components/KGManagementList'),
        meta: { title: '实例对象查询', icon: 'table' },
        hidden: true
      },
      {
        path: 'KGInstance',
        name: 'KGInstance',
        component: () => import('@/views/neo4j/kg/components/KGInstance'),
        meta: { title: '实例详情查询', icon: 'table' },
        hidden: true
      },
      {
        path: 'FloodRegulation',
        name: 'FloodRegulation',
        component: () => import('@/views/neo4j/kg/components/KGFloodRegulation'),
        meta: { title: '调度方案查询', icon: 'table' },
        hidden: true
      },
      {
        path: 'ContingencyPlan',
        name: 'ContingencyPlan',
        component: () => import('@/views/neo4j/kg/components/KGContingencyPlan'),
        meta: { title: '应急预案查询', icon: 'table' },
        hidden: true
      },
      // {
      //   path: 'relation',
      //   name: '河流节点关系',
      //   component: () => import('@/views/neo4j/river/relation'),
      //   meta: { title: '河流节点关系', icon: 'table' }
      // }
    ]
  },
  {
    path: '/pattern',
    component: Layout,
    redirect: '/pattern/index',
    name: '模式库',
    meta: { title: '模式库', icon: 'example' },
    hidden: true,
    children: [
      {
        path: 'index',
        name: '历史模式场次',
        component: () => import('@/views/pattern/common/index.vue'),
        meta: { title: '模式匹配', icon: 'table' }
      }
    ]
  }, {
    path: '/slider',
    redirect: '/slider/table',
    component: Layout,
    name: '滑动窗口',
    meta: {title: '滑动窗口', icon: 'example'},
    hidden: true,
    children: [
      {
        path: 'table',
        name: '滑动窗口图表',
        component: () => import('@/views/pattern/slide/index.vue'),
        meta: {title: '滑动窗口图表', icon: 'table'}
      }
    ]
  },{
    path: '/workflow',
    component: Layout,
    redirect: '/workflow/choose',
    name: '工作流步骤',
    meta: { title: '工作流步骤', icon: 'example' },
    hidden: true,
    children: [
      {
        path: 'choose',
        name: '工作流步骤1',
        component: () => import('@/views/workflow/choose'),
        meta: { title: '选择出口断面和预报范围', icon: 'table' },
        hidden: true
      },
      {
        path: 'show',
        name: '工作流步骤2',
        component: () => import('@/views/workflow/show'),
        meta: { title: '对象关系拓扑展示', icon: 'table' },
        hidden: true
      },
      {
        path: 'finish',
        name: '工作流步骤3',
        component: () => import('@/views/workflow/finish'),
        meta: { title: '完成数据提取', icon: 'table' },
        hidden: true
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'documentation', icon: 'documentation', noCache: true }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'guide', icon: 'guide', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/svg-icons/index'),
        name: 'Icons',
        meta: { title: 'icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** When your routing table is too long, you can split it into small modules**/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'createArticle', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'editArticle', noCache: true },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'articleList', icon: 'list' }
      }
    ]
  },

  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'tab', icon: 'tab' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/errorPage/401'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/errorPage/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'log',
        component: () => import('@/views/errorLog/index'),
        name: 'ErrorLog',
        meta: { title: 'errorLog', icon: 'bug' }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/exportExcel'),
        name: 'ExportExcel',
        meta: { title: 'exportExcel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/selectExcel'),
        name: 'SelectExcel',
        meta: { title: 'selectExcel' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/uploadExcel'),
        name: 'UploadExcel',
        meta: { title: 'uploadExcel' }
      }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    meta: { title: 'zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'exportZip' }
      }
    ]
  },

  {
    path: '/theme',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'theme', icon: 'theme' }
      }
    ]
  },

  {
    path: '/clipboard',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'clipboardDemo', icon: 'clipboard' }
      }
    ]
  },

  {
    path: '/i18n',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/i18n-demo/index'),
        name: 'I18n',
        meta: { title: 'i18n', icon: 'international' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'externalLink', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
