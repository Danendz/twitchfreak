<script setup lang="ts">
// import useTwitchJSStore from "@/store/useTwitchJSStore.ts";
import {setToken} from "@/utils";

const countdown = ref(5)
const route = useRoute()
// const twitchJsStore = useTwitchJSStore()
// const twitchStore = useTwitchStore()
const router = useRouter()
const isSuccess = ref(false)

onMounted(async () => {
  const parsedHash = new URLSearchParams(route.hash.substring(1))
  const token = parsedHash.get('access_token')
  // const token = 'e0bemehpypegt4qj2uodbvlwxv8vyo'

  if (!token) {
    throw new Error('Ошибка при получении токена')
  }

  setToken(token)

  //TODO: Решить как нибудь CORS ошибку на этом запросе
  // twitchStore.validateToken().then((res) => {
  //   console.log(res)
  // })

  isSuccess.value = true
  const timeout = setInterval(() => {
    if (--countdown.value === 0) {
      clearInterval(timeout)
      router.push({name: 'home'})
    }
  }, 1000)
})

</script>

<template>
  <div class="w-full h-52 flex flex-col justify-center items-center">
    <template v-if="isSuccess">
      <p>Вы успешно вошли в аккаунт!</p>
      <p>Перенаправляем на главную страницу через: {{ countdown }} сек. </p>
      <button @click="router.push({name: 'home'})" class="bg-violet-500 text-white p-1.5 mt-3 rounded">Перейти сейчас
      </button>
    </template>
    <template v-else>
      <p>*Старательно заходим в ваш аккаунт*</p>
    </template>
  </div>
</template>

<style scoped>

</style>