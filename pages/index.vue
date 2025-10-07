<template>
  <div>
    <HeroSection />
    <FeaturesSection />
    <HowItWorksSection />
    <TemplatesGallery :templates="templates" />
    <PricingPreview />
    <ContactSection />
  </div>
</template>

<script setup lang="ts">
import HeroSection from '~/components/landing/HeroSection.vue';
import FeaturesSection from '~/components/landing/FeaturesSection.vue';
import HowItWorksSection from '~/components/landing/HowItWorksSection.vue';
import TemplatesGallery from '~/components/landing/TemplatesGallery.vue';
import PricingPreview from '~/components/landing/PricingPreview.vue';
import ContactSection from '~/components/landing/ContactSection.vue';
import { useTemplates } from '~/composables/useTemplates';

const { templates, loadTemplates } = useTemplates();

await loadTemplates();
</script>
