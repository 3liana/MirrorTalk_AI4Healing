/**
 * Zod Schema for 数据验证
 */

import { z } from "zod";

export const ChoiceCardSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  intent: z.string(),
  weight: z.number().optional(),
});

export const TurnInteractionSchema = z.object({
  type: z.enum(["single_choice", "multi_choice", "short_comment", "choice_plus_comment"]),
  prompt: z.string(),
  maxCommentChars: z.number().optional().default(80),
  choices: z.array(ChoiceCardSchema).optional(),
  minSelect: z.number().optional().default(1),
  maxSelect: z.number().optional().default(1),
});

export const MemoryPatchSchema = z.object({
  clues: z.array(z.string()).optional(),
  shouldStatements: z.array(z.string()).optional(),
  needs: z.array(z.string()).optional(),
});

export const EndConditionSchema = z.object({
  canEnd: z.boolean(),
  reason: z.string().optional(),
});

export const TurnSpecSchema = z.object({
  turnIndex: z.number(),
  module: z.enum(["enter", "explore", "action"]),
  roleText: z.string(),
  interaction: TurnInteractionSchema,
  probeTag: z.string(),
  gentleWhy: z.string().optional(),
  memoryPatch: MemoryPatchSchema.optional(),
  endCondition: EndConditionSchema.optional(),
  sceneImage: z.string().optional(), // 好东西场景图片
});

export const MicroActionSchema = z.object({
  title: z.string(),
  why: z.string(),
  how: z.string(),
  timeCost: z.string(),
});

export const ResourceSchema = z.object({
  type: z.enum(["book", "podcast", "community"]),
  title: z.string(),
  note: z.string(),
});

export const MirrorReportSchema = z.object({
  headline: z.string(),
  thinkingPatterns: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      exampleFromYou: z.string(),
    })
  ),
  overlookedNeeds: z.array(
    z.object({
      need: z.string(),
      howItShowsUp: z.string(),
      gentleReminder: z.string(),
    })
  ),
  microActions: z.array(MicroActionSchema).length(3),
  closingLetter: z.string(),
  resources: z.array(ResourceSchema).optional(),
});

export type TurnSpec = z.infer<typeof TurnSpecSchema>;
export type MirrorReport = z.infer<typeof MirrorReportSchema>;
