<template>
  <header class="border-b border-slate-200/60 dark:border-slate-800/80 backdrop-blur bg-white/70 dark:bg-slate-950/70 sticky top-0 z-30">
    <nav class="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
      <NuxtLink to="/" class="text-xl font-semibold text-brand">InteraDoc</NuxtLink>
      <div class="hidden md:flex items-center space-x-8 text-sm font-medium">
        <NuxtLink to="/templates" class="hover:text-brand">Templates</NuxtLink>
        <NuxtLink to="/pricing" class="hover:text-brand">Pricing</NuxtLink>
        <NuxtLink to="/about" class="hover:text-brand">About</NuxtLink>
        <NuxtLink to="/contact" class="hover:text-brand">Contact</NuxtLink>
      </div>
      <div class="flex items-center space-x-3">
        <NuxtLink to="/chat" class="hidden sm:inline-flex px-4 py-2 rounded-full bg-brand text-white font-semibold shadow-lg shadow-brand/30">Start Chat</NuxtLink>
        <ColorModeSwitch />
        <button class="md:hidden" @click="isOpen = !isOpen" aria-label="Toggle navigation menu">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
          </svg>
        </button>
      </div>
    </nav>
    <Transition name="fade">
      <div v-if="isOpen" class="md:hidden border-t border-slate-200/60 dark:border-slate-800/60 bg-white/95 dark:bg-slate-950/95">
        <div class="px-4 py-3 flex flex-col space-y-3 text-sm">
          <NuxtLink @click="isOpen = false" to="/templates">Templates</NuxtLink>
          <NuxtLink @click="isOpen = false" to="/pricing">Pricing</NuxtLink>
          <NuxtLink @click="isOpen = false" to="/about">About</NuxtLink>
          <NuxtLink @click="isOpen = false" to="/contact">Contact</NuxtLink>
          <NuxtLink @click="isOpen = false" to="/chat" class="px-4 py-2 rounded-full bg-brand text-white font-semibold text-center">Start Chat</NuxtLink>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import ColorModeSwitch from '~/components/ui/ColorModeSwitch.vue';

const isOpen = ref(false);
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
