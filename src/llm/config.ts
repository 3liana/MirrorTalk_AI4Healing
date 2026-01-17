/**
 * LLM 配置（支持 OpenAI 和 Minimax）
 */

export function getApiKey(): string {
  const key = import.meta.env.VITE_OPENAI_API_KEY;
  if (!key) {
    throw new Error(
      "VITE_OPENAI_API_KEY is not set. Please add it to your .env.local file"
    );
  }
  return key;
}

export function getApiBaseUrl(): string {
  return (
    import.meta.env.VITE_OPENAI_API_BASE ||
    "https://api.minimax.chat/v1"
  );
}

export function getModel(): string {
  return import.meta.env.VITE_OPENAI_MODEL || "minimax-text-01";
}
