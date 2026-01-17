# 8维度画像系统 - 使用指南

## ✨ 功能概述

每个维度都是独立的一页，包含：
1. **可视化图形** - 独特的 SVG 动态图（光源、重力、根系等8种）
2. **用户表现描述** - 客观陈述，不批判好坏
3. **一句话总结** - 精炼的特质概括
4. **专属图片生成** - 基于总结调用智谱 API 生成像素画

## 🎨 8个维度及其可视化

| 维度 | 可视化隐喻 | 低值 (< 35) | 高值 (> 65) |
|------|-----------|------------|------------|
| 主体感来源 | 光源位置 | 外部光源多 | 内在发光 |
| 归因方向 | 重力方向 | 向内收缩 | 向外扩散 |
| 价值确认路径 | 根系图 | 深而独 | 浅而广 |
| 边界形态 | 容器边缘 | 波浪虚线 | 清晰实线 |
| 欲望可见度 | 窗帘透光 | 完全遮蔽 | 窗户敞开 |
| 情绪处理路径 | 水流状态 | 蓄水池 | 喷泉 |
| 责任分布 | 天平负重 | 平衡 | 一侧沉重 |
| 抵抗方式 | 障碍形态 | 绕路回避 | 穿透抽离 |

## 🚀 如何使用

### 访问测试页面
```
http://localhost:5173/report-test
```

### 操作方式
1. **点击圆点** - 快速跳转到任意维度
2. **左右按钮** - 逐页浏览
3. **触摸滑动** - 移动端左右滑动切换
4. **生成图片** - 点击"生成专属画面"按钮

## 📂 文件结构

```
src/
├── components/
│   ├── DimensionCarousel.vue          # 维度轮播容器
│   ├── DimensionPage.vue              # 单个维度页面
│   └── dimensions/                     # 8种可视化组件
│       ├── LightSourceVisual.vue      # ① 光源
│       ├── GravityVisual.vue          # ② 重力
│       ├── RootsVisual.vue            # ③ 根系
│       ├── BoundaryVisual.vue         # ④ 边界
│       ├── CurtainVisual.vue          # ⑤ 窗帘
│       ├── WaterPathVisual.vue        # ⑥ 水流
│       ├── ScaleVisual.vue            # ⑦ 天平
│       └── ObstacleVisual.vue         # ⑧ 障碍
├── journey/types.ts                   # 扩展的 Dimension 类型
├── llm/
│   └── mockData.ts                    # 详细的维度数据
└── views/
    └── ReportView.vue                 # 集成轮播组件
```

## 🎯 维度数据结构

```typescript
interface Dimension {
  id: string;              // 唯一标识
  name: string;            // 维度名称
  value: number;           // 0-100 的数值
  description: string;     // 维度说明
  visualMetaphor: string;  // 视觉隐喻
  userBehavior: string;    // 用户具体表现（客观陈述）
  summary: string;         // 一句话总结
  imagePrompt?: string;    // 图片生成提示词
  imageUrl?: string;       // 生成的图片 URL
}
```

## ✏️ 自定义维度数据

编辑 [src/llm/mockData.ts](src/llm/mockData.ts#L95-L150)：

```typescript
{
  id: "agency_source",
  name: "主体感来源",
  value: 35,  // 修改数值会改变可视化
  userBehavior: "你的具体表现...",  // 客观陈述
  summary: "一句话总结",
  imagePrompt: "图片描述，像素风格",
}
```

## 🎨 可视化设计原则

1. **动态响应** - 所有 SVG 根据 value 值动态变化
2. **动画效果** - 使用 CSS `animate` 增加生动感
3. **色彩一致** - 统一使用蓝紫色调
4. **可访问性** - 提供 aria-label 和键盘导航

## 🖼️ 图片生成流程

```mermaid
用户点击按钮
    ↓
读取 dimension.summary
    ↓
调用智谱 API (cogview-3)
    ↓
生成像素风可爱图像
    ↓
显示在页面 + 保存到 dimension.imageUrl
```

## 🔧 API 配置

确保 `.env.local` 配置正确：

```env
VITE_ZHIPU_API_KEY=your-key-here
VITE_ZHIPU_API_BASE=https://open.bigmodel.cn/api/paas/v4
VITE_ZHIPU_IMAGE_MODEL=cogview-3
```

## 📱 响应式设计

- **桌面端**：显示完整导航和大图
- **移动端**：优化触摸滑动，缩小间距
- **平板**：自适应布局

## 💡 设计哲学

### 客观陈述，不批判
所有的 `userBehavior` 和 `summary` 都使用：
- ✅ "你倾向于..." 
- ✅ "你的习惯是..."
- ❌ "你应该..."
- ❌ "这是不好的..."

### 示例对比

**批判性（❌）**：
> 你的边界太模糊了，这是不健康的，你需要学会拒绝。

**客观陈述（✅）**：
> 你的边界像水一样柔软，容易被穿透。别人的需求很容易渗透进来，而你的需求却很难明确表达。

## 🎯 未来扩展

- [ ] 导出为 PDF
- [ ] 分享到社交媒体
- [ ] 对比两次测试的变化
- [ ] 添加更多艺术风格选项
- [ ] 维度之间的关联分析图

## 🐛 常见问题

### Q: 图片生成失败？
A: 检查智谱 API Key 是否有效，模型名称是否为 `cogview-3`

### Q: 滑动不流畅？
A: 检查浏览器是否支持 `touch-action` CSS 属性

### Q: 可视化显示不全？
A: 确保 SVG `viewBox` 设置正确，检查父容器宽度

## 📝 贡献指南

添加新的可视化组件：
1. 在 `components/dimensions/` 创建新的 `.vue` 文件
2. 使用 SVG 绘制动态图形
3. 接收 `value` prop 并响应式渲染
4. 在 `DimensionPage.vue` 中注册组件

---

享受探索你的内在画像吧！✨
