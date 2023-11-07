<script setup lang="ts">
import {IconGift, IconSettings} from "@tabler/icons-vue";
import useTwitchStore from "@/store/useTwitchStore.ts";
import useTwitchJSStore from "@/store/useTwitchJSStore.ts";
import TextField from "@/components/UI/Inputs/TextField.vue";

const twitchStore = useTwitchStore()
const twitchJsStore = useTwitchJSStore()

const broadcasterInfo = computed(() => {
  return twitchJsStore.getBroadcasterInfo
})

const fetchSubscribers = () => {
  twitchStore.fetchSubscriptions({broadcaster_id: broadcasterInfo.value.id}).then((res) => {
    console.log(res)
  })
}

watch(() => broadcasterInfo.value, () => {
  if (broadcasterInfo.value) {
    fetchSubscribers()
  }
}, {immediate: true})

const vars = ref({
  height: '150',
  rounded: '2xl',
  opacity: '0.95',
  iconSize: 90,
  textSize: '6xl'
})

const showSettings = ref(false)

const onWidgetEnter = () => {
  showSettings.value = true
}

const onWidgetLeft = () => {
  showSettings.value = false
}

</script>

<template>
  <div class="w-full h-screen overflow-hidden flex justify-center items-center flex-col">
    <div class="w-full flex p-8 items-center gap-3 text-white relative"
         :class="[`rounded/${vars.rounded}`]"
         :style="{height: `${vars.height}px`,
          backgroundColor: `rgba(0, 0, 0, ${vars.opacity})`}"
         @mouseenter="onWidgetEnter"
         @mouseleave="onWidgetLeft"
    >
      <div>
        <IconGift :size="vars.iconSize" class="text-violet-400"/>
      </div>
      <div class="mx-auto" :class="[`text-${vars.textSize}`]">
        datezz - 10 подписок
      </div>
      <div v-show="showSettings" class="absolute right-2 top-2">
        <button class="hover:bg-violet-500 p-2 rounded duration-150">
          <IconSettings/>
        </button>
      </div>
    </div>
    <div>
      <TextField v-model="vars.opacity" label="Прозрачность" />
    </div>
  </div>
</template>

<style scoped>

</style>