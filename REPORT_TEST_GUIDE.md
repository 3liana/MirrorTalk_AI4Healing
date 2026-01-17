# ReportView 测试模式快速指南

## 🚀 快速启动

访问以下 URL 直接进入 ReportView 测试模式，**无需经过前置界面**：

```
http://localhost:5173/report-test
```

## 什么是测试模式？

- ✅ **跳过所有前置步骤**：不需要选择角色、进行对话
- ✅ **自动加载 Mock 数据**：预生成一份完整的 Mirror Report
- ✅ **立即预览效果**：可以直接修改 ReportView.vue 的外观样式
- ✅ **实时热更新**：保存代码后，浏览器自动刷新展示修改

## 📝 Mock 数据位置

Mock 数据定义在：[src/llm/mockData.ts](src/llm/mockData.ts)

### 快速修改 Mock 数据

如果你想调整报告内容，编辑 `mockReport` 对象：

```typescript
export const mockReport: MirrorReport = {
  headline: "你的标题...",
  thinkingPatterns: [
    // 编辑思维模式...
  ],
  // ...
};
```

修改后会立即在测试页面显示。

## 🎨 开始修改外观

现在你可以直接编辑 [src/views/ReportView.vue](src/views/ReportView.vue) 中的 CSS：

```vue
<style scoped>
.report-view {
  /* 修改背景、颜色、间距等 */
}

.report-header h1 {
  /* 修改标题样式 */
}

.pattern-card {
  /* 修改卡片外观 */
}

/* ... 其他样式 */
</style>
```

## 🔧 浏览器调试

1. 打开浏览器 DevTools（F12）
2. 切换到 Console 标签
3. 你会看到：`🧪 ReportView Test Mode - Mock data loaded`
4. Mock 数据会被打印出来，方便检查

## 📱 常见修改场景

### 改变整体配色
编辑 `.report-view` 的 `background` 属性

### 调整卡片间距
编辑 `.report-section` 和 `.pattern-card` 的 `margin` 和 `padding`

### 修改字体大小
编辑 `.report-header h1`、`h2`、`h3` 的 `font-size`

### 改变动画效果
编辑 `@keyframes fadeIn` 或卡片的 `transition` 属性

## ✨ 小贴士

- **保存快捷键**：Ctrl+S (Windows) 或 Cmd+S (Mac)
- **页面刷新**：浏览器会自动刷新（如果配置了 Vite 热更新）
- **恢复默认**：只需刷新页面，Mock 数据会重新加载
- **查看所有 CSS**：向下滚动 `<style>` 部分查看完整样式

## 🎯 完成后

修改完外观后，如果满意，可以回到正常流程测试（/report 路由）并进行完整的用户体验测试。

## 📌 注意

- Mock 数据只在 `/report-test` 路由激活
- 普通 `/report` 路由仍需完整的对话流程
- 生产环境中应移除测试路由或添加认证保护
