<script setup lang="ts">
import {getTwitchAuthLink, isUserLoggedInTwitch, setToken} from "@/utils";
import TwitchUserMiniProfile from "@/components/Twitch/TwitchUserMiniProfile.vue";
import useTwitchJSStore from "@/store/useTwitchJSStore.ts";
import {useGlobalStore} from "@/store/useGlobalStore.ts";

const navLinks = [
  {
    title: 'Главная',
    name: 'home'
  },
  {
    title: 'Виджет подписчиков',
    name: 'subscribers-widget'
  },
  {
    title: 'Бот',
    name: 'home'
  },
]

const twitchAuthCondition = computed(() => {
  return isUserLoggedInTwitch(useTwitchJSStore().token ?? '')
})

const token = computed(() => {
  return useTwitchJSStore().token
})

const authLinks = computed(() => [
  {
    title: 'Войти в TWITCH',
    value: getTwitchAuthLink(),
    authCondition: twitchAuthCondition.value,
    component: TwitchUserMiniProfile
  }
])

const navbarState = ref(false)
const globalState = useGlobalStore()

const isNavbarVisible = computed(() => {
  if (globalState.isPageWidget) {
    return navbarState.value
  }

  return true
})

const onMouseEnter = () => {
  navbarState.value = true
}

const onMouseLeave = () => {
  navbarState.value = false
}

const copy = () => {
  window.navigator.clipboard.writeText(String(token.value))
}

const authByUserToken = () => {
  setToken(userToken.value)
}

const userToken = ref('')
</script>

<template>
  <nav
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      class="bg-violet-500 text-white duration-200 w-full flex justify-between"
      :class="[!isNavbarVisible && 'opacity-0', globalState.isPageWidget && 'absolute']">
    <div class="flex px-6">
      <div class="flex items-center justify-center gap-3">
        <input type="password" v-model="userToken" placeholder="Введите токен" class="border rounded border-violet-500 outline-1 outline-violet-700 py-1 px-2 text-black"/>
        <button @click="authByUserToken" class="hover:bg-violet-800 duration-150 p-1 px-2 rounded">Авторизоваться</button>
      </div>
    </div>
    <div class="flex justify-end items-center gap-10 py-3 px-8">
      <ul class="flex gap-5">
        <RouterLink
            class="hover:bg-violet-800 duration-150 p-1 px-2 rounded"
            v-for="link of navLinks"
            :key="link.name"
            :to="{name: link.name}">
          {{ link.title }}
        </RouterLink>
        <li v-if="twitchAuthCondition" @click="copy"
            class="hover:bg-violet-800 duration-150 p-1 px-2 rounded cursor-pointer">
          Скопировать токен
        </li>
      </ul>
      <ul class="flex gap-4">
        <li v-for="link of authLinks" :key="link.value">
          <template v-if="link.authCondition">
            <TwitchUserMiniProfile/>
          </template>
          <template v-else>
            <a :href="link.value" class="hover:bg-violet-800 duration-150 p-1 px-2 rounded">
              {{ link.title }}
            </a>
          </template>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>

</style>