import axios, {AxiosRequestHeaders} from "axios";
import useTwitchJSStore from "@/store/useTwitchJSStore.ts";

const instance = axios.create({
    baseURL: 'https://api.twitch.tv/helix',
})

instance.interceptors.request.use((config) => {
    const store = useTwitchJSStore()
    const token = store.token
    const clientId = store.clientId

    if (token && clientId) {
        config.headers = config.headers || {} as AxiosRequestHeaders
        config.headers.Authorization = `Bearer ${token}`
        config.headers['Client-Id'] = clientId
    }

    return config
})

export default instance