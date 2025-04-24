import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import glob from "glob";
import execa from "execa";
import os from "os";

// GitHub repository URL
const REPO_URL = "https://github.com/bookmarkbao/deepdanci-ui.git";

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
 * Find all files matching a pattern in a directory
 */
export const findFiles = (
  directory: string,
  pattern: string
): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    glob(pattern, { cwd: directory, absolute: true }, (err, matches) => {
      if (err) {
        reject(err);
      } else {
        resolve(matches);
      }
    });
  });
};

/**
 * Get all available components/hooks/lib files from GitHub repository
 */
export const getAllComponents = async (): Promise<
  { path: string; type: "file" | "directory" }[]
> => {
  // Initialize results array
  const results: { path: string; type: "file" | "directory" }[] = [];

  // Create temp directory for cloning
  const tempDir = path.join(os.tmpdir(), `deepdanci-list-${Date.now()}`);

  try {
    // Clone the repository to temp directory (shallow clone to save time)
    await execa("git", ["clone", "--depth=1", REPO_URL, tempDir]);

    // Patterns to search for components, hooks, and library files
    const patterns = [
      { glob: "components/**/*.{ts,tsx}", prefix: "components" },
      {
        glob: "components/**/index.{ts,tsx}",
        prefix: "components",
        isIndex: true,
      },
      { glob: "hooks/**/*.ts", prefix: "hooks" },
      { glob: "lib/**/*.ts", prefix: "lib" },
    ];

    for (const pattern of patterns) {
      try {
        const files = await findFiles(tempDir, pattern.glob);

        for (const file of files) {
          // Get the relative path from the repo root
          const relativePath = path.relative(tempDir, file);

          // Check if this is a directory with an index file
          if (pattern.isIndex) {
            const dirPath = path.dirname(relativePath);
            results.push({
              path: dirPath,
              type: "directory",
            });
          } else {
            // For regular files, just add them directly
            // If the file is within a directory that already has an index, we'll skip it
            const isDuplicate = results.some(
              (item) =>
                item.type === "directory" &&
                (relativePath.startsWith(`${item.path}/`) ||
                  relativePath === `${item.path}/index.ts` ||
                  relativePath === `${item.path}/index.tsx`)
            );

            if (!isDuplicate) {
              // Remove file extension for cleaner display
              const pathWithoutExt = relativePath.replace(/\.(ts|tsx)$/, "");
              results.push({
                path: pathWithoutExt,
                type: "file",
              });
            }
          }
        }
      } catch (error) {
        console.error(`Error processing pattern ${pattern.glob}:`, error);
      }
    }
  } catch (error) {
    console.error("Error cloning repository:", error);
    throw new Error("Failed to fetch components from GitHub repository");
  } finally {
    // Clean up: remove the temp directory
    if (await pathExists(tempDir)) {
      await fs.remove(tempDir);
    }
  }

  return results;
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
