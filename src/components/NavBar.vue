<script setup lang="ts">
import {getTwitchAuthLink} from "@/utils";

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

const authLinks = [
  {
    title: 'Войти в TWITCH',
    value: getTwitchAuthLink()
  }
]
</script>

<template>
  <nav class="bg-violet-500 text-white">
    <div class="flex justify-end items-center gap-10 py-3 px-8">
      <ul class="flex gap-5">
        <RouterLink class="hover:bg-violet-800 duration-150 p-1 rounded" v-for="link of navLinks" :key="link.name"
                    :to="{name: link.name}" is="li">
          {{ link.title }}
        </RouterLink>
      </ul>
      <ul class="flex gap-4">
        <li class="hover:bg-violet-800 duration-150 p-1 rounded" v-for="link of authLinks" :key="link.value">
          <a :href="link.value">
            {{ link.title }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>

</style>