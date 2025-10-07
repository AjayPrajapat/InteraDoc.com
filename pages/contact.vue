<template>
  <section class="max-w-4xl mx-auto px-4 py-16">
    <header class="text-center space-y-3">
      <h1 class="text-4xl font-semibold">Contact us</h1>
      <p class="text-slate-600 dark:text-slate-300">
        Share how you want to integrate InteraDoc into your workflows. We respond within one business day.
      </p>
    </header>
    <form class="mt-12 space-y-6 max-w-2xl mx-auto" @submit.prevent="submit">
      <div>
        <label class="block text-sm font-medium mb-2" for="name">Name</label>
        <input id="name" v-model="form.name" type="text" required class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-4 py-3" />
      </div>
      <div>
        <label class="block text-sm font-medium mb-2" for="email">Email</label>
        <input id="email" v-model="form.email" type="email" required class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-4 py-3" />
      </div>
      <div>
        <label class="block text-sm font-medium mb-2" for="message">How can we help?</label>
        <textarea id="message" v-model="form.message" rows="5" required class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-4 py-3"></textarea>
      </div>
      <button type="submit" class="px-6 py-3 rounded-full bg-brand text-white font-semibold" :disabled="pending">
        {{ pending ? 'Sending…' : 'Send message' }}
      </button>
      <p v-if="status" class="text-sm text-brand">{{ status }}</p>
    </form>
  </section>
</template>

<script setup lang="ts">
const form = reactive({ name: '', email: '', message: '' });
const pending = ref(false);
const status = ref('');

const submit = async () => {
  try {
    pending.value = true;
    status.value = '';
    await $fetch('/api/contact', { method: 'POST', body: form });
    status.value = 'Thanks! We will be in touch soon.';
    Object.assign(form, { name: '', email: '', message: '' });
  } catch (error) {
    status.value = 'Something went wrong. Please try again later.';
  } finally {
    pending.value = false;
  }
};
</script>
