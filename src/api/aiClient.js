// Lightweight AI client with primary Gemini -> fallback OpenAI (ChatGPT)
async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function fetchWithRetry(url, options = {}, maxRetries = 5) {
  let attempt = 0;
  while (attempt <= maxRetries) {
    const res = await fetch(url, options);
    if (res.status !== 429) return res;

    attempt++;
    const retryAfter = res.headers.get('Retry-After');
    const wait = retryAfter ? Number(retryAfter) * 1000 : Math.min(1000 * 2 ** attempt, 30000);
    await sleep(wait);
  }
  throw new Error('Max retries exceeded for 429 response');
}

async function callGemini(prompt) {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  if (!apiKey) throw new Error('Missing REACT_APP_GEMINI_API_KEY');

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  const chatHistory = [{ role: 'user', parts: [{ text: prompt }] }];
  const payload = { contents: chatHistory };

  const res = await fetchWithRetry(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(`Gemini error: ${res.status} ${res.statusText} ${data?.error?.message || ''}`);
  }

  const result = await res.json();
  if (result?.candidates?.[0]?.content?.parts?.[0]?.text) {
    return result.candidates[0].content.parts[0].text;
  }
  throw new Error('Invalid response from Gemini');
}

async function callOpenAI(prompt) {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  if (!apiKey) throw new Error('Missing REACT_APP_OPENAI_API_KEY');

  const apiUrl = 'https://api.openai.com/v1/chat/completions';
  const body = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 200,
    temperature: 0.8,
  };

  const res = await fetchWithRetry(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(`OpenAI error: ${res.status} ${res.statusText} ${data?.error?.message || ''}`);
  }

  const result = await res.json();
  const text = result?.choices?.[0]?.message?.content;
  if (text) return text;
  throw new Error('Invalid response from OpenAI');
}

// Public helper: tries Gemini first, then OpenAI (ChatGPT) as fallback
export async function generateEnhancedDescription(prompt) {
  try {
    return await callGemini(prompt);
  } catch (err) {
    console.warn('Gemini failed, falling back to OpenAI:', err.message || err);
  }

  // fallback to OpenAI
  return await callOpenAI(prompt);
}
