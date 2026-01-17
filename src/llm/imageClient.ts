/**
 * 智谱图像生成客户端
 */

import { getZhipuApiKey, getZhipuApiBase, getZhipuImageModel } from "./zhipuConfig";

export interface GenerateImageParams {
  prompt: string;
  style?: string;
  size?: "1024x1024" | "1792x1024" | "1024x1792";
  quantity?: number;
}

export interface ZhipuImageResponse {
  data: Array<{
    url: string;
  }>;
  created: number;
}

/**
 * 生成"像素风可爱"风格的图像
 */
export async function generatePixelCuteImage(
  prompt: string,
  quantity: number = 1
): Promise<string[]> {
  const apiKey = getZhipuApiKey();
  const baseUrl = getZhipuApiBase();
  const model = getZhipuImageModel();

  // 增强提示词：融合"像素风可爱"的风格描述
  const enhancedPrompt = `${prompt}，风格：像素风，可爱，明亮，温暖色调，卡通，8-bit/16-bit复古像素艺术，高度详细，萌萌哒，柔和的光线`;

  try {
    const response = await fetch(`${baseUrl}/images/generations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        prompt: enhancedPrompt,
        // 智谱 API 参数（根据官方文档调整）
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("API Error Details:", error);
      throw new Error(`Zhipu Image API error: ${response.status} - ${error}`);
    }

    const data: ZhipuImageResponse = await response.json();
    console.log("API Response:", data);
    return data.data.map((item) => item.url);
  } catch (error) {
    console.error("Failed to generate image:", error);
    throw error;
  }
}

/**
 * 高级图像生成方法，支持自定义参数
 */
export async function generateImage(
  params: GenerateImageParams
): Promise<string[]> {
  const apiKey = getZhipuApiKey();
  const baseUrl = getZhipuApiBase();
  const model = getZhipuImageModel();

  // 如果指定了风格，使用自定义风格；否则使用默认的"像素风可爱"
  const finalPrompt = params.style
    ? `${params.prompt}，风格：${params.style}`
    : `${params.prompt}，风格：像素风，可爱，明亮，温暖色调，卡通，8-bit/16-bit复古像素艺术，高度详细，萌萌哒，柔和的光线`;

  try {
    const response = await fetch(`${baseUrl}/images/generations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        prompt: finalPrompt,
        // 智谱 API 参数
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("API Error Details:", error);
      throw new Error(`Zhipu Image API error: ${response.status} - ${error}`);
    }

    const data: ZhipuImageResponse = await response.json();
    return data.data.map((item) => item.url);
  } catch (error) {
    console.error("Failed to generate image:", error);
    throw error;
  }
}

/**
 * 快速调用：只需提示词即可生成"像素风可爱"图像
 */
export async function quickGeneratePixelCute(prompt: string): Promise<string> {
  const images = await generatePixelCuteImage(prompt, 1);
  return images[0];
}
