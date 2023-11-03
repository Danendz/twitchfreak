import TwitchJs from "twitch-js";
import {defineStore} from "pinia";
import {IBroadcaster} from "@/entities/Broadcaster/IBroadcaster";
import {AxiosResponse} from "axios";

interface ITwitchJSStore {
    token: string | null,
    tokenExpiresAt: string | null,
    username: string,
    broadcaster_info: null | IBroadcaster
    redirect_uri: string,
    scope: string,
    clientId: string | null,
    twitchIns: null | TwitchJs
}

const token = 'x3yhazi0jriytun5g2i38dqif7vlel'
const clientId = 'ffkyh8o8usfrcjkmc3nxg80a6jrpkw'

const store = defineStore('twitchJsStore', {
    state: (): ITwitchJSStore => ({
        token: localStorage.getItem('twitch_token'),
        tokenExpiresAt: localStorage.getItem('twitch_token_expires_at'),
        username: 'datezz',
        redirect_uri: 'http://localhost:5174/twitch_auth',
        scope: 'chat:edit chat:read channel:read:subscriptions',
        broadcaster_info: null,
        clientId: localStorage.getItem('twitch_client_id'),
        twitchIns: null
    }),
    getters: {
        getTwitchIns: (state): TwitchJs => {
            if (!state.clientId || !state.token) {
                throw new Error('Нет подходящего токена или клиент айди для твитча. Пожалуйста перезайдите в аккаунт')
            }
            if (!state.twitchIns) {
                state.twitchIns = new TwitchJs({
                    token: state.token,
                    clientId: state.clientId,
                    username: state.username,
                })
            }
            return state.twitchIns as TwitchJs
        },
        getBroadcasterInfo: (state): IBroadcaster => {
            if (state.broadcaster_info) {
                return state.broadcaster_info
            }
            throw new Error('No broadcaster info')
        }
    },
    actions: {
        setCurrentBroadcasterInfo(res: AxiosResponse) {
            const data: IBroadcaster = res.data.data[0]
            if (data) {
                this.broadcaster_info = data
            }
        }
    }
})

export default store