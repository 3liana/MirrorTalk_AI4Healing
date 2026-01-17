/**
 * 基于维度特质生成像素画
 */

import { quickGeneratePixelCute } from "./imageClient";
import type { Dimension } from "@/journey/types";

/**
 * 维度组合规则 - 将8个维度映射为视觉隐喻
 */
export function generatePixelArtPrompt(dimensions: Dimension[]): string {
  // 解析各维度
  const dimMap = new Map(dimensions.map((d) => [d.id, d.value]));

  // 主体感来源 (agency_source)
  const agencySource = dimMap.get("agency_source") || 50;
  // 归因方向 (attribution)
  const attribution = dimMap.get("attribution") || 50;
  // 价值确认路径 (value_path)
  const valuePath = dimMap.get("value_path") || 50;
  // 边界形态 (boundary)
  const boundary = dimMap.get("boundary") || 50;
  // 欲望可见度 (desire_visibility)
  const desireVisibility = dimMap.get("desire_visibility") || 50;
  // 情绪处理路径 (emotion_path)
  const emotionPath = dimMap.get("emotion_path") || 50;
  // 责任分布 (responsibility)
  const responsibility = dimMap.get("responsibility") || 50;
  // 抵抗方式 (resistance)
  const resistance = dimMap.get("resistance") || 50;

  // 生成核心意象
  let coreImagery = "";
  let atmosphere = "";
  let elements: string[] = [];

  // 规则1: 主体感 + 边界形态 → 主体选择
  if (agencySource > 60 && boundary < 40) {
    coreImagery = "一座发光的灯塔矗立在雾气中";
    elements.push("灯塔", "雾气", "光芒");
  } else if (agencySource < 40 && boundary > 60) {
    coreImagery = "一片森林中被围栏保护的小花园";
    elements.push("森林", "围栏", "花园");
  } else if (boundary < 40) {
    coreImagery = "漂浮在云层中的浮岛";
    elements.push("云朵", "浮岛", "柔和边界");
  } else {
    coreImagery = "被清澈湖水环绕的小屋";
    elements.push("湖水", "小屋", "倒影");
  }

  // 规则2: 情绪处理 + 欲望可见度 → 天气/光线
  if (emotionPath < 40 && desireVisibility < 40) {
    atmosphere = "被薄雾笼罩，星光隐约可见";
    elements.push("薄雾", "隐藏的星光");
  } else if (emotionPath > 60 && desireVisibility > 60) {
    atmosphere = "阳光明媚，彩虹横跨天空";
    elements.push("阳光", "彩虹", "明亮");
  } else if (desireVisibility > 60) {
    atmosphere = "温暖的落日光芒洒下";
    elements.push("落日", "温暖光线");
  } else {
    atmosphere = "柔和的月光照亮夜晚";
    elements.push("月光", "宁静夜晚");
  }

  // 规则3: 归因 + 责任分布 → 环境互动元素
  if (attribution < 40 && responsibility > 60) {
    elements.push("一个背着重担的小人", "石头路径");
  } else if (attribution > 60 && responsibility < 40) {
    elements.push("随风飘动的旗帜", "开放的窗户");
  } else {
    elements.push("摇摆的树木", "流动的溪水");
  }

  // 规则4: 价值确认 + 抵抗方式 → 细节装饰
  if (valuePath < 40 && resistance < 40) {
    elements.push("紧闭的门", "柔和的灯光");
  } else if (valuePath > 60 && resistance > 60) {
    elements.push("盛开的花朵", "开放的道路");
  } else {
    elements.push("半开的窗户", "蜿蜒的小径");
  }

  // 组合最终提示词
  const prompt = `${coreImagery}，${atmosphere}。场景中有${elements.slice(0, 5).join("、")}。整体呈现宁静、温暖、治愈的氛围`;

  return prompt;
}

/**
 * 生成像素画
 */
export async function generatePixelArt(dimensions: Dimension[]): Promise<string> {
  const prompt = generatePixelArtPrompt(dimensions);
  console.log("🎨 生成像素画提示词:", prompt);

  try {
    const imageUrl = await quickGeneratePixelCute(prompt);
    return imageUrl;
  } catch (error) {
    console.error("像素画生成失败:", error);
    // 返回一个占位符
    return "https://via.placeholder.com/512x512/4a5568/e2e8f0?text=Pixel+Art";
  }
}

/**
 * 获取维度的视觉隐喻描述
 */
export function getDimensionMetaphor(dimensionId: string, value: number): string {
  const metaphors: Record<string, { low: string; mid: string; high: string }> = {
    agency_source: {
      low: "月亮反射阳光 - 主体感来自外部关系",
      mid: "湖面上的涟漪 - 内外互动产生主体感",
      high: "自发光的灯塔 - 主体感源于内在",
    },
    attribution: {
      low: "向内收缩的漩涡 - 倾向自我归因",
      mid: "流动的河流 - 灵活的归因方式",
      high: "向外扩散的光芒 - 倾向外部归因",
    },
    value_path: {
      low: "深根独立的大树 - 价值源于自我逻辑",
      mid: "交织的根系 - 多元的价值确认",
      high: "浅而广的草地 - 价值源于他人理解",
    },
    boundary: {
      low: "波浪线的轮廓 - 边界模糊流动",
      mid: "半透明的墙 - 边界可协商",
      high: "清晰的围栏 - 边界明确稳定",
    },
    desire_visibility: {
      low: "完全遮蔽的窗帘 - 欲望隐藏",
      mid: "半透明的纱窗 - 欲望选择性可见",
      high: "敞开的窗户 - 欲望清晰可见",
    },
    emotion_path: {
      low: "蓄水池 - 情绪延后处理",
      mid: "流动的小溪 - 情绪逐步处理",
      high: "喷泉 - 情绪即时转化为行动",
    },
    responsibility: {
      low: "平衡的羽毛 - 责任共担",
      mid: "摇摆的天平 - 责任动态分配",
      high: "沉重的背包 - 承担大部分责任",
    },
    resistance: {
      low: "绕路的小径 - 回避型抵抗",
      mid: "减速带 - 温和对抗",
      high: "透明屏障 - 内在抽离",
    },
  };

  const meta = metaphors[dimensionId];
  if (!meta) return "未知维度";

  if (value < 35) return meta.low;
  if (value > 65) return meta.high;
  return meta.mid;
}
