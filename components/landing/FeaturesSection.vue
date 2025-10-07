<template>
  <section class="max-w-6xl mx-auto px-4 py-16">
    <h2 class="text-3xl md:text-4xl font-semibold text-center">Designed for modern document workflows</h2>
    <p class="mt-4 text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
      InteraDoc combines guided conversations, smart templates, and instant exports so you can deliver final documents without the busywork.
    </p>
    <div class="mt-12 grid gap-8 md:grid-cols-3">
      <article v-for="feature in features" :key="feature.title" class="p-6 rounded-2xl border border-slate-200/70 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/50 backdrop-blur">
        <div class="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center text-xl font-semibold">
          {{ feature.icon }}
        </div>
        <h3 class="mt-6 text-xl font-semibold">{{ feature.title }}</h3>
        <p class="mt-3 text-sm text-slate-600 dark:text-slate-400">{{ feature.description }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  {
    title: 'AI-led conversations',
    description: 'Ask natural questions and follow-ups so clients provide the right context for each document.',
    icon: '🤖'
  },
  {
    title: 'Template intelligence',
    description: 'Templates adapt to your answers and automatically fill placeholders in polished layouts.',
    icon: '📄'
  },
  {
    title: 'One-click exports',
    description: 'Preview in-browser and export to PDF or DOCX in seconds—ready to share or sign.',
    icon: '⚡'
  }
];
</script>
