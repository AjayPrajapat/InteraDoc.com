import { ref } from 'vue';
import type { TemplateDefinition } from '~/utils/template';

export function useTemplates() {
  const templates = ref<TemplateDefinition[]>([]);
  const pending = ref(false);
  const error = ref<Error | null>(null);

  const loadTemplates = async () => {
    try {
      pending.value = true;
      error.value = null;
      const { data, error: fetchError } = await useFetch<TemplateDefinition[]>('/api/templates');
      if (fetchError.value) {
        throw fetchError.value;
      }
      templates.value = data.value ?? [];
    } catch (err) {
      error.value = err as Error;
    } finally {
      pending.value = false;
    }
  };

  return { templates, pending, error, loadTemplates };
}
