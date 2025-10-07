<template>
  <section class="bg-slate-50/70 dark:bg-slate-900/60 py-16">
    <div class="max-w-6xl mx-auto px-4 text-center">
      <h2 class="text-3xl md:text-4xl font-semibold">Simple pricing for creators and teams</h2>
      <p class="mt-3 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
        Start for free, then scale with premium templates, voice credits, and collaboration.
      </p>
      <div class="mt-12 grid gap-8 md:grid-cols-3">
        <article v-for="plan in plans" :key="plan.name" class="p-8 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-white/80 dark:bg-slate-950/70">
          <p class="text-sm font-semibold text-brand uppercase tracking-widest">{{ plan.name }}</p>
          <p class="mt-3 text-4xl font-bold">{{ plan.price }}</p>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">{{ plan.tagline }}</p>
          <ul class="mt-6 space-y-2 text-left text-sm text-slate-600 dark:text-slate-300">
            <li v-for="perk in plan.perks" :key="perk">• {{ perk }}</li>
          </ul>
          <NuxtLink :to="plan.cta.href" class="mt-6 inline-flex px-5 py-2 rounded-full bg-brand text-white font-semibold">
            {{ plan.cta.label }}
          </NuxtLink>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const plans = [
  {
    name: 'Starter',
    price: '$0',
    tagline: 'Try the core chat experience with sample templates.',
    perks: ['3 AI conversations / month', '2 export credits', 'Email support'],
    cta: { label: 'Get started', href: '/pricing#starter' }
  },
  {
    name: 'Pro',
    price: '$19',
    tagline: 'Unlock advanced templates and unlimited exports.',
    perks: ['Unlimited AI chats', 'Unlimited PDF/DOCX exports', 'Voice input with Whisper'],
    cta: { label: 'Upgrade to Pro', href: '/pricing#pro' }
  },
  {
    name: 'Team',
    price: '$49',
    tagline: 'Collaborate with teammates and manage shared libraries.',
    perks: ['Team workspace', 'Template sharing', 'Priority support'],
    cta: { label: 'View team plans', href: '/pricing#team' }
  }
];
</script>
