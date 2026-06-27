// Groq-only AI client for enhanced description generation.
async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchWithRetry(url, options = {}, maxRetries = 3) {
  let attempt = 0;
  while (attempt <= maxRetries) {
    const res = await fetch(url, options);
    if (res.status !== 429) return res;

    attempt += 1;
    const retryAfter = res.headers.get('Retry-After');
    const wait = retryAfter ? Number(retryAfter) * 1000 : Math.min(1000 * 2 ** attempt, 30000);
    await sleep(wait);
  }

  throw new Error('Max retries exceeded for 429 response');
}

async function callGroq(prompt) {
  const apiKey = process.env.REACT_APP_GROQ_API_KEY;
  if (!apiKey) throw new Error('Missing REACT_APP_GROQ_API_KEY');

  const model = process.env.REACT_APP_GROQ_MODEL || 'openai/gpt-oss-20b';
  const apiUrl = 'https://api.groq.com/openai/v1/responses';
  const payload = {
    model,
    input: prompt,
  };

  const res = await fetchWithRetry(
    apiUrl,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    },
    2,
  );

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const errorText = data?.error || data?.message || '';
    throw new Error(
      `Groq error: ${res.status} ${res.statusText} ${typeof errorText === 'string' ? errorText : JSON.stringify(errorText)}`.trim(),
    );
  }

  const data = await res.json();
  if (typeof data.output_text === 'string') return data.output_text;
  if (typeof data.output === 'string') return data.output;
  if (Array.isArray(data.output)) {
    for (const item of data.output) {
      if (item?.type === 'message') {
        const textContent = item.content?.find((entry) => entry?.type === 'output_text');
        if (typeof textContent?.text === 'string' && textContent.text.trim()) {
          return textContent.text;
        }
      }
    }
  }
  if (Array.isArray(data.output) && typeof data.output[0] === 'string') return data.output[0];
  if (Array.isArray(data.output) && data.output[0]?.type === 'message') {
    const message = data.output[0];
    const firstTextBlock = message.content?.find((entry) => entry?.type === 'output_text');
    if (typeof firstTextBlock?.text === 'string') return firstTextBlock.text;
  }
  if (typeof data.generated_text === 'string') return data.generated_text;

  throw new Error('Invalid response from Groq');
}

export async function generateEnhancedDescription(prompt) {
  try {
    return await callGroq(prompt);
  } catch (err) {
    console.error('Groq failed:', err?.message || err);
    return generateLocalFallback(prompt);
  }
}

function extractQuotedText(prompt) {
  const m = prompt.match(/"([^"]+)"\s*$/);
  if (m && m[1]) return m[1];
  const parts = prompt.split(':');
  return parts[parts.length - 1].trim();
}

function generateLocalFallback(prompt) {
  const original = extractQuotedText(prompt) || prompt;
  const words = original.split(/\s+/).filter(Boolean);
  const take = Math.min(Math.max(Math.floor(words.length * 0.9), 30), 70);
  let shortened = words.slice(0, take).join(' ');
  if (!/[.!?]$/.test(shortened)) shortened = shortened.replace(/\s+$/, '') + '.';

  const enhancements = [
    'Expertly crafted and delivered with attention to detail',
    'focused on durability and aesthetic appeal',
    'backed by decades of hands-on experience',
    'designed to enhance usability and property value',
  ];
  const pick = enhancements.slice(0, 2).join('; ');

  const result = `${shortened} ${pick}.`;
  console.info('Local fallback used (groq) - returning generated text.');
  return result;
}
