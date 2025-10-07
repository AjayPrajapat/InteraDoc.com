<template>
  <div :class="wrapperClasses">
    <div :class="bubbleClasses">
      <slot />
    </div>
    <p class="mt-1 text-[10px] text-slate-500 dark:text-slate-400" v-if="timestamp">{{ timestamp }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ role: 'assistant' | 'user'; timestamp?: string }>();

const wrapperClasses = computed(() => [
  'flex flex-col max-w-[80%] md:max-w-[60%]',
  props.role === 'assistant' ? 'items-start' : 'items-end self-end'
]);

const bubbleClasses = computed(() => [
  'px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed',
  props.role === 'assistant'
    ? 'bg-white/80 dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-800/70 text-slate-800 dark:text-slate-100'
    : 'bg-brand text-white'
]);
</script>
