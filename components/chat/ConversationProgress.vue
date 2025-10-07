<template>
  <div class="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
    <div class="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
      <div class="h-full bg-brand transition-all" :style="{ width: progressPercentage }"></div>
    </div>
    <span>{{ progressLabel }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ current: number; total: number }>();

const progressPercentage = computed(() => {
  if (!props.total) return '0%';
  return `${Math.round((props.current / props.total) * 100)}%`;
});

const progressLabel = computed(() => {
  if (!props.total) return '0 questions answered';
  return `${props.current}/${props.total} questions answered`;
});
</script>
