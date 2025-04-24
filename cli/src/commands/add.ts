import fs from "fs-extra";
import path from "path";
import ora from "ora";
import { isDirectory, normalizeTargetPath, pathExists, logger } from "../utils";

interface AddOptions {
  yes?: boolean;
  output?: string;
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

    // Source paths in the package
    const packageRoot = path.resolve(__dirname, "..", "..");
    const sourceRoot = path.resolve(packageRoot, "..");

    // Determine the source path
    let sourcePath: string;

    // If in the components folder, we look in the CLI components directory or main components directory
    if (type === "components") {
      const cliComponentPath = path.join(
        packageRoot,
        "components",
        normalizedPath.replace("components/", "")
      );
      const mainComponentPath = path.join(sourceRoot, normalizedPath);

      // Check if component exists in CLI components directory first
      if (await pathExists(cliComponentPath)) {
        sourcePath = cliComponentPath;
      }
      // Otherwise check the main components directory
      else if (await pathExists(mainComponentPath)) {
        sourcePath = mainComponentPath;
      } else {
        spinner.fail(`Component "${normalizedPath}" not found.`);
        return;
      }
    }
    // For hooks and lib, look in their respective directories
    else {
      sourcePath = path.join(sourceRoot, normalizedPath);

      if (!(await pathExists(sourcePath))) {
        spinner.fail(`${type} "${normalizedPath}" not found.`);
        return;
      }
    }

    // Determine the destination path
    const destPath = path.join(cwd, normalizedPath);

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
      spinner.succeed(`Added file: ${normalizedPath}`);
    }

    logger.info(`Successfully added ${normalizedPath} to your project.`);
  } catch (error) {
    spinner.fail("Failed to add to your project.");
    if (error instanceof Error) {
      logger.error(error.message);
    }
  }
};
