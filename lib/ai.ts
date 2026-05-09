const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const defaultModel = "openai/gpt-oss-120b:free";
const model = process.env.OPENROUTER_MODEL ?? defaultModel;

interface OpenRouterMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface OpenRouterResponse {
  choices: { message: { content: string } }[];
}

export async function generateStructuredText(prompt: string): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY is not configured");

  const messages: OpenRouterMessage[] = [{ role: "user", content: prompt }];

  const res = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      max_tokens: 600,
      temperature: 0.4,
      messages,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`OpenRouter request failed (${res.status}): ${error}`);
  }

  const data = (await res.json()) as OpenRouterResponse;
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}
