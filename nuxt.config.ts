import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/color-mode'],
  css: ['~/assets/css/tailwind.css'],
  app: {
    head: {
      title: 'InteraDoc – Conversational AI Document Builder',
      meta: [
        { name: 'description', content: 'Talk with an AI assistant to build documents effortlessly with InteraDoc.' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' }
      ]
    }
  },
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light'
  },
  runtimeConfig: {
    openaiApiKey: process.env.OPENAI_API_KEY,
    public: {
      appName: 'InteraDoc'
    }
  },
  nitro: {
    preset: process.env.NITRO_PRESET,
    routeRules: {
      '/api/**': { cors: true }
    }
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ['@types/node']
      }
    }
  }
});
