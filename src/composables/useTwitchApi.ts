import useTwitchJSStore from "@/store/useTwitchJSStore";
import TwitchJs from "twitch-js";

export const useTwitchApi = (): TwitchJs => {
    return useTwitchJSStore().getTwitchIns
}