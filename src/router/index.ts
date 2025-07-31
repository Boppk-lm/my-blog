import { createRouter, createWebHistory } from "vue-router";
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
// 路由配置
const routes = [
    {
        //首页
        path: '/',
        component: HomeView,
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
    //404!!!
    {
        path: '/:pathMatch(.*)*',
        component: NotFoundView
    }
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})
// 路由守卫
// 开始加载
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

// 加载完成
router.afterEach(() => {
  NProgress.done()
})
export default router