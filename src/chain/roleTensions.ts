/**
 * 角色核心张力与关键问题配置
 * 用于生成基于真实关系张力的反思问题
 */

export interface RelationalTension {
  /** 张力简述 */
  name: string;
  /** 张力的具体情景描述 */
  scenario: string;
  /** 可供选择的自我保护反应 */
  responses: {
    id: string;
    text: string;
    /** 这个反应体现的内在动机/模式 */
    pattern: string;
  }[];
  /** 建议在哪个 module 出现 */
  suggestedModule: "enter" | "explore" | "action";
}

export interface RoleConfiguration {
  roleId: string;
  /** 角色核心主题 */
  coreTheme: string;
  /** 这个角色的典型关系张力 */
  tensions: RelationalTension[];
}

export const ROLE_TENSIONS: Record<string, RoleConfiguration> = {
  samantha: {
    roleId: "samantha",
    coreTheme: "在关系中找回自我，不为讨好而隐藏真实需求",
    tensions: [
      {
        name: "讨好与真实的拉扯",
        scenario: "当你想表达真实想法，但预感对方会不开心时...",
        suggestedModule: "enter",
        responses: [
          {
            id: "suppress",
            text: "吞下来。保持和谐很重要",
            pattern: "优先维护关系稳定"
          },
          {
            id: "hint",
            text: "试着委婉地暗示，看对方能否理解",
            pattern: "介于坦诚与保护之间"
          },
          {
            id: "speak",
            text: "直说了，但会不断为自己的想法道歉",
            pattern: "表达后自我否定"
          },
          {
            id: "pause",
            text: "停顿，让自己喘一会儿，才决定怎么说",
            pattern: "在冲动前给自己思考空间"
          }
        ]
      },
      {
        name: "被看见与被拒绝的恐惧",
        scenario: "当对方没有按你期待的方式回应你的关心时...",
        suggestedModule: "explore",
        responses: [
          {
            id: "withdraw",
            text: "开始疏远，告诉自己不该那么期待",
            pattern: "用冷漠保护自己"
          },
          {
            id: "blame_self",
            text: "反思是不是自己做得不够好",
            pattern: "把问题内化为自己的不足"
          },
          {
            id: "communicate",
            text: "试着问问对方，这个差异是从哪来的",
            pattern: "寻求理解而非指责"
          },
          {
            id: "normalize",
            text: "接纳也许我们期待的就是不一样",
            pattern: "承认差异是正常的"
          }
        ]
      },
      {
        name: "需求与内疚的纠缠",
        scenario: "当你提出一个对自己很重要的需求时，对方显得被负累...",
        suggestedModule: "action",
        responses: [
          {
            id: "retract",
            text: "立即收回需求，说'没关系，不用了'",
            pattern: "为自己的需求感到内疚"
          },
          {
            id: "soften",
            text: "减轻要求的份量，让对方更容易接受",
            pattern: "通过降低需求来换取接纳"
          },
          {
            id: "persist",
            text: "坚持这个需求，同时处理自己的内疚感",
            pattern: "把需求和内疚分开看"
          },
          {
            id: "clarify",
            text: "问清楚对方是真的做不到，还是不想做",
            pattern: "区分真实限制与主动回避"
          }
        ]
      }
    ]
  },

  thelma: {
    roleId: "thelma",
    coreTheme: "打破束缚，找回被压抑的自由和真实自我",
    tensions: [
      {
        name: "规则与渴望的冲突",
        scenario: "当你想要的东西与'应该'的标准不符时...",
        suggestedModule: "enter",
        responses: [
          {
            id: "comply",
            text: "放弃想要的，选择'正确'的路",
            pattern: "用应该压制渴望"
          },
          {
            id: "guilty",
            text: "暗地里做，但承受内疚和焦虑",
            pattern: "行为与价值观不一致"
          },
          {
            id: "question",
            text: "开始质疑这个'应该'从何而来",
            pattern: "审视内化的规则"
          },
          {
            id: "decide",
            text: "主动权衡后选择，接纳可能的后果",
            pattern: "有意识地做选择"
          }
        ]
      },
      {
        name: "他人期待的压力",
        scenario: "当有人期待你继续'听话'时...",
        suggestedModule: "explore",
        responses: [
          {
            id: "obey",
            text: "继续配合，即使感到窒息",
            pattern: "优先满足他人期待"
          },
          {
            id: "explain",
            text: "试着让对方理解你的改变",
            pattern: "通过沟通争取认可"
          },
          {
            id: "resist",
            text: "反抗，但可能会伤害关系",
            pattern: "自由优先于连接"
          },
          {
            id: "grieve",
            text: "承认可能失去某些关系，同时继续前进",
            pattern: "对代价有清晰认知"
          }
        ]
      },
      {
        name: "自由的代价",
        scenario: "当你意识到追求真实自我可能要付出代价时...",
        suggestedModule: "action",
        responses: [
          {
            id: "retreat",
            text: "退缩回去，不值得冒那个险",
            pattern: "在实现前放弃"
          },
          {
            id: "hesitate",
            text: "停留在犹豫中，还没准备好",
            pattern: "对代价的恐惧让人不动"
          },
          {
            id: "move",
            text: "带着恐惧继续走，找到支持的人",
            pattern: "在不确定中前进"
          },
          {
            id: "redefine",
            text: "重新定义什么是我能承受的代价",
            pattern: "主动评估而非被动接受"
          }
        ]
      }
    ]
  },

  barbie: {
    roleId: "barbie",
    coreTheme: "从'完美'的期待中解脱，接纳真实但不完美的自我",
    tensions: [
      {
        name: "完美形象与真实自我的裂隙",
        scenario: "当你在别人面前呈现'完美'，但私下感到空虚时...",
        suggestedModule: "enter",
        responses: [
          {
            id: "maintain",
            text: "继续维持这个形象，不让任何人看到裂缝",
            pattern: "用完美来获得价值"
          },
          {
            id: "exhaust",
            text: "有时累，但觉得这是必须的代价",
            pattern: "为形象感到疲惫但无奈"
          },
          {
            id: "slip",
            text: "偶尔让真实自我显露，然后赶快隐藏回去",
            pattern: "在完美与真实之间闪烁"
          },
          {
            id: "explore",
            text: "好奇真实的自己是什么样的",
            pattern: "开始探索隐藏的部分"
          }
        ]
      },
      {
        name: "犯错与否定的恐惧",
        scenario: "当你在某件事上失败或表现不佳时...",
        suggestedModule: "explore",
        responses: [
          {
            id: "shame",
            text: "羞愧感很强，觉得自己'不够好'了",
            pattern: "失败等同于自我否定"
          },
          {
            id: "hide",
            text: "隐藏失败，不让任何人看到",
            pattern: "失败是秘密"
          },
          {
            id: "blame",
            text: "找外部原因，转移自己的失败感",
            pattern: "避免承认不完美"
          },
          {
            id: "learn",
            text: "允许自己学习，把失败看作过程的一部分",
            pattern: "失败可以被接纳"
          }
        ]
      },
      {
        name: "真实需求与讨好的悖论",
        scenario: "当你的真实需求与'应该乖巧'冲突时...",
        suggestedModule: "action",
        responses: [
          {
            id: "suppress",
            text: "压抑需求，保持乖巧",
            pattern: "讨好优先"
          },
          {
            id: "indirect",
            text: "通过其他方式暗示需求，而不直说",
            pattern: "被动地表达"
          },
          {
            id: "apologize",
            text: "表达需求时充满歉意和内疚",
            pattern: "为自己的需求道歉"
          },
          {
            id: "own",
            text: "清楚地说出需求，承认这不'完美'",
            pattern: "主动拥有真实需求"
          }
        ]
      }
    ]
  },

  evelyn: {
    roleId: "evelyn",
    coreTheme: "接纳'此刻的我'，和解那些'没有选择的路'",
    tensions: [
      {
        name: "过去选择的悔恨",
        scenario: "当你回想过去的某个选择，想象'如果当时选了另一条路'时...",
        suggestedModule: "enter",
        responses: [
          {
            id: "dwell",
            text: "深陷其中，反复纠缠于那个假设",
            pattern: "沉溺于反事实思考"
          },
          {
            id: "blame_self",
            text: "责备自己当时没有更聪明地选择",
            pattern: "把后悔转为自责"
          },
          {
            id: "rationalize",
            text: "告诉自己当时是最好的选择了",
            pattern: "用理性消解后悔"
          },
          {
            id: "acknowledge",
            text: "承认那些感受，也看到现在有其价值",
            pattern: "后悔和现状并存"
          }
        ]
      },
      {
        name: "多重身份与矛盾的自我",
        scenario: "当你发现自己在不同情景下呈现很不同的样子时...",
        suggestedModule: "explore",
        responses: [
          {
            id: "confused",
            text: "困惑，哪一个才是真正的我？",
            pattern: "多重性引发身份焦虑"
          },
          {
            id: "guilty",
            text: "觉得自己虚伪，在欺骗别人",
            pattern: "把适应转为内疚"
          },
          {
            id: "accept",
            text: "也许不同场景的我都是真的，都有理由",
            pattern: "接纳多面性"
          },
          {
            id: "choose",
            text: "在这些版本中有意识地选择，而不是被动切换",
            pattern: "从被动到主动"
          }
        ]
      },
      {
        name: "当下生活的价值",
        scenario: "当你最终接纳无法改变过去时...",
        suggestedModule: "action",
        responses: [
          {
            id: "empty",
            text: "感到虚无，如果改变不了，还有什么意义？",
            pattern: "可能性的丧失导致虚无感"
          },
          {
            id: "numb",
            text: "接受了，但感到麻木和疏离",
            pattern: "接纳但无感"
          },
          {
            id: "grieve",
            text: "允许自己为失去的可能性伤心，然后继续",
            pattern: "经过哀悼的接纳"
          },
          {
            id: "curious",
            text: "好奇现在的生活能产生什么样的可能性",
            pattern: "从过去转向现在"
          }
        ]
      }
    ]
  },

  "wang-tiemei": {
    roleId: "wang-tiemei",
    coreTheme: "拒绝单一的人生脚本，定义属于自己的'好生活'",
    tensions: [
      {
        name: "社会期待与个人渴望",
        scenario: "当周围人对你的人生有明确期待（结婚、生子、稳定），但你想要的不一样时...",
        suggestedModule: "enter",
        responses: [
          {
            id: "conform",
            text: "按照期待走，至少能获得认可",
            pattern: "用认可换安全"
          },
          {
            id: "pretend",
            text: "表面遵从，暗地里保护自己的计划",
            pattern: "双重生活"
          },
          {
            id: "explain",
            text: "试着向他们解释你的选择为什么对你有意义",
            pattern: "寻求理解而非对抗"
          },
          {
            id: "declare",
            text: "明确表示这是你的人生，继续做选择",
            pattern: "主权优先"
          }
        ]
      },
      {
        name: "孤独与归属的权衡",
        scenario: "当追求自己的'好东西'意味着可能孤独或不被理解时...",
        suggestedModule: "explore",
        responses: [
          {
            id: "sacrifice",
            text: "放弃想要的，换取不那么孤独",
            pattern: "用归属感换自我"
          },
          {
            id: "guilt",
            text: "感到内疚和矛盾，一边追求一边担心",
            pattern: "自我分裂的状态"
          },
          {
            id: "seek",
            text: "主动寻找理解你的人，即使他们很少",
            pattern: "选择性地找支持"
          },
          {
            id: "claim",
            text: "承认孤独可能是代价，决定值不值得",
            pattern: "有意识地权衡"
          }
        ]
      },
      {
        name: "定义自己的'好生活'",
        scenario: "当你需要为自己定义什么是'好东西'时...",
        suggestedModule: "action",
        responses: [
          {
            id: "blank",
            text: "不知道，一直活在别人的定义里",
            pattern: "缺乏自我定义"
          },
          {
            id: "hedge",
            text: "有想法但还在模糊的阶段，怕说出来显得任性",
            pattern: "想法未成熟"
          },
          {
            id: "experiment",
            text: "通过尝试不同的东西来看什么真的对我重要",
            pattern: "探索式的确认"
          },
          {
            id: "articulate",
            text: "能清楚说出自己想要什么，并为此负责",
            pattern: "清晰和主权"
          }
        ]
      }
    ]
  },

  joy: {
    roleId: "joy",
    coreTheme: "在虚无感中寻找意义，接纳存在的荒诞",
    tensions: [
      {
        name: "意义崩塌与虚无感",
        scenario: "当你意识到很多你曾认为重要的东西可能都没有意义时...",
        suggestedModule: "enter",
        responses: [
          {
            id: "panic",
            text: "陷入恐慌，想要赶快找到新的'意义'来替代",
            pattern: "对虚无的恐惧驱动行动"
          },
          {
            id: "numb",
            text: "感到麻木，什么都做，但不真正在乎",
            pattern: "虚无的逃避"
          },
          {
            id: "question",
            text: "停下来问问这个虚无感到底告诉我什么",
            pattern: "好奇而非抗拒"
          },
          {
            id: "sit",
            text: "允许自己在这个不安中停留一会儿",
            pattern: "有耐心的陪伴"
          }
        ]
      },
      {
        name: "理性与感受的悖论",
        scenario: "当你知道某件事'逻辑上没意义'，但你仍然想去做时...",
        suggestedModule: "explore",
        responses: [
          {
            id: "suppress",
            text: "压抑冲动，按理性行动",
            pattern: "理性压制感受"
          },
          {
            id: "split",
            text: "一部分自己执行理性，另一部分自己反叛",
            pattern: "内部冲突"
          },
          {
            id: "integrate",
            text: "承认两者都真实，找到某种平衡",
            pattern: "整合而非二元"
          },
          {
            id: "embrace",
            text: "接纳荒诞，有时做'无意义'的事就是意义本身",
            pattern: "对矛盾的接纳"
          }
        ]
      },
      {
        name: "连接与虚无的对立",
        scenario: "当你想要真实连接，但又怀疑一切连接的真实性时...",
        suggestedModule: "action",
        responses: [
          {
            id: "isolate",
            text: "放弃连接，保护自己不被虚无吞没",
            pattern: "通过隔离来避免失望"
          },
          {
            id: "perform",
            text: "进行连接，但知道这可能都是幻觉",
            pattern: "虚无中的参与"
          },
          {
            id: "vulnerable",
            text: "允许真实连接，即使知道它可能是短暂的",
            pattern: "明知无常仍然投入"
          },
          {
            id: "transcend",
            text: "发现也许意义就在于这个连接的过程本身",
            pattern: "过程即意义"
          }
        ]
      }
    ]
  }
};

/**
 * 根据角色ID获取其张力配置
 */
export function getRoleConfiguration(roleId: string): RoleConfiguration | undefined {
  return ROLE_TENSIONS[roleId];
}

/**
 * 根据角色和模块，选择一个合适的张力
 */
export function selectTensionByModule(
  roleId: string,
  module: "enter" | "explore" | "action"
): RelationalTension | undefined {
  const config = getRoleConfiguration(roleId);
  if (!config) return undefined;

  // 过滤出建议在此模块出现的张力
  const matching = config.tensions.filter((t) => t.suggestedModule === module);
  if (matching.length === 0) return undefined;

  // 随机选择一个
  return matching[Math.floor(Math.random() * matching.length)];
}
