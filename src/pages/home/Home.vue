<script setup lang="ts">
import {onMounted, ref} from "vue";
import TwitchJs from "twitch-js";
import useTwitchJSStore from "@/store/useTwitchJSStore.ts";
import {connectToChannel} from "@/utils";

const channel = ref<null | TwitchJs>(null)
const twitchJSStore = useTwitchJSStore()

onMounted(async () => {
  channel.value = await connectToChannel(twitchJSStore.username)
  channel.value.chat.on('PRIVMSG', (message) => {
    console.log(message)
  })
})
</script>

<template>
home
</template>

<style scoped>

</style>