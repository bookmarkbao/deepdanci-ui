import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

/**
 * Check if the path represents a directory
 */
export const isDirectory = (sourcePath: string): boolean => {
  try {
    return fs.statSync(sourcePath).isDirectory();
  } catch (error) {
    return false;
  }
};

/**
 * Normalize the target path based on the project rules
 */
export const normalizeTargetPath = (
  targetPath: string
): { normalizedPath: string; type: string } => {
  // Check if the path starts with known folder prefixes
  const knownPrefixes = ["components/", "hooks/", "lib/"];
  const hasKnownPrefix = knownPrefixes.some((prefix) =>
    targetPath.startsWith(prefix)
  );

  if (!hasKnownPrefix) {
    // If no known prefix, assume it's under components folder
    if (!targetPath.includes("/")) {
      return { normalizedPath: `components/${targetPath}`, type: "components" };
    } else {
      const parts = targetPath.split("/");
      const firstDir = parts[0];

      if (["hooks", "lib", "components"].includes(firstDir)) {
        return { normalizedPath: targetPath, type: firstDir };
      } else {
        return {
          normalizedPath: `components/${targetPath}`,
          type: "components",
        };
      }
    }
  }

  const type = targetPath.split("/")[0];
  return { normalizedPath: targetPath, type };
};

/**
 * Get the source path for copying
 */
export const getSourcePath = (
  normalizedPath: string,
  baseDir: string
): string => {
  return path.resolve(baseDir, normalizedPath);
};

/**
 * Check if a path exists
 */
export const pathExists = async (filePath: string): Promise<boolean> => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

/**
 * Log messages with colors
 */
export const logger = {
  info: (message: string) => console.log(chalk.blue(message)),
  success: (message: string) => console.log(chalk.green(message)),
  error: (message: string) => console.log(chalk.red(message)),
  warn: (message: string) => console.log(chalk.yellow(message)),
};
