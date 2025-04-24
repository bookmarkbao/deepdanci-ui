# DeepDanci UI

DeepDanci UI 是一个受 Shadcn/UI 启发的 React 和 Tailwind CSS 组件库。它使用复制粘贴的方式，让你可以将组件直接添加到项目中自由定制。

## 安装

```bash
# 全局安装CLI工具
npm install -g deepdanci

# 或者直接通过npx使用
npx deepdanci list
npx deepdanci add button
```

## 使用指南

### 列出可用目录

```bash
npx deepdanci list
```

这个命令会列出项目根目录下的主要目录（components、lib、hooks 等），你可以将组件添加到这些目录中。

### 添加组件

```bash
# 添加组件到components目录
npx deepdanci add button

# 添加组件到lib目录
npx deepdanci add lib/utils
```

组件的安装路径遵循直接对应关系：

- `npx deepdanci add button` 将组件安装到 `components/button` 目录
- `npx deepdanci add lib/utils` 将组件安装到 `lib/utils` 目录

### 组件的使用

添加组件后，你可以直接在项目中导入并使用：

```jsx
// 导入Button组件
import { Button } from "../components/button";

// 在React组件中使用
function MyComponent() {
  return (
    <Button variant='primary' size='lg'>
      点击我
    </Button>
  );
}
```

## 工作原理

与传统组件库不同，DeepDanci UI 不是将组件作为依赖项安装，而是直接将组件代码复制到你的项目中，让你可以自由修改和定制。CLI 工具会：

1. 首先检查组件是否已在本地项目中存在
2. 如果不存在，会尝试从 GitHub 仓库下载该组件
3. 将组件文件复制到指定的目录中
4. 处理相关依赖关系

## 本地开发

要在本地开发或安装 CLI：

```bash
# 克隆仓库
git clone https://github.com/bookmarkbao/deepdanci-ui.git
cd deepdanci-ui/cli

# 安装依赖
npm install

# 构建CLI
npm run build

# 本地链接（用于测试）
npm link

# 使用本地链接的CLI
npx deepdanci list
```

## 目录结构

添加组件后，你的项目目录结构将类似于：

```
your-project/
├── components/
│   ├── button/
│   │   └── index.tsx
│   └── other-component/
│       └── index.tsx
├── lib/
│   └── utils/
│       └── index.ts
└── hooks/
    └── use-something/
        └── index.ts
```

## 示例用法

```jsx
// 导入多个组件
import { Button } from "../components/button";
import { Card } from "../components/card";
import { useToggle } from "../hooks/use-toggle";

function MyComponent() {
  const [isOpen, toggle] = useToggle(false);

  return (
    <Card>
      <h2>Hello World</h2>
      <p>这是一个示例组件</p>
      <Button onClick={toggle}>{isOpen ? "关闭" : "打开"}</Button>
    </Card>
  );
}
```

## 贡献

欢迎贡献！请随时提交 Pull Request 或 Issues。

## 许可证

MIT 许可证
