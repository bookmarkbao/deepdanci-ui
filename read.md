# 创建类似 Shadcn/UI 的组件系统指南

要创建一个类似 Shadcn/UI 那样的组件系统，让用户可以通过命令行工具（如 `npx deepdanci add SiteHeader`）将组件复制到他们的项目中，您需要构建一个 CLI 工具和组件库。以下是完整的实施步骤：

## 1. 规划项目结构

一个典型的结构如下：

```
deepdanci-ui/
├── cli/                  # CLI工具代码
│   ├── src/
│   └── package.json
├── components/           # 组件定义
│   ├── site-header/
│   ├── button/
│   └── ...
├── styles/               # 共享样式
├── README.md
└── package.json
```

## 2. 创建组件库

首先，创建和设计您的组件。每个组件应该：

- 自包含且可复用
- 有良好的文档
- 遵循一致的设计系统

示例组件结构（对于 `SiteHeader`）：

```
components/site-header/
├── index.tsx            # 主组件文件
├── site-nav.tsx         # 子组件
├── user-menu.tsx        # 子组件
└── README.md            # 使用文档
```

## 3. 开发 CLI 工具

CLI 工具是关键部分，它将组件复制到用户项目中。

### 创建 CLI 项目

```bash
mkdir -p cli
cd cli
npm init -y
```

### 安装必要依赖

```bash
npm install commander inquirer chalk fs-extra glob ora prompts execa
```

### 设置 package.json

```json
{
  "name": "deepdanci",
  "version": "0.1.0",
  "description": "CLI for adding DeepDanci UI components to your project",
  "bin": {
    "deepdanci": "./dist/index.js"
  },
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "dev": "tsup src/index.ts --format cjs,esm --watch --dts",
    "lint": "eslint \"src/**/*.ts\"",
    "clean": "rm -rf dist"
  },
  "files": ["dist"],
  "keywords": ["ui", "components", "cli"],
  "author": "Your Name",
  "license": "MIT"
}
```

### 创建 CLI 主文件 (src/index.ts)

```typescript
#!/usr/bin/env node
import { Command } from "commander";
import { add } from "./commands/add";
import { init } from "./commands/init";
import { list } from "./commands/list";

const program = new Command();

program
  .name("deepdanci")
  .description("CLI for adding DeepDanci UI components to your project")
  .version("0.1.0");

program
  .command("add")
  .description("Add a component to your project")
  .argument("<component>", "Name of the component to add")
  .option("-y, --yes", "Skip confirmation prompt")
  .option("-o, --output <directory>", "Output directory", "./src/components")
  .action(add);

program
  .command("init")
  .description("Initialize your project with DeepDanci UI dependencies")
  .action(init);

program
  .command("list")
  .description("List all available components")
  .action(list);

program.parse();
```

### 实现 `add` 命令 (src/commands/add.ts)

```typescript
import path from "path";
import fs from "fs-extra";
import ora from "ora";
import chalk from "chalk";
import { promisify } from "util";
import { exec } from "child_process";
import {
  getComponentDir,
  getComponentFiles,
  validateComponent,
} from "../utils";

const execAsync = promisify(exec);

export async function add(
  componentName: string,
  options: { output: string; yes: boolean }
) {
  const spinner = ora("Adding component...").start();

  try {
    // 1. Validate component exists
    const isValid = await validateComponent(componentName);
    if (!isValid) {
      spinner.fail(`Component ${chalk.cyan(componentName)} not found`);
      process.exit(1);
    }

    // 2. Get component files
    const componentDir = await getComponentDir(componentName);
    const files = await getComponentFiles(componentDir);

    // 3. Create output directory if it doesn't exist
    const outputDir = path.resolve(process.cwd(), options.output);
    const componentOutputDir = path.join(
      outputDir,
      componentName.toLowerCase()
    );
    await fs.ensureDir(componentOutputDir);

    // 4. Copy files
    for (const file of files) {
      const srcPath = path.join(componentDir, file);
      const destPath = path.join(componentOutputDir, file);
      await fs.copy(srcPath, destPath);
    }

    // 5. Install dependencies if needed
    // (Logic to detect and install dependencies)

    spinner.succeed(
      `Added ${chalk.cyan(componentName)} to ${chalk.cyan(options.output)}`
    );
    console.log(`\n${chalk.green("Import and use the component:")}`);
    console.log(
      `import { ${componentName} } from "${path.relative(
        "./src",
        componentOutputDir
      )}";`
    );
  } catch (error) {
    spinner.fail(`Failed to add component: ${error.message}`);
    process.exit(1);
  }
}
```

### 实现辅助工具 (src/utils/index.ts)

```typescript
import fs from "fs-extra";
import path from "path";
import { glob } from "glob";
import { fileURLToPath } from "url";

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to components directory (this would be in your published package)
const COMPONENTS_DIR = path.join(__dirname, "../../../components");

export async function validateComponent(
  componentName: string
): Promise<boolean> {
  const normalizedName = componentName.toLowerCase();
  const componentDir = path.join(COMPONENTS_DIR, normalizedName);
  return fs.pathExists(componentDir);
}

export async function getComponentDir(componentName: string): Promise<string> {
  const normalizedName = componentName.toLowerCase();
  return path.join(COMPONENTS_DIR, normalizedName);
}

