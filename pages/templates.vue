<template>
  <div class="max-w-6xl mx-auto px-4 py-16">
    <header class="text-center">
      <h1 class="text-4xl font-semibold">Templates</h1>
      <p class="mt-3 text-slate-600 dark:text-slate-300">Browse ready-to-use document blueprints designed for conversational completion.</p>
    </header>
    <div class="mt-12 grid gap-6 md:grid-cols-3">
      <article
        v-for="template in templates"
        :key="template.id"
        class="p-6 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-900/60 flex flex-col"
      >
        <p class="text-xs uppercase tracking-widest text-brand/70">{{ template.category }}</p>
        <h2 class="mt-3 text-xl font-semibold">{{ template.title }}</h2>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-400 flex-1">{{ template.description }}</p>
        <NuxtLink :to="`/chat?template=${template.id}`" class="mt-4 inline-flex px-4 py-2 rounded-full bg-brand text-white text-sm font-semibold">
          Start with this template
        </NuxtLink>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTemplates } from '~/composables/useTemplates';

const { templates, loadTemplates } = useTemplates();
await loadTemplates();
</script>
