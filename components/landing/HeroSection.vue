<template>
  <section class="relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-brand/5 blur-3xl"></div>
    <div class="relative max-w-6xl mx-auto px-4 py-20 text-center">
      <p class="uppercase tracking-[0.35em] text-xs text-brand/80">Conversational Document Builder</p>
      <h1 class="mt-6 text-4xl md:text-6xl font-semibold leading-tight">
        Talk. Answer. <span class="text-brand">Generate Your Docs.</span>
      </h1>
      <p class="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
        InteraDoc guides you through a natural chat or voice conversation to collect the right answers and instantly craft polished resumes, agreements, invoices, and more.
      </p>
      <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <NuxtLink to="/chat" class="px-6 py-3 bg-brand text-white rounded-full font-semibold shadow-lg shadow-brand/40">
          Start Chatting
        </NuxtLink>
        <NuxtLink to="/templates" class="px-6 py-3 border border-brand text-brand rounded-full font-semibold">
          Explore Templates
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
