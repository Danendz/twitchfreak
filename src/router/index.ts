import {createRouter, createWebHistory} from "vue-router";
import Home from "@/pages/home/Home.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/twitch_auth',
        name: 'twitch_auth',
        component: () => import('@/pages/TwitchAuth/TwitchAuth.vue')
    },
    {
        path: '/subscribers-widget',
        name: 'subscribers-widget',
        component: () => import('@/pages/Widgets/SubscribersWidget/SubscribersWidget.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router