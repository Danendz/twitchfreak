import TwitchJs, {BaseMessage, Messages} from "twitch-js";
import {useTwitchApi} from "@/composables/useTwitchApi";
import useTwitchJSStore from "@/store/useTwitchJSStore.ts";
import axios from "axios";

export const isBaseMessage = (messageObj: Messages): messageObj is BaseMessage => {
    return (messageObj as BaseMessage).message !== undefined
}

export const connectToChannel = async (channel: string): Promise<TwitchJs> => {
    const twitchJs = useTwitchApi()
    await twitchJs.chat.connect()
    await twitchJs.chat.join(channel)
    return twitchJs
}

export const getTwitchAuthLink = () => {
    const twitchJSStore = useTwitchJSStore()
    const link = 'https://id.twitch.tv/oauth2/authorize'
    return axios.getUri({
        url: link, params: {
            response_type: 'token',
            client_id: twitchJSStore.clientId,
            redirect_uri: twitchJSStore.redirect_uri,
            scope: twitchJSStore.scope
        }
    })
}

const isTwitchTokenExpired = () => {
    const expiresAt = localStorage.getItem('twitch_token_expires_at')
    if (!expiresAt) {
        return true
    }

    return new Date() > new Date(expiresAt)
}

export const isUserLoggedInTwitch = (token: string) => {
    return !!token && !isTwitchTokenExpired()
}

export const isWidgetRoute = (name: string): boolean => {
    return name.includes('widget')
}

export const setToken = (token: string) => {
    const twitchJsStore = useTwitchJSStore()
    localStorage.setItem('twitch_token', token)
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 30)
    localStorage.setItem('twitch_token_expires_at', expiresAt.toJSON().slice(0, 10))

    twitchJsStore.token = token
    twitchJsStore.tokenExpiresAt = expiresAt.toJSON().slice(0, 10)
    twitchJsStore.updateBroadcastInfo()
}