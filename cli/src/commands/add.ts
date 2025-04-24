import fs from "fs-extra";
import path from "path";
import ora from "ora";
import execa from "execa";
import { isDirectory, normalizeTargetPath, pathExists, logger } from "../utils";
import os from "os";

interface AddOptions {
  yes?: boolean;
  output?: string;
}

// GitHub repository URL
const REPO_URL = "https://github.com/bookmarkbao/deepdanci-ui.git";

/**
 * Try different path variations to find the component
 */
async function findComponent(
  baseDir: string,
  normalizedPath: string
): Promise<string | null> {
  // List of possible path variations to try
  const pathVariations = [
    normalizedPath, // Original path
    `${normalizedPath}.tsx`, // With .tsx extension
    `${normalizedPath}.ts`, // With .ts extension
    `${normalizedPath}/index.tsx`, // Directory with index.tsx
    `${normalizedPath}/index.ts`, // Directory with index.ts
  ];

  // For components paths, also try without the components/ prefix
  if (normalizedPath.startsWith("components/")) {
    const withoutPrefix = normalizedPath.replace("components/", "");
    pathVariations.push(
      withoutPrefix, // Without prefix
      `${withoutPrefix}.tsx`, // Without prefix with .tsx extension
      `${withoutPrefix}.ts`, // Without prefix with .ts extension
      `${withoutPrefix}/index.tsx`, // Without prefix directory with index.tsx
      `${withoutPrefix}/index.ts` // Without prefix directory with index.ts
    );
  }

  // Try all path variations
  for (const pathVar of pathVariations) {
    const fullPath = path.join(baseDir, pathVar);
    if (await pathExists(fullPath)) {
      return fullPath;
    }
  }

  return null;
}

/**
 * Add a component, hook, or library file/directory to the project
 */
export const add = async (componentPath: string, options: AddOptions) => {
  const spinner = ora("Adding to your project...").start();

  try {
    // Normalize the target path
    const { normalizedPath, type } = normalizeTargetPath(componentPath);

    // Get current working directory (where the user is running the command)
    const cwd = process.cwd();

    // Create temp directory for cloning
    const tempDir = path.join(os.tmpdir(), `deepdanci-${Date.now()}`);
    spinner.text = "Downloading from GitHub repository...";

    try {
      // Clone the repository to temp directory (shallow clone to save time)
      await execa("git", ["clone", "--depth=1", REPO_URL, tempDir]);

      // Try to find the component with various path formats
      const sourcePath = await findComponent(tempDir, normalizedPath);

      // Check if the file or directory exists in the repository
      if (!sourcePath) {
        spinner.fail(
          `${type} "${normalizedPath}" not found in the repository.`
        );
        return;
      }

      // Determine the destination path in the user's project
      let destPath: string;

      // If we found a file with an extension, make sure the destination includes the extension
      if (sourcePath.endsWith(".tsx") || sourcePath.endsWith(".ts")) {
        // Extract the extension
        const ext = path.extname(sourcePath);
        if (!normalizedPath.endsWith(ext)) {
          destPath = path.join(cwd, `${normalizedPath}${ext}`);
        } else {
          destPath = path.join(cwd, normalizedPath);
        }
      } else {
        destPath = path.join(cwd, normalizedPath);
      }

      // Check if destination already exists
      if (await pathExists(destPath)) {
        spinner.fail(`${normalizedPath} already exists in your project.`);
        return;
      }

      // Create destination directory if needed
      await fs.ensureDir(path.dirname(destPath));

      // Check if source is a directory or a file
      if (isDirectory(sourcePath)) {
        // If it's a directory, copy the entire directory
        await fs.copy(sourcePath, destPath);
        spinner.succeed(`Added directory: ${normalizedPath}`);
      } else {
        // If it's a file, copy the file
        await fs.copy(sourcePath, destPath);
        spinner.succeed(`Added file: ${path.basename(destPath)}`);
      }

      logger.info(
        `Successfully added ${path.basename(destPath)} to your project.`
      );
    } finally {
      // Clean up: remove the temp directory
      if (await pathExists(tempDir)) {
        await fs.remove(tempDir);
      }
    }
  } catch (error) {
    spinner.fail("Failed to add to your project.");
    if (error instanceof Error) {
      logger.error(error.message);
    }
  }
};
