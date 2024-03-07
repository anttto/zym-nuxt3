<template>
  <div class="text-h4">{{ title }}</div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
}

defineProps<Props>();
</script>

<style scoped></style>
