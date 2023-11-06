import {createRouter, createWebHistory} from "vue-router";
import Home from "@/pages/home/Home.vue";
import TwitchAuth from "@/pages/TwitchAuth/TwitchAuth.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/twitch_auth',
        name: 'twitch_auth',
        component: TwitchAuth
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router