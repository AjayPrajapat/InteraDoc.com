# InteraDoc

InteraDoc is a Nuxt 3 + Tailwind CSS application that pairs conversational AI with smart templates to generate polished documents such as resumes, agreements, and invoices. Users can chat with an assistant, track their progress, preview results, and export PDFs or DOCX files.

## Features

- ✨ Landing page with hero, feature highlights, pricing, and template gallery
- 💬 Interactive chat experience powered by OpenAI with progress tracking and preview modal
- 🧠 JSON-driven template system stored in `/assets/templates`
- 🛠️ Server APIs for conversations, template retrieval, document generation, and contact forms
- 🎨 Futuristic Tailwind CSS design with light/dark modes via `@nuxtjs/color-mode`
- 📄 PDF generation using `pdf-lib` and DOCX export powered by `docx`

## Getting started

```bash
pnpm install
pnpm dev
```

Set the `OPENAI_API_KEY` environment variable to enable AI conversations:

```bash
export OPENAI_API_KEY="sk-..."
```

## Project structure

```
.
├── app.vue
├── assets
│   ├── css/tailwind.css
│   └── templates/*.json
├── components
│   ├── chat
│   ├── landing
│   ├── navigation
│   └── ui
├── layouts/default.vue
├── pages
│   ├── about.vue
│   ├── chat.vue
│   ├── contact.vue
│   ├── index.vue
│   ├── pricing.vue
│   └── templates.vue
├── server/api
│   ├── contact.post.ts
│   ├── conversation.post.ts
│   ├── generate.post.ts
│   └── templates.get.ts
├── stores/conversation.ts
├── utils/template.ts
└── nuxt.config.ts
```

## PDF & DOCX exports

The `/api/generate` endpoint converts rendered HTML output into:

- **PDF** – using `pdf-lib` to render plain text paragraphs.
- **DOCX** – using the `docx` package to create paragraphs per sentence.

These implementations provide a lightweight base that can be expanded with richer formatting or server-side rendering tools like Puppeteer when needed.
