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
 * Check if a component exists
 */
export async function validateComponent(
  componentName: string
): Promise<boolean> {
  // 标准化组件名称 - 确保查找带 dp- 前缀的目录
  const normalizedName = componentName.toLowerCase();
  const prefixedName = normalizedName.startsWith("dp-")
    ? normalizedName
    : `dp-${normalizedName}`;

  const componentDir = path.join(COMPONENTS_DIR, prefixedName);
  const exists = await fs.pathExists(componentDir);
  console.log(
    `Checking if component ${prefixedName} exists at ${componentDir}: ${exists}`
  );
  return exists;
}

/**
 * Get the path to a component directory
 */
export async function getComponentDir(componentName: string): Promise<string> {
  // 标准化组件名称 - 确保获取带 dp- 前缀的目录
  const normalizedName = componentName.toLowerCase();
  const prefixedName = normalizedName.startsWith("dp-")
    ? normalizedName
    : `dp-${normalizedName}`;

  return path.join(COMPONENTS_DIR, prefixedName);
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
 * Get all available components
 */
export async function getAllComponents(): Promise<string[]> {
  try {
    console.log(`Looking for components in: ${COMPONENTS_DIR}`);

    // 检查目录是否存在
    if (!(await fs.pathExists(COMPONENTS_DIR))) {
      console.log(`Components directory doesn't exist: ${COMPONENTS_DIR}`);
      return [];
    }

    const componentDirs = await fs.readdir(COMPONENTS_DIR);
    console.log(`Found dirs in components: ${componentDirs.join(", ")}`);

    const components = [];
    for (const dir of componentDirs) {
      // 只处理带有 dp- 前缀的目录
      if (!dir.startsWith("dp-")) {
        continue;
      }

      const fullPath = path.join(COMPONENTS_DIR, dir);
      const stat = await fs.stat(fullPath);
      console.log(
        `Checking ${fullPath}: ${
          stat.isDirectory() ? "is directory" : "is file"
        }`
      );
      if (stat.isDirectory()) {
        // 从组件名移除 dp- 前缀以方便显示
        const displayName = dir.replace(/^dp-/, "");
        components.push(displayName);
      }
    }

    console.log(`Final components list: ${components.join(", ")}`);
    return components;
  } catch (error) {
    console.error(
      `Error getting components: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
    return [];
  }
}

/**
 * Get a component from GitHub
 */
export async function downloadComponentFromGitHub(
  componentName: string
): Promise<string> {
  const normalizedName = componentName.toLowerCase();
  const tempDir = path.join(os.tmpdir(), `deepdanci-${Date.now()}`);

  await fs.ensureDir(tempDir);

  try {
    // From GitHub download
    await execAsync(
      `git clone --depth 1 --filter=blob:none --sparse https://github.com/bookmarkbao/deepdanci-ui ${tempDir}`
    );

    // Sparse checkout specific component
    await execAsync(
      `git -C ${tempDir} sparse-checkout set components/${normalizedName}`,
      { cwd: tempDir }
    );

    return path.join(tempDir, "components", normalizedName);
  } catch (error: unknown) {
    await fs.remove(tempDir);
    if (error instanceof Error) {
      throw new Error(`Failed to download component: ${error.message}`);
    }
    throw new Error("Failed to download component: Unknown error");
  }
}
