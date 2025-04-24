import fs from "fs-extra";
import path from "path";
import { glob } from "glob";
import os from "os";
import { promisify } from "util";
import { exec } from "child_process";

const execAsync = promisify(exec);

// Path to components directory
const COMPONENTS_DIR = path.join(process.cwd(), "../../components");

/**
 * Check if a component exists
 */
export async function validateComponent(
  componentName: string
): Promise<boolean> {
  const normalizedName = componentName.toLowerCase();
  const componentDir = path.join(COMPONENTS_DIR, normalizedName);
  return fs.pathExists(componentDir);
}

/**
 * Get the path to a component directory
 */
export async function getComponentDir(componentName: string): Promise<string> {
  const normalizedName = componentName.toLowerCase();
  return path.join(COMPONENTS_DIR, normalizedName);
}

/**
 * Get all files in a component directory
 */
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

/**
 * Get all available components
 */
export async function getAllComponents(): Promise<string[]> {
  try {
    const componentDirs = await fs.readdir(COMPONENTS_DIR);

    const components = [];
    for (const dir of componentDirs) {
      const stat = await fs.stat(path.join(COMPONENTS_DIR, dir));
      if (stat.isDirectory()) {
        components.push(dir);
      }
    }

    return components;
  } catch (error) {
    console.error("Error getting components:", error);
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
      `git clone --depth 1 --filter=blob:none --sparse https://github.com/yourusername/deepdanci-ui ${tempDir}`
    );

    // Sparse checkout specific component
    await execAsync(
      `git -C ${tempDir} sparse-checkout set components/${normalizedName}`,
      { cwd: tempDir }
    );

    return path.join(tempDir, "components", normalizedName);
  } catch (error) {
    await fs.remove(tempDir);
    throw new Error(`Failed to download component: ${error.message}`);
  }
}
