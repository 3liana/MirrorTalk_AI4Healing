# 光影识人 项目开发指南

## 项目概述

这是一个基于 Vue 3 + LangChain.js 的 AI 自我觉察工具，通过与虚构电影角色的对话帮助用户进行深度的自我反思。

## 核心技术栈

- **前端**：Vue 3 + TypeScript + Vite
- **状态管理**：Pinia
- **AI 编排**：LangChain.js
- **数据验证**：Zod
- **路由**：Vue Router 4

## 项目架构

### 页面流

1. **LandingView** (`/`) - 首页介绍
2. **RoleSelectView** (`/role`) - 角色选择
3. **JourneyView** (`/journey`) - 对话旅程（核心）
4. **ReportView** (`/report`) - 最终报告

### 核心模块

- `src/journey/` - 类型定义和状态管理
- `src/chain/` - LangChain 引擎（轮次生成、报告生成）
- `src/stores/` - Pinia 全局状态
- `src/roles/` - 预定义角色库
- `src/components/` - 可复用的 UI 组件
- `src/views/` - 页面级别的组件

## 关键设计原则

### 1. 对话流程

- **轮数**：默认 12 轮，最多 15 轮
- **模块**：3 个模块渐进（enter → explore → action）
- **交互类型**：single_choice, choice_plus_comment, short_comment

### 2. 数据约束

- 每轮 `roleText` 必须 120-220 字
- 选择卡片 3-5 个
- `memoryPatch` 用于提取关键洞察

### 3. 美学

- Vision Pro Glassmorphism 3.0 设计语言
- 暗色电影风格
- 打字机动画营造沉浸感

## 开发指南

### 添加新角色

编辑 `src/roles/roles.ts`：

```typescript
{
  id: "new_character",
  name: "Character Name",
  movie: "Movie/Series",
  vibeTags: ["tag1", "tag2"],
  introHook: "Opening line",
  safetyFrame: "Safety frame",
}
```

### 自定义对话逻辑

1. **轮次生成**：编辑 `src/chain/prompts.ts` 的 `getTurnGeneratorPrompt()`
2. **报告生成**：编辑 `src/chain/prompts.ts` 的 `getReportGeneratorPrompt()`
3. **模块划分**：修改 `src/chain/turnEngine.ts` 的 `getModule()` 函数

### 调整对话参数

在 `src/stores/journey.ts` 中：

- 修改 `maxTurns` 调整总轮数
- 修改 `minTurnForEarlyEnd` 调整提前结束的最少轮数

## 重要文件说明

| 文件 | 用途 |
|------|------|
| `src/journey/types.ts` | 所有 TypeScript 类型定义 |
| `src/journey/schema.ts` | Zod 验证 Schema（必须保持同步） |
| `src/chain/turnEngine.ts` | 核心：生成下一轮对话的逻辑 |
| `src/chain/reportEngine.ts` | 核心：生成最终报告的逻辑 |
| `src/stores/journey.ts` | 核心：Pinia Store（状态机） |
| `src/components/TypewriterText.vue` | 打字机效果核心组件 |

## 环境设置

### 必需的环境变量

```
VITE_OPENAI_API_KEY=sk-xxxxx  # OpenAI API Key
```

### 可选环境变量

```
VITE_OPENAI_API_BASE=https://api.openai.com/v1
VITE_OPENAI_MODEL=gpt-3.5-turbo
```

## 常见开发任务

### 修改提示词

编辑 `src/chain/prompts.ts` 中的提示词模板。重点关注：
- 角色性格的一致性
- "应该"和真实需求的识别
- 故事隐喻的使用

### 调整界面风格

- 主色调：编辑 `src/styles.css` 中的 CSS 变量
- 组件样式：修改各 `.vue` 文件的 `<style>` 部分
- 动画效果：使用 Vue `transition` 或 CSS `@keyframes`

### 处理 LLM 错误

- 自动重试：在 `src/chain/turnEngine.ts` 和 `reportEngine.ts` 中
- Fallback：`src/chain/repair.ts` 提供默认模板
- 用户提示：在 `src/views/JourneyView.vue` 中显示错误信息

## 性能优化建议

1. 对话文本较长时，考虑分段打字
2. 组件使用 `v-if` 和 `v-show` 合理切换
3. 大列表使用虚拟滚动（如需要）
4. 使用 Vite 的代码分割功能

## 调试技巧

1. **查看生成的 TurnSpec**：在浏览器 DevTools Network 中检查 API 响应
2. **验证 Schema**：注意 `schema.ts` 中的 Zod Schema 必须与 `types.ts` 同步
3. **测试 Fallback**：临时注释掉 LLM 调用，观察 fallback 是否正常
4. **检查状态**：使用 Vue DevTools 检查 Pinia Store 的状态变化

## 容错策略详解

```typescript
// 1. 尝试调用 LLM
try {
  result = await callLLM(...)
  // 2. 验证结果 Schema
  validated = TurnSpecSchema.parse(JSON.parse(result))
} catch (error) {
  // 3. 自动重试一次
  retry = await callLLM(...)
  validated = TurnSpecSchema.parse(JSON.parse(retry))
  
  // 4. 仍失败则使用 fallback
  if (retry fails) {
    validated = generateFallbackTurn(...)
  }
}
```

## 安全考虑

⚠️ **重要**：此项目为前端 Demo，API Key 会暴露在客户端代码中。

- **开发环境**：可以直接使用 API Key
- **生产环境**：必须使用后端代理来保护 API Key
- **数据隐私**：所有用户数据在浏览器本地处理，无服务器存储

## 相关资源

- [Vue 3 文档](https://v3.vuejs.org/)
- [Vite 文档](https://vitejs.dev/)
- [Pinia 文档](https://pinia.vuejs.org/)
- [LangChain.js 文档](https://js.langchain.com/)
- [Zod 文档](https://zod.dev/)

## 常见问题

### Q: 如何改变对话的总轮数？
A: 在 `src/stores/journey.ts` 的 `startJourney()` 中修改 `maxTurns` 值。

### Q: 如何添加新的交互类型？
A: 编辑 `src/journey/types.ts` 的 `InteractionType`，然后在 `JourneyView.vue` 中添加新的组件。

### Q: 报告不是我想要的格式？
A: 编辑 `src/chain/prompts.ts` 的 `getReportGeneratorPrompt()`，或修改 `reportEngine.ts` 中的报告格式。

### Q: 如何支持离线模式？
A: 实现本地 fallback 模板库，或预生成一些常见的报告样本。
