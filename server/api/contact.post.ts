export default defineEventHandler(async (event) => {
  const body = await readBody<{ name: string; email: string; message: string }>(event);

  if (!body?.email || !body?.message) {
    throw createError({ statusCode: 400, statusMessage: 'Email and message are required.' });
  }

  // In production, integrate with transactional email providers like Resend or SendGrid.
  console.info('Contact form submission', body);

  return { success: true };
});
