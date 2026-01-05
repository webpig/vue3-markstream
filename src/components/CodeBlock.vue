<template>
  <div class="custom-code-block" :class="{ 'is-dark': isDark }">
    <!-- 自定义头部 -->
    <div class="code-header">
      <div class="code-header-left">
        <span class="language-badge">{{ displayLanguage }}</span>
      </div>
      <div class="code-header-right">
        <button class="action-btn" @click="handleCopy" :title="copied ? '已复制' : '复制代码'">
          <svg v-if="!copied" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span class="action-text">{{ copied ? '已复制' : '复制' }}</span>
        </button>
      </div>
    </div>

    <!-- 代码内容 -->
    <div class="code-content">
      <CodeBlockNode
        :node="node"
        :show-header="false"
        :monaco-options="monacoOptions"
        :themes="themes"
      />
    </div>
  </div>
</template>
<!-- eslint-disable-next-line vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import { CodeBlockNode } from 'markstream-vue'

const { themes, darkTheme, lightTheme } = inject('codeBlockTheme')
console.log(themes, darkTheme, lightTheme)

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

// Monaco Editor 配置
const monacoOptions = {
  readOnly: true,
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  fontSize: 13,
  lineHeight: 20,
  lineNumbers: 'on',
  wordWrap: 'on',
  automaticLayout: true,
  padding: { top: 12, bottom: 12 },
  scrollbar: {
    vertical: 'hidden',
    horizontal: 'auto',
    verticalScrollbarSize: 6,
    horizontalScrollbarSize: 6,
  },
  // 禁用行高亮和选中高亮
  renderLineHighlight: 'none',           // 禁用当前行高亮
  selectionHighlight: false,             // 禁用选中文本高亮
  occurrencesHighlight: 'off',           // 禁用相同词高亮
  hideCursorInOverviewRuler: true,       // 隐藏光标在概览标尺中
  overviewRulerBorder: false,            // 隐藏概览标尺边框
  overviewRulerLanes: 0,                 // 禁用概览标尺
  renderLineHighlightOnlyWhenFocus: false,
  cursorStyle: 'line-thin',              // 细光标
  cursorBlinking: 'solid',               // 光标不闪烁
}

// 语言映射
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

const displayLanguage = computed(() => {
  const lang = props.node.language?.toLowerCase() || 'text'
  return languageMap[lang] || lang.toUpperCase()
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
  --code-header-bg: #f6f8fa;
  --code-text: #19224A;
  --code-text-muted: #a0a1a7;
  --code-badge-bg: #f0f0f2;
  --code-badge-text: #686b77;
  --code-btn-hover: #e8e8ea;
  --code-line-number: #404050;
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
  padding: 2px 8px;
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

.action-btn:hover {
  /* background: var(--code-btn-hover); */
  /* color: var(--code-text); */
}

.action-text {
  font-size: 12px;
}

/* 代码内容区域 */
.code-content {
  position: relative;
}

/* 覆盖 Monaco Editor 内部样式 */
.code-content :deep(.code-block-container) {
  margin: 0 !important;
  border: none !important;
  border-radius: 0 !important;
  background: transparent !important;
}

.code-content :deep(.code-block-content) {
  background: transparent !important;
}

/* 浅色主题 Monaco 背景 */
.custom-code-block:not(.is-dark) :deep(.monaco-editor),
.custom-code-block:not(.is-dark) :deep(.monaco-editor .monaco-editor-background),
.custom-code-block:not(.is-dark) :deep(.monaco-editor .margin) {
  background-color: var(--code-bg) !important;
}

/* 深色主题 Monaco 背景 */
.custom-code-block.is-dark :deep(.monaco-editor),
.custom-code-block.is-dark :deep(.monaco-editor .monaco-editor-background),
.custom-code-block.is-dark :deep(.monaco-editor .margin) {
  background-color: var(--code-bg) !important;
}

/* 禁用行高亮和选中高亮 */
.code-content :deep(.monaco-editor .current-line),
.code-content :deep(.monaco-editor .view-overlays .current-line),
.code-content :deep(.monaco-editor .margin-view-overlays .current-line-margin) {
  background: transparent !important;
  border: none !important;
}

/* 禁用选中高亮背景 */
.code-content :deep(.monaco-editor .selectionHighlight),
.code-content :deep(.monaco-editor .wordHighlight),
.code-content :deep(.monaco-editor .wordHighlightStrong) {
  background: transparent !important;
}

/* 隐藏光标（只读模式） */
.code-content :deep(.monaco-editor .cursor) {
  visibility: hidden !important;
}

/* 行号固定颜色 */
.code-content :deep(.monaco-editor .line-numbers),
.code-content :deep(.monaco-editor .margin-view-overlays .line-numbers),
.code-content :deep(.monaco-editor .margin-view-overlays .active-line-number) {
  color: var(--code-line-number) !important;
  font-weight: normal !important;
}

/* 代码正文默认颜色（不影响语法高亮） */
.code-content :deep(.monaco-editor .mtk1) {
  color: var(--code-content-color);
}
</style>
