import {createRouter, createWebHistory} from "vue-router";
import Home from "@/pages/home/Home.vue";
import {isWidgetRoute} from "@/utils";
import {useGlobalStore} from "@/store/useGlobalStore.ts";

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

router.beforeEach((to) => {
    const globalStore = useGlobalStore()
    if (to.name) {
        globalStore.isPageWidget = isWidgetRoute(to.name.toString());
    }
})
export default router