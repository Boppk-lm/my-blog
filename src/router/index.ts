import { createRouter,createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PostListView from "../views/PostListView.vue";
const routes = [
    {
        path:'/',
        name:'home',
        component:HomeView
    },
      {
        path:'/Post',
        name:'posts',
        component:PostListView
    },
    // {
    //     path:'*',
    //     name:'notfound',
    //     component:NotFoundView
    // }
]
const router = createRouter({
    history:createWebHistory(import.meta.env.BASE_URL),
    routes
})
export default router