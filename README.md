# 光影识人 - Mirror Me

## AI自我觉察对话工具

一个基于Vue3 + LangChain.js的沉浸式AI对话应用，帮助用户通过与虚构电影角色的对话来进行自我觉察。

### 核心特性

- **沉浸式对话旅程**：15-20分钟的互动式对话体验，而非传统聊天窗口
- **打字机效果**：角色文本逐字出现，营造电影般的沉浸感
- **3个模块渐进探索**：
  - 共鸣进入（建立安全距离）
  - 温和追问（识别"应该"和真实需求）
  - 行动落地（转化为可执行的micro-action）
- **智能报告生成**：生成个性化的Mirror Report，包含思维模式分析和3个可执行的行动建议
- **容错降级**：当LLM调用失败时自动使用本地模板

### 技术栈

- **前端框架**：Vue 3 + TypeScript
- **构建工具**：Vite
- **状态管理**：Pinia
- **数据验证**：Zod
- **AI编排**：LangChain.js（OpenAI API兼容）
- **美学设计**：Vision Pro玻璃美学 + CSS Glassmorphism 3.0

### 快速开始

#### 1. 安装依赖

```bash
npm install
```

#### 2. 配置环境变量

```bash
# 复制 .env.example 到 .env.local
cp .env.example .env.local

# 编辑 .env.local，添加你的 OpenAI API Key
VITE_OPENAI_API_KEY=sk-xxx
```

#### 3. 启动开发服务器

```bash
npm run dev
```

打开浏览器访问 `http://localhost:5173`

### 项目结构

```
src/
├── roles/              # 预定义角色
├── journey/            # 类型定义和状态
├── chain/              # LangChain 引擎
├── llm/                # LLM 客户端
├── stores/             # Pinia 状态管理
├── components/         # Vue 组件
├── views/              # 页面视图
├── router.ts           # 路由
├── main.ts             # 入口
└── styles.css          # 全局样式
```

### 核心流程

1. 用户在首页选择角色
2. 初始化沉浸式对话旅程（12轮）
3. 每轮展示角色文本 + 用户交互（选择/评论）
4. 旅程结束后生成个性化 Mirror Report
5. 报告包含思维模式分析、3个micro-action、温暖的收尾信

### 环境变量

```
VITE_OPENAI_API_KEY=sk-your-key      # 必须
VITE_OPENAI_API_BASE=https://...    # 可选，默认 OpenAI
VITE_OPENAI_MODEL=gpt-3.5-turbo     # 可选
```

### 注意事项

- ⚠️ 这是前端 Demo，API Key 会暴露在客户端
- 生产环境建议使用后端代理保护 API Key
- 用户数据完全在浏览器本地处理

### 浏览器支持

- Chrome/Edge (最新版本)
- Firefox (最新版本)
- Safari (最新版本)

