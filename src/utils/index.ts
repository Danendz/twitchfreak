import TwitchJs, {BaseMessage, Messages} from "twitch-js";
import {useTwitchApi} from "@/composables/useTwitchApi";

export const isBaseMessage = (messageObj: Messages): messageObj is BaseMessage => {
    return (messageObj as BaseMessage).message !== undefined
}

export const connectToChannel = async (channel: string): Promise<TwitchJs> => {
    const twitchJs = useTwitchApi()
    await twitchJs.chat.connect()
    await twitchJs.chat.join(channel)
    return twitchJs
}
