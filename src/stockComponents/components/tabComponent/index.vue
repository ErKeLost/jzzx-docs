<template>
  <component :is="components[state ? state.name - 1 : 0]"></component>
</template>

<script setup lang="ts">
import { useCompanyUserManagementStore } from '@/store'
const { state } = storeToRefs(useCompanyUserManagementStore())
const props = defineProps<{
  components: any[]
}>()
</script>

<style scoped></style>
