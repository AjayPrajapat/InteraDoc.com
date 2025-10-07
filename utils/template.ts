export type TemplateQuestion = {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'list' | 'date';
};

export type TemplateDefinition = {
  id: string;
  title: string;
  description: string;
  category: string;
  questions: TemplateQuestion[];
  html: string;
};

const eachPattern = /{{#each\s+(\w+)}}([\s\S]*?){{\/each}}/g;

function renderEachBlocks(html: string, data: Record<string, unknown>): string {
  return html.replace(eachPattern, (_, key: string, inner: string) => {
    const value = data[key];
    if (!Array.isArray(value)) {
      return '';
    }
    return value
      .map((entry) =>
        inner.replace(/{{\s*this\s*}}/g, typeof entry === 'string' ? entry : JSON.stringify(entry))
      )
      .join('');
  });
}

function renderPlaceholders(html: string, data: Record<string, unknown>): string {
  return html.replace(/{{\s*(\w+)\s*}}/g, (_, key: string) => {
    const value = data[key];
    if (value === undefined || value === null) {
      return '';
    }
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return String(value);
  });
}

export function fillTemplateHtml(html: string, data: Record<string, unknown>): string {
  const withLoops = renderEachBlocks(html, data);
  return renderPlaceholders(withLoops, data);
}

export function flattenAnswers(answers: Record<string, unknown>): Record<string, unknown> {
  const flattened: Record<string, unknown> = {};
  Object.entries(answers).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      flattened[key] = value.filter((entry) => entry !== '').map((entry) => entry);
    } else {
      flattened[key] = value;
    }
  });
  return flattened;
}
