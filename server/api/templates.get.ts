import { join } from 'node:path';
import { promises as fs } from 'node:fs';
import type { TemplateDefinition } from '~/utils/template';

export default defineEventHandler(async () => {
  const dir = join(process.cwd(), 'assets/templates');
  const files = await fs.readdir(dir);
  const templates: TemplateDefinition[] = [];

  for (const file of files) {
    if (!file.endsWith('.json')) continue;
    const content = await fs.readFile(join(dir, file), 'utf-8');
    templates.push(JSON.parse(content));
  }

  return templates;
});
