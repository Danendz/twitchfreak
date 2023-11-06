import TwitchJs from "twitch-js";
import {defineStore} from "pinia";
import {IBroadcaster} from "@/entities/Broadcaster/IBroadcaster";
import useTwitchStore from "@/store/useTwitchStore.ts";

interface ITwitchJSStore {
    token: string | null,
    tokenExpiresAt: string | null,
    username: string,
    broadcaster_info: null | IBroadcaster
    isBroadcastInfoLoaded: boolean,
    redirect_uri: string,
    scope: string,
    clientId: string | null,
    twitchIns: null | TwitchJs
}

const store = defineStore('twitchJsStore', {
    state: (): ITwitchJSStore => ({
        token: localStorage.getItem('twitch_token'),
        tokenExpiresAt: localStorage.getItem('twitch_token_expires_at'),
        username: import.meta.env.VITE_TWITCH_USERNAME,
        redirect_uri: 'http://localhost:5174/twitch_auth',
        scope: 'chat:edit chat:read channel:read:subscriptions',
        broadcaster_info: null,
        isBroadcastInfoLoaded: false,
        clientId: import.meta.env.VITE_TWITCH_CLIENT_ID,
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
        getBroadcasterInfo(): IBroadcaster | null {
            const twitchStore = useTwitchStore()
            if (this.token && this.clientId && !this.broadcaster_info && !this.isBroadcastInfoLoaded) {
                twitchStore.fetchUsers({login: this.username}).then((res) => {
                    const data: IBroadcaster = res.data.data[0]
                    if (data) {
                        this.broadcaster_info = data
                    }
                }).finally(() => this.isBroadcastInfoLoaded = true)
            }

            return this.broadcaster_info
        },
    },
    actions: {
        logout() {
            localStorage.removeItem('twitch_token')
            localStorage.removeItem('twitch_token_expires_at')
            this.broadcaster_info = null
            this.token = null
            this.tokenExpiresAt = null
            console.log('LOGGING OUT FROM TWITCH ACCOUNT')
        }
    }
})

export default store