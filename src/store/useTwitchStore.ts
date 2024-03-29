import api from '@/plugins/axios/twitch/api.ts'
import id from "@/plugins/axios/twitch/id.ts";
import {defineStore} from "pinia";

export default defineStore('twitchStore', {
    actions: {
        fetchSubscriptions: (params: { broadcaster_id: string }) => {
            return api.get('/subscriptions', {params})
        },
        fetchUsers: () => {
            return api.get('/users')
        },
        validateToken: () => {
            return id.get('/validate')
        },
    }
})