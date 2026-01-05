# Monaco Editor 主题注册指南

## 📚 概述

本项目已配置了 Monaco Editor 主题注册系统，支持使用内置主题和注册第三方主题（如 Atom One Light、GitHub Light 等）。

## 🎨 已注册的主题

### 明亮主题
- **`atom-one-light`** ⭐ 推荐 - Atom One Light 主题，明亮鲜艳的配色
- **`github-light`** - GitHub Light 主题
- **`vs`** - Visual Studio Light（Monaco 内置）

### 深色主题
- **`atom-one-dark`** - Atom One Dark 主题
- **`vs-dark`** - Visual Studio Dark（Monaco 内置）

## 🚀 使用方法

### 1. 在 App.vue 中配置主题

```typescript
const codeBlockConfig = {
  isDark: false, // false = 明亮主题, true = 深色主题
  codeBlockLightTheme: 'atom-one-light', // 明亮主题名称
  codeBlockDarkTheme: 'atom-one-dark',   // 深色主题名称
  // ... 其他配置
}
```

### 2. 主题自动注册

主题会在应用启动时自动注册：
- `main.js` 中会尝试注册所有主题
- `App.vue` 的 `onMounted` 钩子中会再次确保主题已注册

## 📝 添加新主题

### 步骤 1: 在 `src/utils/monacoThemes.ts` 中添加主题函数

```typescript
export async function registerMyCustomTheme() {
  try {
    const monaco = await waitForMonaco()
    
    monaco.editor.defineTheme('my-custom-theme', {
      base: 'vs', // 或 'vs-dark'
      inherit: true,
      rules: [
        { token: 'keyword', foreground: 'ff0000', fontStyle: 'bold' },
        { token: 'string', foreground: '00ff00' },
        // ... 更多规则
      ],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#000000',
        // ... 更多颜色配置
      }
    })
    
    console.log('✅ My Custom Theme 主题注册成功')
  } catch (error) {
    console.error('❌ 注册主题失败:', error)
  }
}
```

### 步骤 2: 在 `registerAllThemes()` 函数中添加

```typescript
export async function registerAllThemes() {
  await Promise.all([
    registerAtomOneLightTheme(),
    registerAtomOneDarkTheme(),
    registerGitHubLightTheme(),
    registerMyCustomTheme(), // 添加新主题
  ])
}
```

### 步骤 3: 在 App.vue 中使用新主题

```typescript
codeBlockLightTheme: 'my-custom-theme',
```

## 🎯 主题规则说明

### `rules` 数组
定义语法元素的颜色和样式：
- `token`: 语法标记类型（如 `keyword`, `string`, `comment` 等）
- `foreground`: 前景色（十六进制，不带 `#`）
- `fontStyle`: 字体样式（`bold`, `italic`, `underline` 等）

### `colors` 对象
定义编辑器整体的颜色配置：
- `editor.background`: 编辑器背景色
- `editor.foreground`: 编辑器前景色（默认文本颜色）
- `editor.lineHighlightBackground`: 当前行高亮背景
- `editor.selectionBackground`: 选中文本背景
- `editorCursor.foreground`: 光标颜色
- `editorLineNumber.foreground`: 行号颜色

## 🔍 调试主题

如果主题没有生效，检查以下几点：

1. **查看控制台日志**
   - 成功：`✅ Atom One Light 主题注册成功`
   - 失败：`❌ 注册主题失败: [错误信息]`

2. **确认 Monaco Editor 已加载**
   - 主题注册需要等待 Monaco Editor 加载完成
   - 如果看到 "无法找到 Monaco Editor" 错误，可能需要增加延迟时间

3. **验证主题名称**
   - 确保 `codeBlockLightTheme` 或 `codeBlockDarkTheme` 的值与注册的主题名称完全一致

4. **检查主题是否已注册**
   ```javascript
   // 在浏览器控制台中运行
   console.log(window.monaco?.editor?.getTheme())
   ```

## 📖 参考资源

- [Monaco Editor 官方文档](https://microsoft.github.io/monaco-editor/)
- [Monaco Editor 主题定义 API](https://microsoft.github.io/monaco-editor/playground.html#customizing-the-appearance)
- [Atom One Light 配色方案](https://github.com/atom/atom/tree/master/packages/one-light-syntax)

## 💡 推荐主题

### 明亮主题推荐
1. **`atom-one-light`** - 明亮鲜艳，适合大多数场景 ⭐
2. **`github-light`** - 简洁清爽，GitHub 风格
3. **`vs`** - 经典 Visual Studio 风格

### 深色主题推荐
1. **`atom-one-dark`** - 护眼深色，配色优秀 ⭐
2. **`vs-dark`** - 经典 Visual Studio 深色

## 🛠️ 故障排除

### 问题：主题注册失败
**解决方案**：
- 增加 `waitForMonaco()` 的重试次数和延迟时间
- 检查 `stream-monaco` 是否正确加载

### 问题：主题名称不生效
**解决方案**：
- 确保主题名称拼写正确（区分大小写）
- 确认主题已在 `registerAllThemes()` 中注册

### 问题：颜色显示不正确
**解决方案**：
- 检查 `rules` 中的 `foreground` 值格式（应为 6 位十六进制，不带 `#`）
- 确认 `base` 主题设置正确（`vs` 或 `vs-dark`）

