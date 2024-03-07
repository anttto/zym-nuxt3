<template>
  <p class="q-mt-sm text-grey-8">{{ description }}</p>
</template>

<script setup lang="ts">
interface Props {
  description?: string;
}

defineProps<Props>();
</script>

<style scoped></style>
