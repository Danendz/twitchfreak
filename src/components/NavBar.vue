<script setup lang="ts">
import {getTwitchAuthLink, isUserLoggedInTwitch} from "@/utils";
import TwitchUserMiniProfile from "@/components/Twitch/TwitchUserMiniProfile.vue";
import useTwitchJSStore from "@/store/useTwitchJSStore.ts";

const navLinks = [
  {
    title: 'Главная',
    name: 'home'
  },
  {
    title: 'Виджет подписчиков',
    name: 'home'
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
</script>

<template>
  <nav class="bg-violet-500 text-white">
    <div class="flex justify-end items-center gap-10 py-3 px-8">
      <ul class="flex gap-5">
        <RouterLink class="hover:bg-violet-800 duration-150 p-1 rounded" v-for="link of navLinks" :key="link.name"
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