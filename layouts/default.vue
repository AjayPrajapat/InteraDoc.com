<template>
  <div :class="['min-h-screen flex flex-col bg-gradient-radial']">
    <SiteHeader />
    <main class="flex-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import SiteHeader from '~/components/navigation/SiteHeader.vue';
import SiteFooter from '~/components/navigation/SiteFooter.vue';
</script>
