/**
 * Journey 类型定义
 */

export type InteractionType = "single_choice" | "multi_choice" | "short_comment" | "choice_plus_comment";

export interface RoleProfile {
  id: string;
  name: string;           // 角色名
  movie: string;          // 来源电影/剧
  vibeTags: string[];     // 氛围标签
  introHook: string;      // 开场引子
  safetyFrame: string;    // 框架话术
  keyMoments?: string[];  // 可选：电影中的关键情节/选择，供 AI 回顾使用
}

export interface ChoiceCard {
  id: string;
  title: string;          // 选项短句
  description?: string;   // 可选描述
  intent: string;         // 意图字符串
  weight?: number;        // 可选权重
}

export interface TurnInteraction {
  type: InteractionType;
  prompt: string;         // 用户要回答的问题
  maxCommentChars?: number; // 默认 80
  choices?: ChoiceCard[];
  minSelect?: number;     // 默认 1
  maxSelect?: number;     // 默认 1 or 2
}

export interface MemoryPatch {
  clues?: string[];
  shouldStatements?: string[];
  needs?: string[];
}

export interface EndCondition {
  canEnd: boolean;
  reason?: string;
}

export interface TurnSpec {
  turnIndex: number;
  module: "enter" | "explore" | "action";
  roleText: string;
  interaction: TurnInteraction;
  probeTag: string;
  gentleWhy?: string;
  memoryPatch?: MemoryPatch;
  endCondition?: EndCondition;
}

export interface TurnAnswer {
  turnIndex: number;
  selectedChoiceIds?: string[];
  comment?: string;
  createdAt: number;
}

export interface DiscoveredInsights {
  clues: string[];
  shouldStatements: string[];
  needs: string[];
  tone: string;
}

export interface JourneyState {
  role: RoleProfile;
  maxTurns: number;
  currentTurn: number;
  turns: TurnSpec[];
  answers: TurnAnswer[];
  discovered: DiscoveredInsights;
}

export interface MicroAction {
  title: string;
  why: string;
  how: string;
  timeCost: string;
}

// 8个维度特质
export interface Dimension {
  id: string;
  name: string;
  value: number; // 0-100，表示在该维度上的倾向
  description: string;
  visualMetaphor: string; // 视觉隐喻描述
  userBehavior: string; // 用户在这个维度上的具体表现
  summary: string; // 一句话总结
  imagePrompt?: string; // 图片生成提示词
  imageUrl?: string; // 生成的图片URL
}

export interface MirrorReport {
  headline: string;
  thinkingPatterns: Array<{ name: string; description: string; exampleFromYou: string }>;
  overlookedNeeds: Array<{ need: string; howItShowsUp: string; gentleReminder: string }>;
  microActions: MicroAction[];
  closingLetter: string;
  resources?: Array<{ type: "book" | "podcast" | "community"; title: string; note: string }>;
  dimensions?: Dimension[]; // 8维度特质
  pixelArtUrl?: string; // 生成的像素画 URL
}
