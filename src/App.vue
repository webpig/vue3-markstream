<script setup lang="ts">
  import { ref, h, provide } from 'vue'
  import MarkdownRender, { setCustomComponents } from 'markstream-vue'
  import 'markstream-vue/index.css'
  import CodeBlock from './components/CodeBlock.vue'
  import { markdownContent as markdownContent1 } from './model/markdownContent'

  const themes = ['one-dark-pro', 'one-light'];
  // const darkTheme = 'material-theme-darker';
  // const lightTheme = 'material-theme-lighter';

  provide('themes', themes)

  // 注册自定义代码块组件
  setCustomComponents({
    code_block: CodeBlock,
  })

  const markdownContent = ref(markdownContent1)
  
  // 代码块配置 - 使用明亮主题
  const codeBlockConfig = {
    // 启用代码块流式渲染
    codeBlockStream: true,
    // 启用浅色模式（明亮主题）
    isDark: false,
    // 代码块主题配置（Monaco Editor 主题）
    codeBlockDarkTheme: 'vs-dark',
    codeBlockLightTheme: 'atom-one-light', // 使用注册的 Atom One Light 主题
    // Monaco Editor 选项
    codeBlockMonacoOptions: {
      readOnly: true,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontSize: 14,
      lineNumbers: 'on',
      wordWrap: 'on',
      automaticLayout: true,
    },
    // 代码块属性配置
    codeBlockProps: {
      showHeader: true,
      showCopyButton: true,
      showExpandButton: true,
      showPreviewButton: false,
      showFontSizeButtons: false,
    },
    // 确保不使用简单的 pre 标签，而是使用完整的 CodeBlockNode（带 Monaco Editor）
    renderCodeBlocksAsPre: false,
    // 通过 provide 传递主题配置给子组件
    darkTheme: 'vs-dark',
    lightTheme: 'atom-one-light',
  }
  
  const startStream = () => {
    markdownContent.value = ''
    const content = `# Welcome to MarkStream Vue
  
  ## Features
  
  - **Stream rendering**: Real-time markdown display
  - **Syntax highlighting**: Code blocks with beautiful colors
  - **Easy integration**: Simple to use in Vue 3 projects

  ### SQL Code Example
  \`\`\`sql
  SELECT * FROM users;
  SELECT * FROM users WHERE age > 18;
  SELECT * FROM users WHERE age > 18;
  \`\`\`
  
  ### JavaScript Code Example
  
  \`\`\`javascript
  const greeting = "Hello, World!";
  console.log(greeting);
  
  // 这是一个函数示例
  function calculateSum(a, b) {
    return a + b;
  }
  
  const result = calculateSum(5, 3);
  console.log("结果:", result);
  \`\`\`
  
  ### Python Code Example
  
  \`\`\`python
  def greet(name):
      return f"Hello, {name}!"
  
  # 使用示例
  message = greet("MarkStream")
  print(message)
  
  # 列表推导式示例
  numbers = [x * 2 for x in range(10)]
  print(numbers)
  \`\`\`
  
  ### TypeScript Code Example
  
  \`\`\`typescript
  interface User {
    id: number;
    name: string;
    email: string;
  }
  
  const users: User[] = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" }
  ];
  
  function findUser(id: number): User | undefined {
    return users.find(user => user.id === id);
  }
  
  const user = findUser(1);
  console.log(user?.name);
  \`\`\`
  
  ### CSS Code Example
  
  \`\`\`css
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .button {
    background-color: #42b883;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.75rem 2rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .button:hover {
    background-color: #35a372;
  }
  \`\`\`
  
  ### List Example
  
  1. First item
  2. Second item
  3. Third item
  
  **Enjoy using MarkStream Vue!**`

  const content1 = `# Hello

这是一个测试页面。左侧编辑输入，右侧实时预览渲染结果。

示例包含：

  - **加粗**、*斜体*、\`inline code\`

强调链接：
- **[DR (Danmarks Radio)](https://www.dr.dk/nyheder)**
- **[DR **(Danmarks Radio)](https://www.dr.dk/nyheder)**
- **[DR (Danmarks Radio)**](https://www.dr.dk/nyheder)**
- **[DR **(Danmarks Radio)**](https://www.dr.dk/nyheder)**

- 代码块：

\`\`\`js
console.log('hello')
\`\`\`

数学：$$E=mc^2$$
Mermaid 示例：

\`\`\`mermaid
graph TD
  A-->B
\`\`\`
`;
  
    let index = 0
    const interval = setInterval(() => {
      if (index < content.length) {
        markdownContent.value += content[index]
        index++
      } else {
        clearInterval(interval)
      }
    }, 20)
  }
  </script>
  
  <template>
    <div class="container">
      <h1>MarkStream Vue Demo</h1>
      <button @click="startStream" class="start-btn">Start Stream</button>
      <div class="markdown-container markstream-vue">
        <MarkdownRender 
          :content="markdownContent"
          :themes="themes"
        />
      </div>
    </div>
  </template>
  
  <style scoped>
  .container {
    max-width: 800px;
    padding: 2rem;
  }
  
  h1 {
    text-align: left;
    margin-bottom: 2rem;
  }
  
  .start-btn {
    display: inline-block;
    margin-bottom: 2rem;
    padding: 0.75rem 2rem;
    font-size: 1rem;
    background-color: #42b883;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .start-btn:hover {
    background-color: #35a372;
  }
  
  .markdown-container {
    background-color: #fff;
    border-radius: 8px;
    padding: 2rem;
    min-height: 300px;
    color: black;
    text-align: left;
  }

  /* 表格样式 */
  .markdown-container :deep(table) {
    border-collapse: collapse;
    width: 100%;
    margin: 16px 0;
    border: 1px solid #e5e7eb;
  }

  .markdown-container :deep(table th),
  .markdown-container :deep(table td) {
    border: 1px solid #e5e7eb;
    padding: 8px 12px;
    text-align: left;
  }

  .markdown-container :deep(table th) {
    background-color: #f6f8fa;
    font-weight: 600;
  }

  .markdown-container :deep(table tr:nth-child(even)) {
    background-color: #fafafa;
  }

  .markdown-container :deep(table tr:hover) {
    background-color: #f3f4f6;
  }

  /* 内联代码样式 */
  .markdown-container :deep(code:not(pre code)) {
    background-color: #f6f8fa;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    padding: 2px 6px;
    font-family: 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', monospace;
    font-size: 0.9em;
    /* color: #e83e8c; */
  }

  /* 确保代码块内的 code 标签不受影响 */
  .markdown-container :deep(pre code) {
    background-color: transparent;
    border: none;
    padding: 0;
    color: inherit;
  }
  
  /* 代码块样式增强 */
  /* .markdown-container :deep(pre) {
    background-color: #f6f8fa;
    border: 1px solid #e1e4e8;
    border-radius: 6px;
    padding: 16px;
    overflow-x: auto;
    font-size: 14px;
    line-height: 1.45;
    margin: 16px 0;
  }
  
  .markdown-container :deep(code) {
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
    font-size: 85%;
  }
  
  .markdown-container :deep(pre code) {
    display: block;
    padding: 0;
    background: transparent;
    border: none;
    color: #24292e;
  } */
  
  /* Monaco Editor 容器样式 */
  /* .markdown-container :deep(.monaco-editor) {
    border-radius: 6px;
    overflow: hidden;
  }
  
  .markdown-container :deep(.monaco-editor .monaco-editor-background) {
    background-color: #ffffff;
  } */
  
  /* 代码块容器样式 */
  /* .markdown-container :deep([class*="code-block"]) {
    border-radius: 6px;
    overflow: hidden;
    margin: 16px 0;
    border: 1px solid #e1e4e8;
  }
   */
  /* 代码块头部样式 */
  /* .markdown-container :deep([class*="code-block-header"]) {
    background-color: #f6f8fa;
    border-bottom: 1px solid #e1e4e8;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  } */
  
  /* 行号样式 */
  /* .markdown-container :deep(.monaco-editor .margin) {
    background-color: #fafbfc;
  } */
  
  /* 代码内容区域 */
  /* .markdown-container :deep(.monaco-editor .monaco-editor-background) {
    background-color: #ffffff;
  } */
  </style>
  