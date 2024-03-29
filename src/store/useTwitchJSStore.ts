import TwitchJs from "twitch-js";
import {defineStore} from "pinia";
import {IBroadcaster} from "@/entities/Broadcaster/IBroadcaster";
import useTwitchStore from "@/store/useTwitchStore.ts";

interface ITwitchJSStore {
    token: string | null,
    tokenExpiresAt: string | null,
    username: string,
    _broadcaster_info: null | IBroadcaster
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
        username: '',
        redirect_uri: import.meta.env.VITE_TWITCH_AUTH_REDIRECT_URL,
        scope: 'chat:edit chat:read channel:read:subscriptions',
        _broadcaster_info: null,
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
            if (this.token && this.clientId && !this._broadcaster_info && !this.isBroadcastInfoLoaded) {
                store().updateBroadcastInfo()
            }

            return this._broadcaster_info
        },
    },
    actions: {
        logout() {
            localStorage.removeItem('twitch_token')
            localStorage.removeItem('twitch_token_expires_at')
            this._broadcaster_info = null
            this.token = null
            this.tokenExpiresAt = null
            console.log('LOGGING OUT FROM TWITCH ACCOUNT')
        },
        updateBroadcastInfo() {
            const twitchStore = useTwitchStore()
            this.isBroadcastInfoLoaded = false
            twitchStore.fetchUsers().then((res) => {
                const data: IBroadcaster = res.data.data[0]
                if (data) {
                    this._broadcaster_info = data
                    this.username = data.display_name
                }
            }).finally(() => this.isBroadcastInfoLoaded = true)
        }
    }
})

export default store