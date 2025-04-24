import fs from "fs-extra";
import path from "path";
import { glob } from "glob";
import os from "os";
import { promisify } from "util";
import { exec } from "child_process";

const execAsync = promisify(exec);
const globPromise = promisify(glob);

// 获取组件目录路径
export function getComponentsDir(): string {
  const debugPaths = [];

  // 检查相对于当前工作目录的路径
  const cwdComponentsDir = path.join(process.cwd(), "components");
  debugPaths.push(cwdComponentsDir);
  if (fs.existsSync(cwdComponentsDir)) {
    console.log(`Found components dir at: ${cwdComponentsDir}`);
    return cwdComponentsDir;
  }

  // 检查相对于CLI目录的上级路径
  const upLevelDir = path.join(process.cwd(), "..", "components");
  debugPaths.push(upLevelDir);
  if (fs.existsSync(upLevelDir)) {
    console.log(`Found components dir at: ${upLevelDir}`);
    return upLevelDir;
  }

  // 如果是从安装的包运行
  const pkgDir = path.join(__dirname, "..", "..", "..", "components");
  debugPaths.push(pkgDir);
  if (fs.existsSync(pkgDir)) {
    console.log(`Found components dir at: ${pkgDir}`);
    return pkgDir;
  }

  // 检查全局包位置下的components目录
  const npmGlobalDir = path.resolve(
    path.join(__dirname, "..", "..", "..", "..", "components")
  );
  debugPaths.push(npmGlobalDir);
  if (fs.existsSync(npmGlobalDir)) {
    console.log(`Found components dir at: ${npmGlobalDir}`);
    return npmGlobalDir;
  }

  // 直接检查CLI所在目录下的components
  const cliDirComponents = path.join(__dirname, "..", "..", "components");
  debugPaths.push(cliDirComponents);
  if (fs.existsSync(cliDirComponents)) {
    console.log(`Found components dir at: ${cliDirComponents}`);
    return cliDirComponents;
  }

  // 尝试寻找全局安装的包目录
  try {
    // 使用同步版本避免异步问题
    const { execSync } = require("child_process");
    const globalNpmRoot = execSync("npm root -g", { encoding: "utf8" }).trim();
    const globalComponentsDir = path.join(
      globalNpmRoot,
      "deepdanci",
      "components"
    );
    debugPaths.push(globalComponentsDir);
    if (fs.existsSync(globalComponentsDir)) {
      console.log(`Found components dir at: ${globalComponentsDir}`);
      return globalComponentsDir;
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.log(`Error checking global npm directory: ${errorMessage}`);
  }

  console.log(
    `Couldn't find components directory. Tried: ${debugPaths.join(", ")}`
  );

  // 如果找不到组件目录，返回默认路径并创建它
  const defaultDir = path.join(process.cwd(), "components");
  fs.ensureDirSync(defaultDir);
  console.log(`Created default components dir at: ${defaultDir}`);
  return defaultDir;
}

// Path to components directory
const COMPONENTS_DIR = getComponentsDir();

/**
 * 解析组件路径，得到基本目录和组件名称
 * 例如:
 * - "button" => { baseDir: "components", componentName: "button" }
 * - "lib/utils" => { baseDir: "lib", componentName: "utils" }
 */
export function parseComponentPath(componentPath: string): {
  baseDir: string;
  componentName: string;
} {
  // 标准化路径（移除前后的斜杠，使用统一的路径分隔符）
  const normalizedPath = componentPath
    .toLowerCase()
    .trim()
    .replace(/^\/|\/$/g, "")
    .replace(/\\/g, "/");

  // 分解路径
  const parts = normalizedPath.split("/");

  if (parts.length === 1) {
    // 如果只有组件名，则默认为 components 目录
    const componentName = parts[0];
    return { baseDir: "components", componentName };
  } else if (parts.length === 2) {
    // 如果有两部分，则第一部分是目录，第二部分是组件名
    const [baseDir, componentName] = parts;
    return { baseDir, componentName };
  } else {
    // 如果路径更复杂，则最后一部分是组件名，其余部分是基本目录
    const componentName = parts.pop() || "";
    const baseDir = parts.join("/");
    return { baseDir, componentName };
  }
}

/**
 * 获取组件的完整路径
 */
export function getFullComponentPath(
  baseDir: string,
  componentName: string
): string {
  // 获取基本目录的绝对路径
  const baseDirPath = path.join(process.cwd(), baseDir);

  // 返回组件的完整路径
  return path.join(baseDirPath, componentName);
}

/**
 * 检查组件是否存在
 */
export async function validateComponent(
  componentPath: string
): Promise<boolean> {
  // 解析组件路径
  const { baseDir, componentName } = parseComponentPath(componentPath);

  // 获取组件的完整路径
  const fullPath = getFullComponentPath(baseDir, componentName);

  // 检查组件是否存在
  const exists = await fs.pathExists(fullPath);

  console.log(
    `Checking if component ${componentName} exists at ${fullPath}: ${exists}`
  );

  return exists;
}

/**
 * 获取组件的目录路径
 */
export async function getComponentDir(componentPath: string): Promise<string> {
  // 解析组件路径
  const { baseDir, componentName } = parseComponentPath(componentPath);

  // 获取组件的完整路径
  return getFullComponentPath(baseDir, componentName);
}

/**
 * Get all files in a component directory
 */
export async function getComponentFiles(
  componentDir: string
): Promise<string[]> {
  console.log(`Getting files from ${componentDir}`);
  try {
    const files = await globPromise("**/*", {
      cwd: componentDir,
      dot: false,
      nodir: true,
      ignore: ["node_modules/**", ".git/**", "README.md", "package.json"],
    });

    console.log(`Found ${files.length} files: ${files.join(", ")}`);
    return files;
  } catch (error) {
    console.error(
      `Error getting files: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
    return [];
  }
}

/**
 * 获取所有可用的组件
 */
export async function getAllComponents(): Promise<
  { path: string; name: string }[]
> {
  try {
    // 结果列表
    const results: { path: string; name: string }[] = [];

    // 扫描根目录
    const rootDir = process.cwd();
    const mainDirs = ["components", "lib", "hooks"];

    console.log(`Scanning root directory: ${rootDir}`);

    // 只扫描根目录下的指定目录
    for (const dir of mainDirs) {
      const dirPath = path.join(rootDir, dir);

      if (await fs.pathExists(dirPath)) {
        console.log(`Found directory: ${dir}`);
        results.push({
          path: dir,
          name: dir,
        });
      }
    }

    return results;
  } catch (error) {
    console.error(
      `Error getting directories: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
    return [];
  }
}

/**
 * 从 GitHub 下载组件
 */
export async function downloadComponentFromGitHub(
  componentPath: string
): Promise<string> {
  // 解析组件路径
  const { baseDir, componentName } = parseComponentPath(componentPath);

  // 创建临时目录
  const tempDir = path.join(os.tmpdir(), `deepdanci-${Date.now()}`);
  await fs.ensureDir(tempDir);

  try {
    // 从 GitHub 克隆
    await execAsync(
      `git clone --depth 1 --filter=blob:none --sparse https://github.com/bookmarkbao/deepdanci-ui ${tempDir}`
    );

    // 准备检出路径
    let checkoutPath;

    // 构建尝试路径列表
    const possiblePaths = [];

    if (baseDir === "components") {
      // 对于 components 目录，尝试普通路径和带前缀的路径
      possiblePaths.push(
        `components/${componentName}`,
        `components/dp-${componentName}`
      );
    } else {
      // 对于其他目录，直接使用指定的路径
      possiblePaths.push(`${baseDir}/${componentName}`);
    }

    // 尝试所有可能的路径
    for (const checkoutPath of possiblePaths) {
      try {
        console.log(`Trying to checkout: ${checkoutPath}`);
        await execAsync(
          `git -C ${tempDir} sparse-checkout set ${checkoutPath}`,
          { cwd: tempDir }
        );

        const componentPathInRepo = path.join(tempDir, checkoutPath);
        if (await fs.pathExists(componentPathInRepo)) {
          return componentPathInRepo;
        }
      } catch (err) {
        console.log(`Failed to checkout path ${checkoutPath}, trying next...`);
      }
    }

    // 如果所有尝试都失败，抛出错误
    throw new Error(`Component ${componentPath} not found in repository`);
  } catch (error: unknown) {
    // 出错时清理临时目录
    try {
      await fs.remove(tempDir);
    } catch (cleanupError) {
      console.error(`Failed to clean up temp dir: ${cleanupError}`);
    }

    if (error instanceof Error) {
      throw new Error(`Failed to download component: ${error.message}`);
    }
    throw new Error("Failed to download component: Unknown error");
  }
}
