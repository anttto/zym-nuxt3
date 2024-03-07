<template>
  <div class="text-h2 q-mt-xl q-mb-md">{{ title }}</div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
}

defineProps<Props>();
</script>

<style scoped></style>
