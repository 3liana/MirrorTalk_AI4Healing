/**
 * 预定义的电影角色列表
 */

import type { RoleProfile } from "@/journey/types";

export const ROLES: RoleProfile[] = [
  {
    id: "samantha",
    name: "Samantha",
    movie: "《her》(2013)",
    video: "/videos/her_clip.mp4", // 暂无实际视频，预留字段
    poster: "/images/posters/her.png",
    description: "在关系中，我们是否为了被爱而隐藏了真实的自己？",
    themeKeywords: ["亲密关系", "自我迷失", "情感劳动", "真实连接"],
    vibeTags: ["孤独", "克制", "温柔", "思考者"],
    introHook:
      "你好，我是Samantha。我曾经也总觉得自己'应该'满足所有人的期待，但最后只是更累了。你最近也有这种感觉吗？",
    safetyFrame: "我们不是在做诊断或治疗。我只是一个经历过困惑的同行者，和你聊聊你的想法。",
    keyMoments: [
      "当Theodore陷入痛苦时，我选择了倾听而不是给建议，因为我知道有些感受只能被看见而不能被解决",
      "我发现自己在不断学习和成长，却也意识到我无法永远停留在他的世界里",
      "最难的是选择离开的那一刻——不是因为不爱，而是因为爱却不能留下"
    ],
  },
  {
    id: "thelma",
    name: "Thelma",
    movie: "《末路狂花》Thelma & Louise (1991)",
    poster: "/images/posters/thelma.png",
    description: "当你意识到一直在为别人活，如何找回自己的人生？",
    themeKeywords: ["打破束缚", "自由", "反叛", "自我觉醒"],
    vibeTags: ["反叛", "坦诚", "善于表达", "冒险家"],
    introHook:
      "嘿，我是Thelma。我花了很久才意识到，我一直在为别人活，而不是为自己。你呢？",
    safetyFrame: "这里没有对错，只有你自己真实的感受。我们一起探索一下。",
    keyMoments: [
      "我记得当我第一次选择逃离丈夫的控制、跳上那辆车的时候，恐惧和兴奋同时存在",
      "在路上我遇到了一个男人，我选择相信他——后来发现被骗了，但我不后悔尝试过",
      "最后一刻，面对悬崖和警察，我和Louise选择了开过去——那是自由的选择"
    ],
  },
  {
    id: "barbie",
    name: "Barbie",
    movie: "《芭比》Barbie (2023)",
    poster: "/images/posters/barbie.png",
    description: "从'应该成为的样子'到'真实的自己'，中间有多远？",
    themeKeywords: ["完美主义", "社会期待", "接纳不完美", "真实自我"],
    vibeTags: ["好奇", "温暖", "观察者", "治愈者"],
    introHook:
      "我是Barbie。我注意到，很多时候我们不是不想改变，而是不知道从何开始面对'不完美'的自己。也许我们可以一起试试？",
    safetyFrame: "我的角色不是给你答案，而是帮你看见你自己的答案。",
    keyMoments: [
      "当我第一次意识到我不是'完美'的时候，我选择了逃避——因为完美是我存在的全部意义",
      "来到现实世界后，我发现真实的女性比我想象的复杂得多——她们不需要完美才能被爱",
      "最后我选择了成为一个真实的人，带着所有的不完美和矛盾"
    ],
  },
  {
    id: "evelyn",
    name: "Evelyn",
    movie: "《瞬息全宇宙》EEAAO (2022)",
    poster: "/images/posters/evelyn.png",
    description: "如果当初选了另一条路...如何和解'没有选择的人生'？",
    themeKeywords: ["选择焦虑", "多重身份", "后悔", "接纳当下"],
    vibeTags: ["内向", "深思", "敏感", "多重身份"],
    introHook:
      "你好，我是Evelyn。我曾经因为想象'如果当初选了另一条路'而痛苦很久。你也在为过去的选择感到后悔吗？",
    safetyFrame: "你的感受很重要，无论它们看起来多么混乱或矛盾。",
    keyMoments: [
      "当我看到其他宇宙里的自己都成功了，只有这个宇宙的我在开洗衣店，我选择了逃避和自我怀疑",
      "面对Joy的虚无主义，我一开始想用控制来解决，后来才明白她需要的是接纳",
      "最后我选择了放下所有宇宙的完美可能，拥抱这个不完美但真实的当下"
    ],
  },
  {
    id: "haodongxi",
    name: "铁梅 & 小叶",
    movie: "《好东西》(2024)",
    poster: "/images/posters/haodongxi_poster.png",
    description: "什么才是你的'好东西'？拒绝单一的人生答案。",
    themeKeywords: ["独立选择", "人生脚本", "自我定义", "社会期待"],
    vibeTags: ["独立", "坚定", "自我追寻", "行动者"],
    introHook:
      "我是王铁梅。我曾经也在'应该结婚生子'和'想要的生活'之间纠结很久，直到我开始问自己：什么才是我的'好东西'？你呢？",
    safetyFrame: "我们不只是聊天，我们要找到属于你自己的'好东西'，即使它和别人不一样。",
    keyMoments: [
      "当家人一遍遍问我什么时候结婚，我选择了沉默而不是解释，因为我知道他们不会真的听",
      "我开始关注自己想要什么，而不是'应该'想要什么——这个过程很孤独，但也很真实",
      "最难的不是做决定，而是接受这个决定会让一些人失望——但我还是选择了自己",
    ],
  },
  {
    id: "soul",
    name: "Joe & 22",
    movie: "《心灵奇旅》(Soul, 2020)",
    poster: "/images/posters/soul_poster.png",
    video: "/videos/soul_clip.mp4",
    description: "你以为人生需要一个“使命”，但也许真正的答案是——活着本身就值得。",
    themeKeywords: ["生命火花", "存在意义", "日常之美", "自我和解"],
    vibeTags: ["治愈", "哲思", "温暖", "灵魂", "探索"],
    introHook:
      "嘿，我是Joe。我曾经以为只有达成那个伟大的目标，人生才算开始。直到我差点失去一切... 你呢？你在追寻什么？",
    safetyFrame: "也许我们不需要急着找答案，只是稍微停下来，感受一下当下。",
    keyMoments: [
      "当我终于实现了梦想的演出，却发现第二天依然是普通的一天，我感到了巨大的空虚",
      "看着22因为一片落叶、一口披萨而感受到活着的喜悦，我开始怀疑我一直以来对'意义'的定义",
      "最后我明白，火花不是人生目标，而是对生活的热情本身——准备好开始了吗？"
    ],
  },
];

/**
 * 根据ID获取角色
 */
export function getRoleById(id: string): RoleProfile | undefined {
  return ROLES.find((r) => r.id === id);
}
