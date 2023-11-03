import TwitchJs from "twitch-js";
import {defineStore} from "pinia";
import axios from '@/plugins/axios/twitch'
import {IBroadcaster} from "@/entities/Broadcaster/IBroadcaster";
import {AxiosResponse} from "axios";

interface ITwitchJSStore {
    token: string | null,
    username: string,
    broadcaster_info: null | IBroadcaster
    refreshToken: string,
    code: string,
    clientId: string | null,
    clientSecret: string,
    twitchIns: null | TwitchJs
}

const link = 'https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=ffkyh8o8usfrcjkmc3nxg80a6jrpkw&redirect_uri=http://localhost&scope=chat:edit chat:read channel:read:subscriptions&state=c3ab8aa609ea11e793ae92361f002671'
const token = 'x3yhazi0jriytun5g2i38dqif7vlel'
const clientId = 'ffkyh8o8usfrcjkmc3nxg80a6jrpkw'

const store = defineStore('twitchJsStore', {
    state: (): ITwitchJSStore => ({
        token: localStorage.getItem('twitch_token'),
        username: 'datezz',
        broadcaster_info: null,
        refreshToken: '',
        code: 'vrttyls73q9faqq5p5mocb3mdbhcgp',
        clientId: localStorage.getItem('twitch_client_id'),
        clientSecret: 'sytzo5skz9ntbufl4k8d4at3j3b41h',
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