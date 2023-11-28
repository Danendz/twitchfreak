import axios, {AxiosRequestHeaders} from "axios";

const instance = axios.create({
    baseURL: 'https://id.twitch.tv/helix',
})

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('twitch_token')

    if (token) {
        config.headers = config.headers || {} as AxiosRequestHeaders
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export default instance
