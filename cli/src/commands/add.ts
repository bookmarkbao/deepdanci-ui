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
  parseComponentPath,
  getFullComponentPath,
} from "../utils";

const execAsync = promisify(exec);

export interface AddOptions {
  output: string;
  yes: boolean;
}

export async function add(
  componentPath: string,
  options: AddOptions
): Promise<void> {
  const spinner = ora("Adding component...").start();

  try {
    // 1. 解析组件路径
    const { baseDir, componentName } = parseComponentPath(componentPath);

    console.log(`Adding component from ${baseDir}/${componentName}`);

    // 2. 检查组件是否存在
    let isValid = await validateComponent(componentPath);
    let sourcePath: string;
    let componentFiles: string[];

    if (isValid) {
      // 如果组件存在，获取组件路径
      sourcePath = await getComponentDir(componentPath);
      componentFiles = await getComponentFiles(sourcePath);

      if (componentFiles.length === 0) {
        spinner.fail(`Component ${chalk.cyan(componentPath)} has no files.`);
        process.exit(1);
      }
    } else {
      // 尝试从 GitHub 下载
      spinner.text = `Component not found locally. Trying to download from GitHub...`;

      try {
        // 下载组件
        sourcePath = await downloadComponentFromGitHub(componentPath);
        componentFiles = await getComponentFiles(sourcePath);

        if (componentFiles.length === 0) {
          spinner.fail(
            `Downloaded component ${chalk.cyan(componentPath)} has no files.`
          );
          process.exit(1);
        }
      } catch (error) {
        spinner.fail(
          `Failed to download component: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
        process.exit(1);
      }
    }

    // 3. 确定目标目录路径
    // 如果没有指定输出目录，则使用源组件的基本目录
    const targetBaseDir = options.output || "components";
    const targetDir = path.join(process.cwd(), targetBaseDir);

    // 确保目标基本目录存在
    await fs.ensureDir(targetDir);

    // 目标组件目录
    const targetComponentDir = path.join(targetDir, componentName);

    // 确保目标组件目录存在
    await fs.ensureDir(targetComponentDir);

    // 4. 复制文件
    for (const file of componentFiles) {
      const srcFilePath = path.join(sourcePath, file);
      const destFilePath = path.join(targetComponentDir, file);

      // 确保目标文件的父目录存在
      await fs.ensureDir(path.dirname(destFilePath));

      // 读取源文件内容
      let content = await fs.readFile(srcFilePath, "utf8");

      // 处理相对导入
      if (content.includes("../utils")) {
        content = content.replace("../utils", "../lib/utils");

        // 确保工具目录存在
        const libDir = path.join(process.cwd(), "lib");
        await fs.ensureDir(libDir);

        // 如果工具文件不存在，则复制
        const utilsDestPath = path.join(libDir, "utils.ts");
        if (!(await fs.pathExists(utilsDestPath))) {
          const utilsSrcPath = path.join(sourcePath, "..", "utils.ts");
          if (await fs.pathExists(utilsSrcPath)) {
            let utilsContent = await fs.readFile(utilsSrcPath, "utf8");
            await fs.writeFile(utilsDestPath, utilsContent);
            spinner.info(`Created ${chalk.cyan("lib/utils.ts")}`);
          }
        }
      }

      // 写入目标文件
      await fs.writeFile(destFilePath, content, "utf8");
    }

    // 5. 如果是从 GitHub 下载的，清理临时目录
    if (!isValid && sourcePath) {
      try {
        await fs.remove(path.dirname(path.dirname(sourcePath)));
      } catch (error) {
        console.log(
          `Warning: Failed to clean up temp directory: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
      }
    }

    // 6. 获取组件在导入时的显示名称
    const displayName = getDisplayName(componentName);

    // 7. 显示成功消息
    spinner.succeed(
      `Added ${chalk.cyan(displayName)} to ${chalk.cyan(
        path.relative(process.cwd(), targetComponentDir)
      )}`
    );

    // 8. 显示导入信息
    console.log(`\n${chalk.green("Import and use the component:")}`);

    // 计算导入路径
    const importPath = path
      .relative("./src", targetComponentDir)
      .replace(/\\/g, "/");
    console.log(`import { ${displayName} } from "${importPath}";`);
  } catch (error) {
    spinner.fail(`Failed to add component: ${(error as Error).message}`);
    process.exit(1);
  }
}

/**
 * 获取组件显示名称
 */
function getDisplayName(name: string): string {
  // 移除可能存在的前缀
  let baseName = name;
  if (baseName.startsWith("dp-")) {
    baseName = baseName.substring(3);
  }

  // 转换为 PascalCase
  return baseName
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}
