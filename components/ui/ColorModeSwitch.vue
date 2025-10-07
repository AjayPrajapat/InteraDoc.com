<template>
  <button
    class="p-2 rounded-full border border-slate-200/70 dark:border-slate-700/70 hover:border-brand transition"
    @click="toggleColorMode"
    type="button"
    aria-label="Toggle dark mode"
  >
    <IconSun v-if="colorMode.value !== 'dark'" class="h-5 w-5" />
    <IconMoon v-else class="h-5 w-5" />
  </button>
</template>

<script setup lang="ts">
import IconSun from '~/components/ui/icons/IconSun.vue';
import IconMoon from '~/components/ui/icons/IconMoon.vue';

const colorMode = useColorMode();

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};
</script>
