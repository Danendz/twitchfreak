import axios from "axios";

const instance = axios.create({
    baseURL: 'https://api.twitch.tv/helix',
})

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('twitch_token')
    const clientId = localStorage.getItem('twitch_client_id')

    if (token && clientId) {
        config.headers = config.headers || {}
        config.headers.Authorization = `Bearer ${token}`
        config.headers['Client-Id'] = clientId
    }

    return config
})

export default instance