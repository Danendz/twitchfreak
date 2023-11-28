<script setup lang="ts">
import {useVModels} from "@vueuse/core";

const props = defineProps<{
  modelValue: string,
  label: string,
  labelClass: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const {modelValue} = useVModels(props, emit)
</script>

<template>
  <div class="flex flex-col gap-0.5">
    <label :class="labelClass" class="text-gray-700 text-sm">{{label}}</label>
    <input type="text" v-model="modelValue" class="border rounded border-violet-500 outline-1 outline-violet-700 py-1 px-2 text-black"/>
  </div>
</template>

<style scoped>

</style>