import { createRouter, createWebHashHistory } from "vue-router";
// 站点配置：页面标题
import { setTitle } from "../config";
// 引入加载条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({
  showSpinner: false, // 不显示旋转圈
  trickleSpeed: 150,  // 加载速度
  easing: 'ease',     // 动画效果
  speed: 500,         // 动画持续时间
})
// 路由懒加载
const HomeView = ()=> import("../views/HomeView.vue") ;
const MeView = () => import("../views/MeView.vue");
const PostListView = () => import("../views/layout/PostListView.vue");
const LogView = () => import("../views/LogView.vue");
const LogListView = () => import("../views/layout/LogListView.vue");
const MeListView = () => import("../views/layout/MeListView.vue");
const NotFoundView = () => import("../views/NotFoundView.vue");
const PostView = () => import("../views/PostView.vue");
const PostContent = () => import("../views/layout/PostContent.vue");
const ClassView = ()=> import("../views/ClassView.vue") ;
const ClassList = () => import("../views/layout/ClassListView.vue");
// 路由配置
// meta.title：浏览器标签上的名字（文章页/分类页的标题是数据里的，组件内自己设）
const routes = [
    {
        //首页
        path: '/',
        component: HomeView,
        meta: { title: '' },
        children: [
            {
                path: '',
                name: 'PostList',
                component: PostListView
            },
        ]
    },
    // 开发日志
    {
        path: '/log',
        name: 'Log',
        component: LogView,
        meta: { title: '开发历程' },
        children: [
            {
                path: '',
                name: ' LogList',
                component: LogListView
            },
        ]
    },
    //关于我
    {
        path: '/me',
        name: 'Me',
        component: MeView,
        meta: { title: '关于我' },
        children: [
            {
                path: '',
                name: ' MeList',
                component: MeListView
            },
        ]
    },
    //文章
      {
        path: '/post/:id',
        name: 'Post',
        component: PostView,
        children: [
            {
                path: '',
                name: 'PostContent',
                component: PostContent
            },
        ]
    },
        //分类
      {
        path: '/class/:id',
        name: 'Class',
        component: ClassView,
        children: [
            {
                path: '',
                name: 'ClassList',
                component: ClassList
            },
        ]
    },
    //404!!!
    {
        path: '/:pathMatch(.*)*',
        component: NotFoundView,
        meta: { title: '页面走丢了' }
    }
]
const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
    // 切换页面时的滚动位置：新页面一律回到顶部，
    // 只有浏览器前进/后退才恢复原来的位置（方便从文章退回列表时接着看）
    scrollBehavior(_to, _from, savedPosition) {
        if (savedPosition) return savedPosition
        return { top: 0 }
    }
})
// 路由守卫 网页加载条
// 开始加载
router.beforeEach((_, __, next) => {
  NProgress.start()
  next()
})

// 加载完成
router.afterEach((to) => {
  NProgress.done()
  // 标签页标题：静态页直接取 meta，文章页/分类页由组件在拿到数据后再覆盖一次
  setTitle((to.meta.title as string) || undefined)
})
export default router