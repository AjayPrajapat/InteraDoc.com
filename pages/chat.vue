<template>
  <div class="max-w-5xl mx-auto px-4 py-12">
    <header class="space-y-3 text-center">
      <h1 class="text-4xl font-semibold">Interactive assistant</h1>
      <p class="text-slate-600 dark:text-slate-300">
        Answer the assistant’s prompts via text or enable voice to build your document collaboratively.
      </p>
    </header>
    <section class="mt-10 grid gap-8 lg:grid-cols-[2fr,1fr]">
      <div class="rounded-3xl border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-900/60 backdrop-blur p-6 flex flex-col h-[70vh]">
        <div class="flex items-center justify-between mb-4">
          <ConversationProgress :current="progress.current" :total="progress.total" />
          <button class="text-sm text-brand" @click="openPreview" :disabled="!canPreview">Preview Document</button>
        </div>
        <div ref="scrollContainer" class="flex-1 overflow-y-auto space-y-6 pr-2">
          <ChatBubble v-for="message in messages" :key="message.id" :role="message.role" :timestamp="formatDate(message.createdAt)">
            {{ message.content }}
          </ChatBubble>
          <div v-if="loading" class="text-sm text-slate-500">Assistant is typing…</div>
        </div>
        <ChatInput v-model="input" :disabled="loading" @submit="handleSubmit" class="mt-4" />
      </div>
      <aside class="space-y-6">
        <div class="p-6 rounded-3xl border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-900/60">
          <h2 class="text-lg font-semibold">Template</h2>
          <select v-model="selectedTemplateId" class="mt-3 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2">
            <option disabled value="">Select a template</option>
            <option v-for="template in templates" :key="template.id" :value="template.id">{{ template.title }}</option>
          </select>
          <p v-if="templateDescription" class="mt-3 text-sm text-slate-600 dark:text-slate-400">{{ templateDescription }}</p>
        </div>
        <div class="p-6 rounded-3xl border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-900/60">
          <h2 class="text-lg font-semibold">Voice (coming soon)</h2>
          <p class="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Use the microphone button to capture your voice answers with the Web Speech API or Whisper. Add TTS for playback using OpenAI or ElevenLabs.
          </p>
          <button class="mt-4 inline-flex px-4 py-2 rounded-full border border-brand text-brand" disabled>Enable voice</button>
        </div>
      </aside>
    </section>
    <PreviewModal :open="previewOpen" :html="previewHtml" :template-id="selectedTemplateId" :answers="answers" @close="previewOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import ChatBubble from '~/components/chat/ChatBubble.vue';
import ChatInput from '~/components/chat/ChatInput.vue';
import ConversationProgress from '~/components/chat/ConversationProgress.vue';
import PreviewModal from '~/components/chat/PreviewModal.vue';
import { useConversationStore } from '~/stores/conversation';
import { fillTemplateHtml, flattenAnswers } from '~/utils/template';
import { useTemplates } from '~/composables/useTemplates';

const route = useRoute();
const store = useConversationStore();
const { templates, loadTemplates } = useTemplates();
const input = ref('');
const previewOpen = ref(false);
const previewHtml = ref('');
const scrollContainer = ref<HTMLElement | null>(null);

await loadTemplates();

const selectedTemplateId = ref<string>('');

watch(
  () => templates.value,
  (templatesList) => {
    const templateQuery = route.query.template as string | undefined;
    const defaultId = templateQuery || templatesList[0]?.id;
    if (defaultId && !selectedTemplateId.value) {
      selectedTemplateId.value = defaultId;
    }
  },
  { immediate: true }
);

watch(
  () => selectedTemplateId.value,
  (id) => {
    if (!id) return;
    const template = templates.value.find((item) => item.id === id);
    if (!template) return;
    store.setTemplate(template.id, template.questions.length);
    const firstPrompt = template.questions[0]?.label ?? 'Tell me what you need and I will draft it for you.';
    store.pushMessage({ role: 'assistant', content: `Let's build a ${template.title}. ${firstPrompt}` });
  }
);

const messages = computed(() => store.messages);
const loading = computed(() => store.loading);
const progress = computed(() => store.questionProgress);
const answers = computed(() => store.answers);

const templateDescription = computed(() => {
  const template = templates.value.find((item) => item.id === selectedTemplateId.value);
  return template?.description ?? '';
});

const canPreview = computed(() => progress.value.current === progress.value.total && progress.value.total > 0);

watch(messages, async () => {
  await nextTick();
  if (scrollContainer.value) {
    scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
  }
});

const handleSubmit = async (value: string) => {
  if (!value.trim() || !selectedTemplateId.value) return;
  const template = templates.value.find((item) => item.id === selectedTemplateId.value);
  if (!template) return;

  store.pushMessage({ role: 'user', content: value.trim() });
  input.value = '';
  store.updateLoading(true);

  const nextQuestionIndex = progress.value.current;
  const currentQuestion = template.questions[nextQuestionIndex];
  if (currentQuestion) {
    const sanitizedValue =
      currentQuestion.type === 'list'
        ? value
            .split(',')
            .map((item) => item.trim())
            .filter((item) => item.length > 0)
        : value.trim();
    store.updateAnswer(currentQuestion.id, sanitizedValue);
    store.advanceProgress();
  }

  try {
    const response = await $fetch<{ role: 'assistant'; content: string }>('/api/conversation', {
      method: 'POST',
      body: { messages: store.messages.map(({ role, content }) => ({ role, content })) }
    });
    if (response?.content) {
      store.pushMessage({ role: 'assistant', content: response.content });
    }
  } catch (error) {
    console.error(error);
    store.pushMessage({ role: 'assistant', content: 'I ran into an issue generating a response. Please try again.' });
  } finally {
    store.updateLoading(false);
  }
};

const openPreview = () => {
  if (!selectedTemplateId.value) return;
  const template = templates.value.find((item) => item.id === selectedTemplateId.value);
  if (!template) return;
  const html = fillTemplateHtml(template.html, flattenAnswers(answers.value));
  previewHtml.value = html;
  previewOpen.value = true;
};

const formatDate = (iso: string) => new Date(iso).toLocaleTimeString();
</script>
