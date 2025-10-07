<template>
  <form class="flex items-end gap-3" @submit.prevent="emit('submit', value)">
    <textarea
      v-model="value"
      rows="1"
      placeholder="Type your response..."
      class="flex-1 resize-none rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
      @keydown.enter.exact.prevent="emit('submit', value)"
    ></textarea>
    <button
      type="submit"
      class="px-5 py-2 rounded-full bg-brand text-white font-semibold disabled:opacity-50"
      :disabled="disabled || value.trim().length === 0"
    >
      Send
    </button>
  </form>
</template>

<script setup lang="ts">
const props = defineProps<{ disabled?: boolean; modelValue?: string }>();
const emit = defineEmits<{ (e: 'submit', value: string): void; (e: 'update:modelValue', value: string): void }>();

const value = computed({
  get: () => props.modelValue ?? '',
  set: (val: string) => emit('update:modelValue', val)
});
</script>