export async function getComponentFiles(
  componentDir: string
): Promise<string[]> {
  const files = await glob("**/*", {
    cwd: componentDir,
    dot: false,
    nodir: true,
    ignore: ["node_modules/**", ".git/**", "README.md", "package.json"],
  });
  return files;
}

export async function getAllComponents(): Promise<string[]> {
  const componentDirs = await fs.readdir(COMPONENTS_DIR);
  return componentDirs.filter(async (dir) => {
    const stat = await fs.stat(path.join(COMPONENTS_DIR, dir));
    return stat.isDirectory();
  });
}
```

## 4. 发布到 GitHub 和 npm

### 创建 GitHub 仓库

创建一个新的 GitHub 仓库，结构如下：

```
.
├── components/           # 您的组件目录
├── cli/                  # CLI工具目录
├── README.md             # 项目文档
├── CONTRIBUTING.md       # 贡献指南
└── LICENSE               # 许可协议
```

### 发布 CLI 到 npm

```bash
cd cli
npm run build
npm publish
```

## 5. 设置 Registry 和 GitHub Actions

您需要一个方式来托管和分发您的组件。有两种主要方法：

### 方法 1: 从 GitHub 仓库直接获取

修改 CLI 工具，使其可以直接从 GitHub 仓库下载组件：

```typescript
// 替换 getComponentDir 函数
export async function getComponentDir(componentName: string): Promise<string> {
  const normalizedName = componentName.toLowerCase();
  const tempDir = path.join(os.tmpdir(), `deepdanci-${Date.now()}`);

  await fs.ensureDir(tempDir);

  // 从 GitHub 下载
  await execAsync(
    `git clone --depth 1 --filter=blob:none --sparse https://github.com/yourusername/deepdanci-ui ${tempDir}`
  );

  // 稀疏检出特定组件
  await execAsync(
    `git -C ${tempDir} sparse-checkout set components/${normalizedName}`,
    { cwd: tempDir }
  );

  return path.join(tempDir, "components", normalizedName);
}
```

### 方法 2: 使用 npm 包

您也可以将所有组件发布为一个 npm 包，然后通过 CLI 从该包中提取组件。

## 6. 创建文档网站

为了展示您的组件库，创建一个类似 [shadcn/ui](https://ui.shadcn.com/) 的文档网站，可以使用 Next.js + Contentlayer 或其他文档工具。

## 7. 完整的用户体验

最终，用户体验应该是：

```bash
# 初始化项目
npx deepdanci init

# 添加组件
npx deepdanci add SiteHeader

# 列出所有可用组件
npx deepdanci list
```

## 8. 真实示例：类 Shadcn 的简化实现

为了给您一个更具体的例子，这里是一个简化的实现：

### CLI 结构

```typescript
// src/index.ts - 入口
#!/usr/bin/env node
import { Command } from 'commander';
import { add } from './commands/add';

const program = new Command();
program
  .name('deepdanci')
  .description('Add DeepDanci UI components to your project')
  .version('0.1.0');

program
  .command('add')
  .description('Add a component to your project')
  .argument('<component>', 'Name of the component')
  .option('-o, --output <directory>', 'Output directory', './src/components')
  .action(add);

program.parse();

// src/commands/add.ts - 添加组件命令
import path from 'path';
import fs from 'fs-extra';
import ora from 'ora';
import { downloadComponent } from '../utils/github';

export async function add(componentName: string, options: { output: string }) {
  const spinner = ora(`Adding ${componentName} component...`).start();

  try {
    // 下载组件
    const componentFiles = await downloadComponent(componentName);

    // 创建输出目录
    const outputDir = path.resolve(process.cwd(), options.output, componentName.toLowerCase());
    await fs.ensureDir(outputDir);

    // 写入文件
    for (const [fileName, content] of Object.entries(componentFiles)) {
      await fs.writeFile(path.join(outputDir, fileName), content);
    }

    spinner.succeed(`Added ${componentName} to ${options.output}`);
  } catch (error) {
    spinner.fail(`Failed to add component: ${error.message}`);
    process.exit(1);
  }
}

// src/utils/github.ts - GitHub 交互
import axios from 'axios';

const REPO_OWNER = 'your-username';
const REPO_NAME = 'deepdanci-ui';
const BRANCH = 'main';

export async function downloadComponent(componentName: string) {
  const normalizedName = componentName.toLowerCase();
  const baseUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/components/${normalizedName}`;

  try {
    const response = await axios.get(baseUrl, {
      params: { ref: BRANCH },
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    });

    const files = {};

    for (const file of response.data) {
      if (file.type === 'file' && !file.name.includes('README')) {
        const fileContent = await axios.get(file.download_url);
        files[file.name] = fileContent.data;
      }
    }

    return files;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error(`Component ${componentName} not found`);
    }
    throw error;
  }
}
```

## 最终建议

1. **渐进式构建**：先从少量核心组件开始，逐步扩展
2. **遵循设计系统**：确保所有组件符合一致的设计语言
3. **详细文档**：为每个组件提供全面的文档和示例
4. **自动化测试**：确保组件质量和兼容性
5. **社区参与**：鼓励社区贡献和反馈

按照这个指南，您可以创建一个类似 Shadcn/UI 的复制式组件库系统，允许用户通过简单的 CLI 命令将组件添加到他们的项目中，而不是通过传统的 npm 包安装。
