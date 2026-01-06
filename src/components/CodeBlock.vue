<template>
  <div class="custom-code-block" :class="{ 'is-dark': isDark }">
    <!-- 自定义头部 -->
    <div class="code-header">
      <div class="code-header-left">
        <span class="language-badge">{{ displayLanguage }}</span>
      </div>
      <div class="code-header-right">
        <div class="action-btn" @click="handleCopy" :title="copied ? '已复制' : '复制代码'">
          <svg v-if="!copied" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span class="action-text">{{ copied ? '已复制' : '复制' }}</span>
        </div>
      </div>
    </div>
    
    <!-- 代码内容 -->
    <div class="code-content-wrapper">
      <!-- 行号容器 -->
      <div class="line-numbers" :class="{ 'is-dark': isDark }">
        <div
          v-for="lineNum in lineNumbers"
          :key="lineNum"
          class="line-number"
        >
          {{ lineNum }}
        </div>
      </div>
      <!-- 代码内容 -->
      <div class="code-content">
        <MarkdownCodeBlockNode
          :node="normalizedNode"
          :show-header="false"
          :themes="themes"
          :dark-theme="darkTheme"
          :light-theme="lightTheme"
          :is-dark="isDark"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import { MarkdownCodeBlockNode } from 'markstream-vue'

const props = defineProps({
  node: {
    type: Object,
    required: true,
  },
  isDark: {
    type: Boolean,
    default: false,
  },
})

const themes = inject('themes')
console.log(themes)

// 根据 isDark 计算当前应该使用的主题
const currentTheme = computed(() => {
  return props.isDark ? 'one-dark-pro' : 'one-light'
})

// 深色和浅色主题配置
const darkTheme = 'one-dark-pro'
const lightTheme = 'one-light'

// Monaco Editor 配置 - 完全只读模式，但保留语法高亮
const monacoOptions = computed(() => ({
  readOnly: true,
  domReadOnly: true,                     // DOM 层面只读，禁用所有输入
  theme: props.isDark ? darkTheme : lightTheme,  // 根据 isDark 设置主题
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  fontSize: 13,
  lineHeight: 20,
  lineNumbers: 'on',                     // 显示行号
  lineNumbersMinChars: 3,                // 行号最小字符数，确保对齐
  glyphMargin: false,                    // 禁用字形边距
  folding: false,                        // 禁用代码折叠
  wordWrap: 'on',
  automaticLayout: true,
  padding: { top: 8, bottom: 8 },
  scrollbar: {
    vertical: 'auto',
    horizontal: 'auto',
    verticalScrollbarSize: 6,
    horizontalScrollbarSize: 6,
  },
  // 禁用行高亮和选中高亮（但保留语法高亮）
  renderLineHighlight: 'none',           // 禁用当前行高亮
  selectionHighlight: false,             // 禁用选中文本高亮
  occurrencesHighlight: 'off',           // 禁用相同词高亮
  hideCursorInOverviewRuler: true,       // 隐藏光标在概览标尺中
  overviewRulerBorder: false,            // 隐藏概览标尺边框
  overviewRulerLanes: 0,                 // 禁用概览标尺
  renderLineHighlightOnlyWhenFocus: false,
  cursorStyle: 'line-thin',              // 细光标
  cursorBlinking: 'solid',               // 光标不闪烁
  cursorWidth: 0,                        // 完全隐藏光标
  // 禁用交互功能
  contextmenu: false,                    // 禁用右键菜单
  selectionClipboard: false,             // 禁用选择剪贴板
  find: {                                // 禁用查找功能
    addExtraSpaceOnTop: false,
    autoFindInSelection: 'never',
    seedSearchStringFromSelection: 'never',
  },
  links: false,                          // 禁用链接点击
  matchBrackets: 'never',                // 禁用括号匹配高亮
  renderWhitespace: 'none',              // 不渲染空白字符
  quickSuggestions: false,               // 禁用快速建议
  suggestOnTriggerCharacters: false,     // 禁用触发字符建议
  acceptSuggestionOnEnter: 'off',        // 禁用回车接受建议
  tabCompletion: 'off',                  // 禁用 Tab 补全
  parameterHints: { enabled: false },    // 禁用参数提示
  hover: { enabled: false },             // 禁用悬停提示
  dragAndDrop: false,                    // 禁用拖放
  // 注意：不要禁用语法高亮相关的配置，Monaco Editor 会自动进行语法高亮
}))

// 语言显示名称映射
const languageMap: Record<string, string> = {
  js: 'JavaScript',
  ts: 'TypeScript',
  jsx: 'React JSX',
  tsx: 'React TSX',
  py: 'Python',
  rb: 'Ruby',
  go: 'Go',
  rs: 'Rust',
  java: 'Java',
  cpp: 'C++',
  c: 'C',
  cs: 'C#',
  php: 'PHP',
  swift: 'Swift',
  kt: 'Kotlin',
  sql: 'SQL',
  sh: 'Shell',
  bash: 'Bash',
  zsh: 'Zsh',
  yml: 'YAML',
  yaml: 'YAML',
  json: 'JSON',
  xml: 'XML',
  html: 'HTML',
  css: 'CSS',
  scss: 'SCSS',
  less: 'Less',
  md: 'Markdown',
  vue: 'Vue',
  svelte: 'Svelte',
}

