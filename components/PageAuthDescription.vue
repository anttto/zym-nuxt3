<template>
  <p class="text-subtitle1 q-mb-xl">{{ description }}</p>
</template>

<script setup lang="ts">
interface Props {
  description?: string;
}

defineProps<Props>();
</script>

<style scoped></style>
