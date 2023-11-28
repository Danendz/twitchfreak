<script setup lang="ts">
import useTwitchJSStore from "@/store/useTwitchJSStore.ts";
import {IconLogout} from "@tabler/icons-vue";

const twitchJsStore = useTwitchJSStore()

const broadcasterInfo = computed(() => {
  return twitchJsStore.getBroadcasterInfo
})


const onLogout = () => {
  twitchJsStore.logout()
}
</script>

<template>
  <template v-if="broadcasterInfo">
    <div class="flex items-center justify-center gap-3">
      <img :src="broadcasterInfo.profile_image_url" class="w-full" style="width: 30px" alt="profile-pic"/>
      {{ broadcasterInfo.display_name }}
      <div class="cursor-pointer hover:bg-violet-800 duration-150 rounded p-1">
        <IconLogout :size="20" @click="onLogout"/>
      </div>
    </div>
  </template>
  <template v-else-if="!twitchJsStore.isBroadcastInfoLoaded">
    loading...
  </template>
  <template v-else>
    Не удалось загрузится
  </template>
</template>

<style scoped>

</style>