<template>
  <section class="bg-slate-50/70 dark:bg-slate-900/50 py-16">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-semibold text-center">How it works</h2>
      <div class="mt-12 grid gap-8 md:grid-cols-3">
        <div v-for="(step, index) in steps" :key="step.title" class="p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800/70 bg-white/80 dark:bg-slate-950/60">
          <div class="w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center font-semibold">{{ index + 1 }}</div>
          <h3 class="mt-6 text-xl font-semibold">{{ step.title }}</h3>
          <p class="mt-3 text-sm text-slate-600 dark:text-slate-400">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  {
    title: 'Pick a template',
    description: 'Choose from resumes, agreements, invoices, and more—all ready with AI prompts.'
  },
  {
    title: 'Chat or speak your answers',
    description: 'The assistant asks targeted questions and keeps track of progress as you respond.'
  },
  {
    title: 'Preview and export',
    description: 'Review the live preview, fine-tune the details, and export as polished PDF or DOCX.'
  }
];
</script>
