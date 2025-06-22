import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MeView from "../views/layout/MeView.vue";
import PostListView from "../views/layout/PostListView.vue";
import LogView from "../views/layout/LogView.vue";
const routes = [
    {
        path: '/',
        component: HomeView,
        children: [
               {
                path: '',
                name: 'PostList',
                component: PostListView
            },
            {
                path: '/me',
                name: 'Me',
                component: MeView
            },
              {
                path: '/log',
                name: 'Log',
                component: LogView
            },
        ]
    },

    // {
    //     path:'*',
    //     name:'notfound',
    //     component:NotFoundView
    // }
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})
export default router