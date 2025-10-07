<template>
  <section class="max-w-6xl mx-auto px-4 py-16">
    <header class="text-center max-w-3xl mx-auto">
      <h1 class="text-4xl font-semibold">Pricing</h1>
      <p class="mt-3 text-slate-600 dark:text-slate-300">
        Choose a plan that fits your document velocity. Upgrade anytime as your collaboration grows.
      </p>
    </header>
    <div class="mt-12 grid gap-8 md:grid-cols-3">
      <article
        v-for="plan in plans"
        :key="plan.id"
        :id="plan.id"
        class="p-8 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-900/60 flex flex-col"
      >
        <p class="text-sm font-semibold text-brand uppercase tracking-widest">{{ plan.name }}</p>
        <p class="mt-3 text-4xl font-bold">{{ plan.price }}</p>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">{{ plan.tagline }}</p>
        <ul class="mt-6 space-y-2 text-sm text-slate-700 dark:text-slate-200 flex-1">
          <li v-for="perk in plan.perks" :key="perk">• {{ perk }}</li>
        </ul>
        <button class="mt-6 inline-flex px-5 py-2 rounded-full bg-brand text-white font-semibold">Select plan</button>
      </article>
    </div>
    <section class="mt-16 grid gap-10 md:grid-cols-2">
      <div class="p-6 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-900/60">
        <h2 class="text-2xl font-semibold">FAQs</h2>
        <ul class="mt-4 space-y-4 text-sm text-slate-600 dark:text-slate-300">
          <li>
            <p class="font-semibold">Do unused credits roll over?</p>
            <p>Yes, export credits roll over for up to three months on paid plans.</p>
          </li>
          <li>
            <p class="font-semibold">Can we host on-premise?</p>
            <p>Enterprise plans can run InteraDoc on private infrastructure with dedicated support.</p>
          </li>
          <li>
            <p class="font-semibold">Do you integrate with e-sign tools?</p>
            <p>We integrate with Adobe Sign and DocuSign via Zapier and direct APIs.</p>
          </li>
        </ul>
      </div>
      <div class="p-6 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-900/60">
        <h2 class="text-2xl font-semibold">Need a custom plan?</h2>
        <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">
          Contact our sales team for volume discounts, white-label options, or compliance reviews tailored to your organization.
        </p>
        <NuxtLink to="/contact" class="mt-6 inline-flex px-5 py-2 rounded-full border border-brand text-brand font-semibold">Contact sales</NuxtLink>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$0',
    tagline: 'Launch with guided AI conversations and sample templates.',
    perks: ['3 conversations / month', '2 PDF exports', 'Email support']
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$19',
    tagline: 'Unlock the full template library and unlimited exports.',
    perks: ['Unlimited conversations', 'Unlimited exports', 'Template customizer', 'Voice input + TTS']
  },
  {
    id: 'team',
    name: 'Team',
    price: '$49',
    tagline: 'Collaborate with teammates and manage shared template libraries.',
    perks: ['Team workspaces', 'Shared template folders', 'SSO + role permissions', 'Priority support']
  }
];
</script>
