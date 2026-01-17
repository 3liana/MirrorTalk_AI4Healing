/**
 * Journey 类型定义
 */

export type InteractionType = "single_choice" | "multi_choice" | "short_comment" | "choice_plus_comment";

export interface RoleProfile {
  id: string;
  name: string;           // 角色名
  movie: string;          // 来源电影/剧
  video?: string;         // 视频路径 (mp4)
  poster: string;         // 电影海报路径
  description: string;    // 核心议题描述 (用于卡片展示)
  themeKeywords: string[];// 主题关键词
  vibeTags: string[];     // 氛围标签 (兼容现有逻辑)
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

export interface MirrorReport {
  headline: string;
  thinkingPatterns: Array<{ name: string; description: string; exampleFromYou: string }>;
  overlookedNeeds: Array<{ need: string; howItShowsUp: string; gentleReminder: string }>;
  microActions: MicroAction[];
  closingLetter: string;
  resources?: Array<{ type: "book" | "podcast" | "community"; title: string; note: string }>;
}
