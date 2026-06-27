import { generateEnhancedDescription } from './aiClient';

describe('generateEnhancedDescription', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetAllMocks();
    process.env = {
      ...originalEnv,
      REACT_APP_GROQ_API_KEY: 'groq-test-key',
      REACT_APP_GROQ_MODEL: 'groq-1.5',
    };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test('calls Groq and returns the provider response', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: async () => ({ output: 'enhanced description from groq' }),
    });

    global.fetch = fetchMock;

    const result = await generateEnhancedDescription('Describe this garden project');

    expect(result).toBe('enhanced description from groq');
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toBe('https://api.groq.com/openai/v1/responses');
    expect(fetchMock.mock.calls[0][1].method).toBe('POST');
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({
      model: 'groq-1.5',
      input: 'Describe this garden project',
    });
  });

  test('falls back to local generation if Groq fails', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Server Error',
      json: async () => ({ error: 'server error' }),
    });

    global.fetch = fetchMock;

    const result = await generateEnhancedDescription('Describe this garden project');

    expect(result).toContain('Describe this garden project');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
