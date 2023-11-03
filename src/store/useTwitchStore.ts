import axios from '@/plugins/axios/twitch'
import {defineStore} from "pinia";

export default defineStore('twitchStore', {
    actions: {
        fetchSubscriptions: (params: { broadcaster_id: string }) => {
            return axios.get('/subscriptions', {params})
        },
        fetchUsers: (params: {login: string}) => {
            return axios.get('/users', {params})
        }
    }
})