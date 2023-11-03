<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import useTwitchJSStore from "@/store/useTwitchJSStore.ts";
import {onMounted} from "vue";
import useTwitchStore from "@/store/useTwitchStore.ts";

const route = useRoute()
const twitchJsStore = useTwitchJSStore()
const twitchStore = useTwitchStore()
const router = useRouter()

onMounted(async () => {
  const parsedHash = new URLSearchParams(route.hash.substring(1))
  const token = parsedHash.get('access_token')
  localStorage.setItem('twitch_token', token)
  twitchJsStore.token = token

  twitchStore.validateToken().then((res) => {
    console.log(res)
  })

  console.log(parsedHash.get('access_token'))
  await router.push({name: 'home'})
})

</script>

<template>

</template>

<style scoped>

</style>