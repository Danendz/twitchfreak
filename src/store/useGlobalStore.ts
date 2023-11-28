import {defineStore} from "pinia";

interface UseGlobalStore {
    isPageWidget: boolean,
}

export const useGlobalStore = defineStore('GlobalStore', {
    state(): UseGlobalStore {
        return {
            isPageWidget: false
        }
    },
})
