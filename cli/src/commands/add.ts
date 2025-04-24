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

      // Create subdirectories if needed
      await fs.ensureDir(path.dirname(destPath));

      // Copy the file
      await fs.copy(srcPath, destPath);
    }

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
    spinner.fail(`Failed to add component: ${(error as Error).message}`);
    process.exit(1);
  }
}
