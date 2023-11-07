<script setup lang="ts">
import {getTwitchAuthLink, isUserLoggedInTwitch} from "@/utils";
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
</script>

<template>
  <nav
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      class="bg-violet-500 text-white duration-200 w-full"
      :class="[!isNavbarVisible && 'opacity-0', globalState.isPageWidget && 'absolute']">
    <div class="flex justify-end items-center gap-10 py-3 px-8">
      <ul class="flex gap-5">
        <RouterLink
            class="hover:bg-violet-800 duration-150 p-1 rounded"
            v-for="link of navLinks"
            :key="link.name"
            :to="{name: link.name}">
          {{ link.title }}
        </RouterLink>
      </ul>
      <ul class="flex gap-4">
        <li v-for="link of authLinks" :key="link.value">
          <template v-if="link.authCondition">
            <TwitchUserMiniProfile/>
          </template>
          <template v-else>
            <a :href="link.value" class="hover:bg-violet-800 duration-150 p-1 rounded">
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