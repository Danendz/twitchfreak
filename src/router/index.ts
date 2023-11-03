import {createRouter, createWebHistory} from "vue-router";
import Home from "@/pages/home/Home.vue";
import useTwitchJSStore from "@/store/useTwitchJSStore.ts";
import useTwitchStore from "@/store/useTwitchStore.ts";

const routes = [
    {
        path: '/',
        component: Home
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (_, __, next) => {
    const twitchJsStore = useTwitchJSStore()
    const twitchStore = useTwitchStore()

    const token = localStorage.getItem('twitch_token')
    const clientId = localStorage.getItem('twitch_client_id')

    if (token && clientId) {
        if (!twitchJsStore.broadcaster_info) {
            const res = await twitchStore.fetchUsers({login: twitchJsStore.username})
            twitchJsStore.setCurrentBroadcasterInfo(res)
            next()
        }
    } else {
        next()
    }
})

export default router