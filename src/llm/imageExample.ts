/**
 * 智谱图像生成使用示例
 */

import {
  generatePixelCuteImage,
  generateImage,
  quickGeneratePixelCute,
} from "@/llm/imageClient";

/**
 * 示例 1: 快速生成像素风可爱图像（最简单的方式）
 */
export async function exampleQuickGenerate() {
  try {
    const imageUrl = await quickGeneratePixelCute("一只可爱的小猫咪");
    console.log("生成的图像 URL:", imageUrl);
    return imageUrl;
  } catch (error) {
    console.error("生成失败:", error);
  }
}

/**
 * 示例 2: 生成单张像素风可爱图像
 */
export async function exampleSingleImage() {
  try {
    const urls = await generatePixelCuteImage("梦幻的童话城堡", 1);
    console.log("生成的图像 URLs:", urls);
    return urls[0];
  } catch (error) {
    console.error("生成失败:", error);
  }
}

/**
 * 示例 3: 生成多张像素风可爱图像
 */
export async function exampleMultipleImages() {
  try {
    const urls = await generatePixelCuteImage("魔法森林中的精灵", 4);
    console.log("生成的图像 URLs:", urls);
    return urls;
  } catch (error) {
    console.error("生成失败:", error);
  }
}

/**
 * 示例 4: 自定义参数生成图像
 */
export async function exampleCustomStyle() {
  try {
    const urls = await generateImage({
      prompt: "星空下的小木屋",
      style: "插画风格，水彩风格，梦幻，宁静",
      size: "1024x1024",
      quantity: 2,
    });
    console.log("生成的图像 URLs:", urls);
    return urls;
  } catch (error) {
    console.error("生成失败:", error);
  }
}

/**
 * 示例 5: 在 Vue 组件中使用
 *
 * <template>
 *   <div>
 *     <button @click="generateImage">生成图像</button>
 *     <img v-if="imageUrl" :src="imageUrl" alt="生成的图像" />
 *     <p v-if="loading">生成中...</p>
 *     <p v-if="error" style="color: red;">{{ error }}</p>
 *   </div>
 * </template>
 *
 * <script setup lang="ts">
 * import { ref } from "vue";
 * import { quickGeneratePixelCute } from "@/llm/imageClient";
 *
 * const imageUrl = ref("");
 * const loading = ref(false);
 * const error = ref("");
 *
 * const generateImage = async () => {
 *   loading.value = true;
 *   error.value = "";
 *   try {
 *     imageUrl.value = await quickGeneratePixelCute("一只萌萌哒的小狐狸");
 *   } catch (err) {
 *     error.value = "图像生成失败，请重试";
 *   } finally {
 *     loading.value = false;
 *   }
 * };
 * </script>
 */
