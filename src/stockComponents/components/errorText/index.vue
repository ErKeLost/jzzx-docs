<template>
  <div mb-6 flex content-start class="verifyClass">
    <div mt--1 mr-2 text-2xl class="i-ph-warning-circle-bold"></div>
    <div>
      {{ verify }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  verify: string
  color: string
}>()
</script>

<style scoped>
.verifyClass {
  color: v-bind(color);
}
</style>
