# DeepDanci UI

DeepDanci UI 是一个受 Shadcn/UI 启发的 React 和 Tailwind CSS 组件库。它使用复制粘贴的方式，让你可以将组件直接添加到项目中自由定制。

## 特性

- 将组件复制到你的项目中而不是作为依赖安装
- 完全可定制，适合任何设计系统
- 基于 React 和 Tailwind CSS 构建
- 完整 TypeScript 支持

## 安装

```bash
# 从npm安装全局CLI工具
npm install -g deepdanci

# 或者直接通过npx使用
npx deepdanci init
npx deepdanci add Button
npx deepdanci add SiteHeader
npx deepdanci list
```

## 本地开发和安装

要在本地开发或安装 CLI：

```bash
# 克隆仓库
git clone https://github.com/bookmarkbao/deepdanci-ui.git
cd deepdanci-ui

# 安装依赖
npm install

# 构建并本地安装CLI
node install.js

# 或手动安装：
cd cli
npm install
npm run build
npm install -g .  # 全局安装CLI
```

## 可用组件

- Button - 多种样式和尺寸的按钮
- SiteHeader - 响应式网站头部
- (更多组件陆续添加中)

## 工作原理

与传统组件库不同，DeepDanci UI 不是将组件作为依赖项安装，而是直接将组件代码复制到你的项目中，让你可以自由修改和定制。

## 定制化

由于组件被复制到你的项目中，你可以轻松地修改它们以适应你的设计系统。组件使用 Tailwind CSS 进行样式设置，使其易于定制外观和感觉。

## 添加新组件

要向库中添加新组件：

1. 在`components`文件夹中创建一个与组件同名的新目录
2. 添加组件文件(index.tsx 等)
3. 确保为组件提供使用文档

## 贡献

欢迎贡献！请随时提交 Pull Request。

## 许可证

MIT 许可证
