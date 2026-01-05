# Vue 3 + MarkStream 项目

这是一个使用 Vue 3 和 markstream-vue 流式渲染引擎的项目。

## 项目特性

- ✅ Vue 3 (使用 Composition API)
- ✅ Vite 构建工具
- ✅ markstream-vue 流式渲染引擎

## 安装依赖

```bash
npm install
```

## 开发

启动开发服务器：

```bash
npm run dev
```

## 构建

构建生产版本：

```bash
npm run build
```

## 预览构建结果

预览生产构建：

```bash
npm run preview
```

## 使用 markstream-vue

markstream-vue 是一个高性能的流式渲染引擎，可以提升页面渲染效率和用户体验。

在组件中使用：

```vue
<script setup>
import MarkStream from 'markstream-vue'

const content = ref('流式内容...')
</script>

<template>
  <MarkStream :content="content" />
</template>
```

## 项目结构

```
vue3-markstream/
├── src/
│   ├── App.vue          # 主应用组件（包含 markstream-vue 示例）
│   ├── main.js          # 应用入口
│   └── components/      # 组件目录
├── public/              # 静态资源
└── package.json         # 项目配置
```

## 更多信息

- [Vue 3 文档](https://vuejs.org/)
- [Vite 文档](https://vite.dev/)
- [markstream-vue GitHub](https://github.com/markstream/markstream-vue)
