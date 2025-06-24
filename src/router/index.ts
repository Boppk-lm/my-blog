import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MeView from "../views/MeView.vue";
import PostListView from "../views/layout/PostListView.vue";
import LogView from "../views/LogView.vue";
import LogListView from "../views/layout/LogListView.vue";
import MeListView from "../views/layout/MeListView.vue";
import NotFoundView from "../views/NotFoundView.vue";
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
export default router