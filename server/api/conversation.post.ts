import OpenAI from 'openai';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody<{ messages: { role: 'system' | 'user' | 'assistant'; content: string }[] }>(event);

  if (!body?.messages) {
    throw createError({ statusCode: 400, statusMessage: 'Messages are required.' });
  }

  if (!config.openaiApiKey) {
    return {
      role: 'assistant',
      content: 'OpenAI API key is not configured. Please add OPENAI_API_KEY to continue the conversation.'
    };
  }

  const client = new OpenAI({ apiKey: config.openaiApiKey });
  const completion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: body.messages
  });

  return completion.choices[0]?.message ?? {
    role: 'assistant',
    content: 'I was unable to generate a response.'
  };
});
