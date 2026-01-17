/**
 * LLM 配置（支持 Minimax、智谱、Gemini）
 *
 * 提供者选择：
 * - providerMode = 1 使用 Minimax（默认）
 * - providerMode = 2 使用 智谱（Zhipu）
 * - providerMode = 3 使用 Gemini
 *
 * 环境变量（可选）：
 * - VITE_PROVIDER_MODE: "1" | "2" | "3"
 * - VITE_MINIMAX_API_KEY / VITE_ZHIPU_API_KEY / VITE_GEMINI_API_KEY
 * - VITE_OPENAI_API_KEY（兼容旧配置，作为 Minimax 的后备）
 * - VITE_OPENAI_API_BASE / VITE_OPENAI_MODEL（兼容旧配置）
 * - VITE_ZHIPU_MODEL（默认 glm-4）
 * - VITE_GEMINI_MODEL（默认 gemini-pro）
 */

export function getProviderMode(): 1 | 2 | 3 {
  const raw = import.meta.env.VITE_PROVIDER_MODE;
  const n = raw ? Number(raw) : 1;
  return (n === 2 ? 2 : n === 3 ? 3 : 1);
}

export function getApiKey(): string {
  const mode = getProviderMode();
  const key = mode === 3
    ? (import.meta.env.VITE_GEMINI_API_KEY as string | undefined)
    : mode === 2
    ? (import.meta.env.VITE_ZHIPU_API_KEY as string | undefined)
    : (import.meta.env.VITE_MINIMAX_API_KEY as string | undefined) || (import.meta.env.VITE_OPENAI_API_KEY as string | undefined);

  if (!key) {
    throw new Error(
      mode === 3
        ? "VITE_GEMINI_API_KEY is not set. Please add it to your .env.local file"
        : mode === 2
        ? "VITE_ZHIPU_API_KEY is not set. Please add it to your .env.local file"
        : "VITE_MINIMAX_API_KEY (or VITE_OPENAI_API_KEY) is not set. Please add it to your .env.local file"
    );
  }
  return key;
}

export function getApiBaseUrl(): string {
  const mode = getProviderMode();
  if (mode === 3) {
    // Gemini API 基础路径（v1beta 支持最新模型）
    return "https://generativelanguage.googleapis.com/v1beta";
  }
  if (mode === 2) {
    // 智谱 v4 Chat Completions 根路径（优先使用专用变量，避免被 Minimax 的 BASE 覆盖）
    return (import.meta.env.VITE_ZHIPU_API_BASE as string | undefined) || "https://open.bigmodel.cn/api/paas/v4";
  }
  // Minimax（OpenAI 兼容）默认根路径
  return (import.meta.env.VITE_OPENAI_API_BASE as string | undefined) || "https://api.minimax.chat/v1";
}

export function getModel(): string {
  const mode = getProviderMode();
  if (mode === 3) {
    return (import.meta.env.VITE_GEMINI_MODEL as string | undefined) || "gemini-pro";
  }
  if (mode === 2) {
    return (import.meta.env.VITE_ZHIPU_MODEL as string | undefined) || "glm-4";
  }
  return (import.meta.env.VITE_OPENAI_MODEL as string | undefined) || "minimax-text-01";
}
