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
  downloadComponentFromGitHub,
  getComponentsDir,
} from "../utils";

const execAsync = promisify(exec);

export interface AddOptions {
  output: string;
  yes: boolean;
}

export async function add(
  componentName: string,
  options: AddOptions
): Promise<void> {
  const spinner = ora("Adding component...").start();

  try {
    // 1. Validate component exists
    let isValid = await validateComponent(componentName);

    // 如果本地找不到组件，尝试从GitHub下载
    if (!isValid) {
      spinner.text = `Component not found locally. Trying to download from GitHub...`;

      try {
        // 格式化组件名称
        const normalizedName = componentName.toLowerCase();
        const prefixedName = normalizedName.startsWith("dp-")
          ? normalizedName
          : `dp-${normalizedName}`;

        // 尝试从GitHub下载组件
        const downloadedComponentPath = await downloadComponentFromGitHub(
          prefixedName
        );

        // 复制到本地components目录
        const componentsDir = getComponentsDir();
        const targetComponentDir = path.join(componentsDir, prefixedName);
        await fs.ensureDir(path.dirname(targetComponentDir));
        await fs.copy(downloadedComponentPath, targetComponentDir);

        // 再次检查组件是否有效
        isValid = await validateComponent(componentName);
      } catch (error) {
        // 下载失败，继续使用原来的错误流程
        console.log(
          `Download failed: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
      }
    }

    // 如果组件仍然无效，则退出
    if (!isValid) {
      spinner.fail(`Component ${chalk.cyan(componentName)} not found`);
      process.exit(1);
    }

    // 格式化组件名称
    const formattedName = formatComponentName(componentName);

    // 2. Get component files
    const componentDir = await getComponentDir(componentName);
    const files = await getComponentFiles(componentDir);

    // 3. Create output directory if it doesn't exist
    const outputDir = path.resolve(process.cwd(), options.output);
    const componentOutputDir = path.join(outputDir, formattedName.kebabCase);
    await fs.ensureDir(componentOutputDir);

    // 4. Copy files
    for (const file of files) {
      const srcPath = path.join(componentDir, file);
      const destPath = path.join(componentOutputDir, file);

      // Create subdirectories if needed
      await fs.ensureDir(path.dirname(destPath));

      // Copy the file and ensure it's UTF-8 encoded
      let content = await fs.readFile(srcPath, "utf8");

      // Fix relative imports from utils
      if (content.includes("../utils")) {
        content = content.replace("../utils", "../lib/utils");

        // Ensure utils directory exists
        const utilsDir = path.join(outputDir, "lib");
        await fs.ensureDir(utilsDir);

        // Copy utils file if it doesn't exist
        const utilsDestPath = path.join(utilsDir, "utils.ts");
        if (!(await fs.pathExists(utilsDestPath))) {
          const utilsSrcPath = path.join(componentDir, "..", "utils.ts");
          if (await fs.pathExists(utilsSrcPath)) {
            let utilsContent = await fs.readFile(utilsSrcPath, "utf8");
            await fs.writeFile(utilsDestPath, utilsContent);
            spinner.info(`Created ${chalk.cyan("lib/utils.ts")}`);
          }
        }
      }

      // Write the file with UTF-8 encoding
      await fs.writeFile(destPath, content, "utf8");
    }

    spinner.succeed(
      `Added ${chalk.cyan(formattedName.pascal)} to ${chalk.cyan(
        options.output
      )}`
    );
    console.log(`\n${chalk.green("Import and use the component:")}`);
    console.log(
      `import { ${formattedName.pascal} } from "${path
        .relative("./src", componentOutputDir)
        .replace(/\\/g, "/")}";`
    );
  } catch (error) {
    spinner.fail(`Failed to add component: ${(error as Error).message}`);
    process.exit(1);
  }
}

/**
 * 格式化组件名称为不同的命名格式
 */
function formatComponentName(name: string) {
  // 将名称转换为小写并去除特殊字符
  const normalized = name.toLowerCase().replace(/[^a-z0-9-]/g, "");

  // 提取基本名称（不带前缀）
  let baseName = normalized;
  if (normalized.startsWith("dp-")) {
    baseName = normalized.substring(3); // 移除已有的dp-前缀
  }

  // 转换为 kebab-case（用于目录）并添加 dp- 前缀
  const kebabCase = `dp-${baseName}`;

  // 转换为 PascalCase（用于组件导入）
  const pascal = baseName
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

  return {
    kebabCase,
    pascal,
  };
}
