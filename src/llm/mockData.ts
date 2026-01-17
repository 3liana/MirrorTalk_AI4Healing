/**
 * Mock 数据 - 用于测试 ReportView
 */

import type { MirrorReport, JourneyState } from "@/journey/types";
import { getRoleById } from "@/roles/roles";

/**
 * Mock 报告数据
 */
export const mockReport: MirrorReport = {
  headline: "你的温柔，其实是一种力量",
  thinkingPatterns: [
    {
      name: "完美主义者的陷阱",
      description:
        "你总是期待自己做得完美，但完美本身就是一个无法到达的地方。这让你陷入不断追逐的循环中。",
      exampleFromYou:
        "我总是觉得自己还不够好，再多做一点点就好了，但永远有下一个'一点点'",
    },
    {
      name: "为他人着想的自我消耗",
      description:
        "你很会读别人的需求，但往往忽视了自己的感受。你用照顾他人来定义自己的价值。",
      exampleFromYou:
        "我不知道自己想要什么，但我很清楚别人需要什么，所以我就按他们的期待来",
    },
    {
      name: "对批评的过度敏感",
      description:
        "一句微妙的评论就能让你反复琢磨，这反映出你对认可的深层渴望。",
      exampleFromYou:
        "有时候别人随口一说的话，我会想很久，觉得他们可能在不满我",
    },
  ],
  overlookedNeeds: [
    {
      need: "被看见和理解",
      howItShowsUp:
        "你在对话中反复提到'没人真的理解我'。这不是因为你不可理解，而是你很少主动表达真实的想法。",
      gentleReminder:
        "也许不是他人不够体贴，而是你需要勇气去说出'这是我真实的想法'。",
    },
    {
      need: "休息和空白",
      howItShowsUp:
        "你似乎很难停下来。总是在计划下一步，总是在思考如何变得更好。你的大脑没有真正的假期。",
      gentleReminder:
        "休息不是懒惰，而是为了能以更真实的面目活着。允许自己有不完美的时刻。",
    },
    {
      name: "属于自己的选择权",
      howItShowsUp:
        "在对话中，你最常问的是'我应该怎么做'，而很少说'我想怎么做'。选择权的缺失让你感到被困。",
      gentleReminder:
        "你的生活应该由你自己设计。即使是错误的选择，也比被动的完美更真实。",
    },
  ],
  microActions: [
    {
      title: "5分钟的\"不做任何事\"",
      why: "你需要学会坐在不完美里。这个练习可以帮你体验到：什么都不做，世界也不会崩塌。",
      how: "每天找一个时间，坐着、躺着或走着，5分钟内什么都不想、不做、不解决。只是存在。记录你的感受。",
      timeCost: "5分钟/天，坚持一周",
    },
    {
      title: "说一个真实的\"不\"",
      why: "你的\"好\"往往是无条件的。这一次，实践设置一个温和的边界——对一个你不想做的事情。",
      how: "这周找一个小机会（朋友的邀请、家人的要求），用柔软但坚定的语气说：'谢谢你想到我，但这次我想为自己选择。'记录对方的反应和你的感受。",
      timeCost: "一次对话，5分钟准备",
    },
    {
      title: "写一封信给你的完美主义",
      why: "有时候，和我们的伤口对话会很有疗愈作用。这次，把完美主义当成一个想帮助你但方式不对的朋友。",
      how: "找30分钟，用笔写一封信。问完美主义：'你为什么这么执着？你想保护我免于什么？'不需要答案完美，只需要真实。",
      timeCost: "30分钟，一次性",
    },
  ],
  closingLetter:
    "这个旅程里，我看到了一个非常深思熟虑的人。你的敏感和细致是优势，不是缺点。下一步，试试看不是如何变得更好，而是如何对自己更温柔。你值得。——来自 Mirror",
  resources: [
    {
      type: "book",
      title: "《不完美，才是我》",
      note: "关于如何和自己的不完美和解。这本书的温柔会陪伴你。",
    },
    {
      type: "podcast",
      title: "《每日冥想：5分钟的宁静》",
      note: "帮你建立那个'什么都不做'的习惯。很多人从这里开始学会呼吸。",
    },
    {
      type: "community",
      title: "温和行动者社区",
      note: "一群和你一样在思考如何真实地活着的人。有时候，你需要知道自己不是唯一的。",
    },
  ],
  dimensions: [
    {
      id: "agency_source",
      name: "主体感来源",
      value: 35,
      description: "关于你感到自己「是自己」的时刻来自哪里",
      visualMetaphor: "光源位置 - 不同时机的光照方向",
      userBehavior: "在关系稳定时，你感觉更像自己；当关系出现波动，你会感到自我的摇摆。被理解的时刻，像是有光照进来。而独处时，那种主体感会变得模糊。",
      summary: "你的主体感更多依赖外部关系的稳定和他人的理解",
      imagePrompt: "一个人影被多个方向的柔和光源照亮，最强的光来自左侧（关系方向），像素风格，温暖色调",
    },
    {
      id: "attribution",
      name: "归因方向",
      value: 28,
      description: "当事情出现问题时，你倾向于归因的方向",
      visualMetaphor: "重力方向 - 向内收缩的流动",
      userBehavior: "关系出现问题时，你的第一反应是反思自己。\"是不是我哪里做得不够好？\" 这种内归因让你更容易自责，但也让你更少去看到环境和他人的因素。",
      summary: "你习惯性地将问题归因于自己，承担了本不该独自承担的责任",
      imagePrompt: "向内旋转的漩涡图案，中心是一个小小的人影，像素风格，蓝紫色调",
    },
    {
      id: "value_path",
      name: "价值确认路径",
      value: 65,
      description: "你通过什么来确认自己的价值",
      visualMetaphor: "根系图 - 浅而广的根",
      userBehavior: "你需要看到他人的理解和认可，才能确认自己做的是对的、有意义的。这种确认来自多个方向——朋友、家人、同事——你的根扎得很广，但不够深。",
      summary: "你的价值感建立在他人的理解之上，这让你敏感而温柔，但也容易动摇",
      imagePrompt: "一棵树有许多浅浅的根伸向四面八方，像素风格，柔和的绿色和蓝色",
    },
    {
      id: "boundary",
      name: "边界形态",
      value: 32,
      description: "你与他人之间边界的清晰度",
      visualMetaphor: "容器边缘 - 波浪线的轮廓",
      userBehavior: "你的边界是流动的、可协商的。别人的需求很容易渗透进来，而你的需求却很难明确表达。你不确定什么是\"应该\"拒绝的，什么是\"可以\"答应的。",
      summary: "你的边界像水一样柔软，容易被穿透，也容易让你感到疲惫",
      imagePrompt: "一个半透明的容器，边缘是波浪状的虚线，像素风格，梦幻色调",
    },
    {
      id: "desire_visibility",
      name: "欲望可见度",
      value: 25,
      description: "你的真实欲望对自己和他人的可见程度",
      visualMetaphor: "窗帘透光度 - 几乎完全遮蔽",
      userBehavior: "你很少直接说\"我想要\"，更多时候你在观察\"你们需要什么\"。你的欲望被层层包裹，有时连你自己都不太清楚自己到底想要什么。",
      summary: "你的真实欲望被深深隐藏，像被厚重窗帘遮住的光",
      imagePrompt: "一扇窗户被厚重的窗帘完全遮住，只有边缘透出一丝微光，像素风格，暗色调",
    },
    {
      id: "emotion_path",
      name: "情绪处理路径",
      value: 30,
      description: "情绪产生后你如何处理它",
      visualMetaphor: "水流路径 - 蓄水池",
      userBehavior: "情绪来了，你不会立刻表达或处理，而是先存起来。你需要时间消化、内化，等到\"合适的时机\"再说。但往往，这个时机很难到来。",
      summary: "你像一个蓄水池，积累情绪，延后处理，直到溢出",
      imagePrompt: "一个蓄满水的池塘，水面平静但深不见底，像素风格，深蓝色调",
    },
    {
      id: "responsibility",
      name: "责任分布",
      value: 72,
      description: "在关系中你承担了多少维系的责任",
      visualMetaphor: "天平 - 一侧沉重",
      userBehavior: "你总是那个主动关心、主动修复、主动迁就的人。关系的维系好像大部分都在你肩上，而对方只需要\"在那里\"就好。你习惯了这种不平衡。",
      summary: "你背着关系的大部分重量，却以为这是应该的",
      imagePrompt: "一个天平，左侧承载着沉重的物品，右侧只有轻飘飘的羽毛，像素风格，紫色调",
    },
    {
      id: "resistance",
      name: "抵抗方式",
      value: 38,
      description: "面对不想要的事情时你如何应对",
      visualMetaphor: "障碍物形态 - 绕路",
      userBehavior: "你很少正面说\"不\"。当遇到不想做的事，你选择回避、拖延、或者找理由绕过去。这种软性抵抗让你避免了冲突，但也让你的真实需求被忽视。",
      summary: "你通过回避和迂回来表达拒绝，但这让你的声音更难被听见",
      imagePrompt: "一条道路上有障碍物，路径绕开它形成弯曲的弧线，像素风格，柔和色调",
    },
  ],
};

/**
 * Mock Journey State
 */
export function createMockJourneyState(): JourneyState {
  const samantha = getRoleById("samantha");
  if (!samantha) throw new Error("Role not found");

  return {
    role: samantha,
    maxTurns: 12,
    currentTurn: 12,
    turns: [],
    answers: [
      {
        turnIndex: 1,
        selectedChoiceIds: ["a"],
        comment: "我觉得有时候我太自责了",
      },
      {
        turnIndex: 2,
        selectedChoiceIds: ["b"],
        comment: "我害怕失去重要的人",
      },
      {
        turnIndex: 3,
        selectedChoiceIds: ["c"],
        comment: "我想尝试表达真实的自己",
      },
    ],
    discovered: {
      clues: [
        "容易自责",
        "过度承担责任",
        "害怕冲突",
        "寻求认可",
        "完美主义倾向",
      ],
      shouldStatements: [
        "我应该对所有人都好",
        "我应该是完美的",
        "我应该能解决所有问题",
      ],
      needs: ["被理解", "休息", "选择权"],
      tone: "warm",
    },
  };
}

/**
 * Mock 测试路由数据
 */
export const MOCK_TEST_DATA = {
  report: mockReport,
  journeyState: createMockJourneyState(),
};
