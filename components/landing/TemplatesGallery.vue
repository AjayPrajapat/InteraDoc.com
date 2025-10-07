<template>
  <section class="max-w-6xl mx-auto px-4 py-16">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h2 class="text-3xl md:text-4xl font-semibold">Template gallery</h2>
        <p class="mt-3 text-slate-600 dark:text-slate-300 max-w-xl">
          Every template is powered by a conversation map so you only answer what matters. Start from popular options or build your own.
        </p>
      </div>
      <NuxtLink to="/templates" class="px-6 py-3 bg-brand text-white rounded-full font-semibold">Browse all templates</NuxtLink>
    </div>
    <div class="mt-10 grid gap-6 md:grid-cols-3">
      <article v-for="template in previewTemplates" :key="template.id" class="p-6 border border-slate-200/70 dark:border-slate-800/80 rounded-2xl bg-white/70 dark:bg-slate-900/60">
        <p class="text-xs uppercase tracking-widest text-brand/80">{{ template.category }}</p>
        <h3 class="mt-3 text-xl font-semibold">{{ template.title }}</h3>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">{{ template.description }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { TemplateDefinition } from '~/utils/template';

const props = defineProps<{ templates: TemplateDefinition[] }>();

const previewTemplates = computed(() => props.templates.slice(0, 3));
</script>