// Shiki 语言标识符映射（将缩写映射到 Shiki 支持的语言 ID）
const shikiLanguageMap: Record<string, string> = {
  js: 'javascript',
  javascript: 'javascript',
  ts: 'typescript',
  typescript: 'typescript',
  jsx: 'jsx',
  tsx: 'tsx',
  py: 'python',
  python: 'python',
  rb: 'ruby',
  ruby: 'ruby',
  go: 'go',
  golang: 'go',
  rs: 'rust',
  rust: 'rust',
  java: 'java',
  cpp: 'cpp',
  'c++': 'cpp',
  cxx: 'cpp',
  c: 'c',
  cs: 'csharp',
  'c#': 'csharp',
  csharp: 'csharp',
  php: 'php',
  swift: 'swift',
  kt: 'kotlin',
  kotlin: 'kotlin',
  sql: 'sql',
  sh: 'bash',
  bash: 'bash',
  zsh: 'zsh',
  yml: 'yaml',
  yaml: 'yaml',
  json: 'json',
  xml: 'xml',
  html: 'html',
  css: 'css',
  scss: 'scss',
  sass: 'scss',
  less: 'less',
  md: 'markdown',
  markdown: 'markdown',
  vue: 'vue',
  svelte: 'svelte',
  // 其他常见映射
  'js-jsx': 'jsx',
  'ts-tsx': 'tsx',
  shell: 'bash',
  zsh: 'zsh',
  powershell: 'powershell',
  ps1: 'powershell',
  dockerfile: 'dockerfile',
  docker: 'dockerfile',
  makefile: 'makefile',
  make: 'makefile',
  ini: 'ini',
  toml: 'toml',
  diff: 'diff',
  patch: 'diff',
}

// 获取 Shiki 支持的语言标识符
const shikiLanguage = computed(() => {
  const lang = props.node.language?.toLowerCase() || 'text'
  return shikiLanguageMap[lang] || lang
})

// 创建修改后的 node 对象，使用 Shiki 支持的语言标识符
const normalizedNode = computed(() => {
  return {
    ...props.node,
    language: shikiLanguage.value,
  }
})

const displayLanguage = computed(() => {
  console.log(props.node)
  const lang = props.node.language?.toLowerCase() || 'text'
  return languageMap[lang] || lang.toUpperCase()
})

// 计算代码行数和行号数组
const codeLines = computed(() => {
  const code = props.node.code || ''
  return code.split('\n')
})

const lineNumbers = computed(() => {
  const lines = codeLines.value
  const maxDigits = String(lines.length).length
  return lines.map((_, index) => {
    const lineNum = index + 1
    // 右对齐，补零（可选）
    return String(lineNum).padStart(maxDigits, ' ')
  })
})

const copied = ref(false)

const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(props.node.code || '')
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}
</script>

<style scoped>
/* ========== Atom One Light 明亮主题 ========== */
/*
  配色参考 https://github.com/atom/one-light-syntax
  base:    #fafafa
  mono-1:  #383a42
  mono-2:  #686b77
  mono-3:  #a0a1a7
  hue-1:   #0184bb (字面量)
  hue-2:   #4078f2 (函数、链接)
  hue-3:   #a626a4 (关键字)
  hue-4:   #50a14f (字符串)
  hue-5:   #e45649 (标签名、删除)
  hue-6:   #986801 (属性、数字)
  hue-6-2: #c18401 (类名)
*/
.custom-code-block {
  --code-bg: #fafafc;
  --code-border: #e5e7eb;
  --code-header-bg: #fafafc;
  --code-text: #19224A;
  --code-text-muted: #a0a1a7;
  --code-badge-bg: #f0f0f2;
  --code-badge-text: #686b77;
  --code-btn-hover: #e8e8ea;
  --code-line-number: #404050;
  --code-line-number-bg: #fafafc;
  --code-content-color: #19224A;

  margin: 16px 0;
  border-radius: 8px;
  border: 1px solid var(--code-border);
  background: var(--code-bg);
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 深色主题 */
.custom-code-block.is-dark {
  --code-bg: #1e1e1e;
  --code-border: #3e3e42;
  --code-header-bg: #2d2d30;
  --code-text: #d4d4d4;
  --code-text-muted: #858585;
  --code-badge-bg: #3e3e42;
  --code-badge-text: #cccccc;
  --code-btn-hover: #3e3e42;
  --code-line-number: #6b7280;
  --code-line-number-bg: #252526;
}

/* 头部 */
.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--code-header-bg);
  border-bottom: 1px solid var(--code-border);
}

.code-header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.language-badge {
  font-size: 12px;
  font-weight: 500;
  color: var(--code-badge-text);
  /* background: var(--code-badge-bg); */
  /* padding: 2px 8px; */
  border-radius: 4px;
}

.code-header-right {
  display: flex;
  align-items: center;
  gap: 4px;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  font-size: 12px;
  color: var(--code-text-muted);
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s ease;
}


