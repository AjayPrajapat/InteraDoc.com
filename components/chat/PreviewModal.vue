<template>
  <Transition name="fade">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 px-4">
      <div class="bg-white dark:bg-slate-950 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        <header class="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 class="text-lg font-semibold">Document preview</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">Review your generated content before exporting.</p>
          </div>
          <button class="text-sm text-slate-500 hover:text-slate-700" @click="emit('close')">Close</button>
        </header>
        <div class="flex-1 overflow-y-auto px-6 py-4 bg-slate-50 dark:bg-slate-900" v-html="html"></div>
        <footer class="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <div class="space-x-2">
            <button class="px-4 py-2 rounded-full border border-brand text-brand" @click="exportDocument('docx')">Export DOCX</button>
            <button class="px-4 py-2 rounded-full bg-brand text-white" @click="exportDocument('pdf')">Export PDF</button>
          </div>
          <p class="text-xs text-slate-500">Exports are generated on demand and downloaded automatically.</p>
        </footer>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps<{ open: boolean; html: string; templateId: string | null; answers: Record<string, unknown> }>();
const emit = defineEmits<{ (e: 'close'): void }>();

const exportDocument = async (format: 'pdf' | 'docx') => {
  if (!props.templateId) return;
  await $fetch(`/api/generate`, {
    method: 'POST',
    body: {
      format,
      templateId: props.templateId,
      html: props.html,
      answers: props.answers
    },
    responseType: 'blob'
  }).then((blob) => {
    const url = URL.createObjectURL(blob as Blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${props.templateId}.${format}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  });
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
