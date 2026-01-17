/**
 * 智谱 (Zhipu) API 配置
 */

export function getZhipuApiKey(): string {
  const key = import.meta.env.VITE_ZHIPU_API_KEY;
  if (!key) {
    throw new Error(
      "VITE_ZHIPU_API_KEY is not set. Please add it to your .env.local file"
    );
  }
  return key;
}

export function getZhipuApiBase(): string {
  return (
    import.meta.env.VITE_ZHIPU_API_BASE ||
    "https://open.bigmodel.cn/api/paas/v4"
  );
}

export function getZhipuImageModel(): string {
  return import.meta.env.VITE_ZHIPU_IMAGE_MODEL || "cogview-3";
}
