<script setup lang="ts">
import {IconGift, IconSettings, IconUserStar} from "@tabler/icons-vue";
import useTwitchStore from "@/store/useTwitchStore.ts";
import useTwitchJSStore from "@/store/useTwitchJSStore.ts";
import {ISubscriber} from "@/entities/Subscriber/ISubscriber.ts";
import FadeTransition from "@/components/UI/Transitions/FadeTransition.vue";

const twitchStore = useTwitchStore()
const twitchJsStore = useTwitchJSStore()
const subscribers = ref<ISubscriber[]>([])
const currentSubscriberIndex = ref<number>(0)

const broadcasterInfo = computed(() => {
  return twitchJsStore.getBroadcasterInfo
})

const fetchSubscribers = () => {
  if (broadcasterInfo.value) {
    twitchStore.fetchSubscriptions({broadcaster_id: broadcasterInfo.value.id}).then((res) => {
      subscribers.value = res.data.data
      console.log(subscribers.value)
    })
  }
}

watch(() => broadcasterInfo.value, () => {
  if (broadcasterInfo.value) {
    fetchSubscribers()
  }
}, {immediate: true})

let interval = 0

const vars = ref({
  height: '150',
  rounded: '2xl',
  opacity: '0.95',
  iconSize: 90,
  textSize: '70',
  intervalSpeed: 5000
})

watch(() => subscribers.value, () => {
  if (subscribers.value.length) {
    currentSubscriberIndex.value = 0
    clearInterval(interval)
    interval = setInterval(() => {
      if (currentSubscriberIndex.value + 1 < subscribers.value.length) {
        currentSubscriberIndex.value++
      } else {
        currentSubscriberIndex.value = 0
      }
    }, vars.value.intervalSpeed)
  }
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
      <template v-if="subscribers.length">
        <FadeTransition>
          <div :key="currentSubscriberIndex">
            <IconGift
                v-if="subscribers[currentSubscriberIndex].is_gift"
                :size="vars.iconSize"
                class="text-violet-400"/>
            <IconUserStar v-else :size="vars.iconSize" class="text-violet-400"/>
          </div>
        </FadeTransition>
        <div class="mx-auto" :style="{fontSize: `${vars.textSize}px`}">
          <FadeTransition>
            <span :key="currentSubscriberIndex">
            {{ subscribers[currentSubscriberIndex].user_name }}
            </span>
          </FadeTransition>
        </div>
      </template>
      <div v-show="showSettings" class="absolute right-2 top-2">
        <button class="hover:bg-violet-500 p-2 rounded duration-150">
          <IconSettings/>
        </button>
      </div>
    </div>
<!--    <div>-->
<!--      <TextField v-model="vars.opacity" label="Прозрачность"/>-->
<!--    </div>-->
  </div>
</template>

<style scoped>

</style>