.action-text {
  font-size: 12px;
}

/* 代码内容包装器 - 使用 flex 布局 */
.code-content-wrapper {
  display: flex;
  position: relative;
  overflow: hidden;
}

/* 代码内容包装器 hover 时显示滚动条 */
.code-content-wrapper:hover .code-content {
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

.custom-code-block.is-dark .code-content-wrapper:hover .code-content {
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}

/* 行号容器 */
.line-numbers {
  flex-shrink: 0;
  padding: 8px;
  background-color: var(--code-line-number-bg);
  /* border-right: 1px solid var(--code-border); */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  font-family: 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', monospace;
  font-size: 13px;
  line-height: 20px;
  text-align: center;
  box-sizing: border-box;
  min-width: 48px;
  color: var(--code-line-number);
}

.line-number {
  height: 20px;
  color: var(--code-line-number);
  font-variant-numeric: tabular-nums; /* 等宽数字，确保对齐 */
}

/* 代码内容区域 */
.code-content {
  flex: 1;
  position: relative;
  overflow: auto;
  padding: 8px;
  background-color: var(--code-bg);
  /* 滚动条样式 - 默认隐藏 */
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}

/* 滚动条 hover 时显示 */
.code-content:hover {
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

/* WebKit 浏览器滚动条样式 */
.code-content::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.code-content::-webkit-scrollbar-track {
  background: transparent;
}

.code-content::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 4px;
  transition: background 0.2s ease;
}

.code-content:hover::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
}

.code-content:hover::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

/* 深色主题滚动条 */
.custom-code-block.is-dark .code-content:hover {
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}

.custom-code-block.is-dark .code-content:hover::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}

.custom-code-block.is-dark .code-content:hover::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* 覆盖 Monaco Editor 内部样式 */
.code-content :deep(.code-block-container) {
  margin: 0 !important;
  border: none !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  overflow: auto;
}

.code-content :deep(.code-block-content) {
  background: transparent !important;
}

/* 浅色主题 Monaco 背景 */
/* .custom-code-block:not(.is-dark) :deep(.monaco-editor),
.custom-code-block:not(.is-dark) :deep(.monaco-editor .monaco-editor-background),
.custom-code-block:not(.is-dark) :deep(.monaco-editor .margin) {
  background-color: var(--code-bg) !important;
} */

/* 深色主题 Monaco 背景 */
/* .custom-code-block.is-dark :deep(.monaco-editor),
.custom-code-block.is-dark :deep(.monaco-editor .monaco-editor-background),
.custom-code-block.is-dark :deep(.monaco-editor .margin) {
  background-color: var(--code-bg) !important;
} */

/* 禁用行高亮和选中高亮 */
/* .code-content :deep(.monaco-editor .current-line),
.code-content :deep(.monaco-editor .view-overlays .current-line),
.code-content :deep(.monaco-editor .margin-view-overlays .current-line-margin) {
  background: transparent !important;
  border: none !important;
} */

/* 禁用选中高亮背景 */
/* .code-content :deep(.monaco-editor .selectionHighlight),
.code-content :deep(.monaco-editor .wordHighlight),
.code-content :deep(.monaco-editor .wordHighlightStrong) {
  background: transparent !important;
} */

/* 隐藏光标（只读模式） */
/* .code-content :deep(.monaco-editor .cursor) {
  visibility: hidden !important;
} */

/* 行号样式 - 确保行号可见且样式正确 */
/* .code-content :deep(.monaco-editor .line-numbers),
.code-content :deep(.monaco-editor .margin-view-overlays .line-numbers),
.code-content :deep(.monaco-editor .margin-view-overlays .active-line-number),
.code-content :deep(.monaco-editor .margin-view-overlays .line-number) {
  color: var(--code-line-number) !important;
  font-weight: normal !important;
  font-size: 13px !important;
  text-align: right !important;
  padding-right: 8px !important;
} */

/* 确保行号区域可见 */
/* .code-content :deep(.monaco-editor .margin) {
  background-color: transparent !important;
} */

/* 行号区域背景（可选，如果需要区分） */
/* .code-content :deep(.monaco-editor .margin-view-overlays) {
  background-color: transparent !important;
} */

/* 代码正文默认颜色（不影响语法高亮） */
/* .code-content :deep(.monaco-editor .mtk1) {
  color: var(--code-content-color);
} */

/* 完全禁用文本选择和交互 */
/* .code-content :deep(.monaco-editor .view-lines),
.code-content :deep(.monaco-editor .view-line) {
  user-select: none !important;
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
} */

/* 禁用代码区域的指针事件（保留滚动功能） */
/* .code-content :deep(.monaco-editor .view-lines) {
  pointer-events: none !important;
} */

/* 保留滚动条的交互 */
/* .code-content :deep(.monaco-editor .monaco-scrollable-element),
.code-content :deep(.monaco-editor .monaco-scrollable-element > .scrollbar) {
  pointer-events: auto !important;
} */

:deep(.code-block-render pre.shiki) {
  margin: 0;
  background-color: transparent !important;
  border: none;
}
</style>
