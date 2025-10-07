<template>
  <footer class="border-t border-slate-200/60 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/70">
    <div class="max-w-6xl mx-auto px-4 py-10 grid gap-6 md:grid-cols-3 text-sm">
      <div>
        <h3 class="font-semibold text-brand">InteraDoc</h3>
        <p class="mt-2 text-slate-600 dark:text-slate-400">
          Talk, answer, and generate professional documents within minutes.
        </p>
      </div>
      <div class="flex flex-col space-y-2">
        <NuxtLink to="/templates">Templates</NuxtLink>
        <NuxtLink to="/pricing">Pricing</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
        <NuxtLink to="/contact">Contact</NuxtLink>
      </div>
      <div class="space-y-2">
        <p class="font-semibold">Stay in the loop</p>
        <form class="flex space-x-2">
          <input type="email" placeholder="Email" class="flex-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2" />
          <button type="submit" class="px-4 py-2 bg-brand text-white rounded-lg">Join</button>
        </form>
        <div class="flex space-x-4 text-lg">
          <a href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter">𝕏</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>
          <a href="mailto:hello@interadoc.ai" aria-label="Email">✉️</a>
        </div>
      </div>
    </div>
    <div class="text-center text-xs text-slate-500 dark:text-slate-500 pb-6">
      © {{ new Date().getFullYear() }} InteraDoc. All rights reserved.
    </div>
  </footer>
</template>
