import ora from "ora";
import chalk from "chalk";
import { promisify } from "util";
import { exec } from "child_process";
import fs from "fs-extra";
import path from "path";

const execAsync = promisify(exec);

interface PackageJson {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export async function init(): Promise<void> {
  const spinner = ora("Initializing DeepDanci UI...").start();

  try {
    // Check if package.json exists
    const packageJsonPath = path.join(process.cwd(), "package.json");
    if (!(await fs.pathExists(packageJsonPath))) {
      spinner.fail(
        "package.json not found. Make sure you're in a Node.js project."
      );
      process.exit(1);
    }

    // Read package.json
    const packageJson = (await fs.readJSON(packageJsonPath)) as PackageJson;

    // Define the dependencies to install
    const dependencies = {
      react: "^18.2.0",
      "react-dom": "^18.2.0",
      tailwindcss: "^3.3.0",
      "class-variance-authority": "^0.6.0",
      clsx: "^1.2.1",
      "tailwind-merge": "^1.12.0",
    };

    // Check and add missing dependencies
    const missingDeps: string[] = [];
    for (const [dep, version] of Object.entries(dependencies)) {
      if (!packageJson.dependencies?.[dep]) {
        missingDeps.push(`${dep}@${version}`);
      }
    }

    // Install missing dependencies if any
    if (missingDeps.length > 0) {
      spinner.text = "Installing dependencies...";

      // Check if using npm or yarn
      const hasYarnLock = await fs.pathExists(
        path.join(process.cwd(), "yarn.lock")
      );
      const installCmd = hasYarnLock ? "yarn add" : "npm install";

      try {
        await execAsync(`${installCmd} ${missingDeps.join(" ")}`);
      } catch (error) {
        spinner.fail(
          `Failed to install dependencies: ${(error as Error).message}`
        );
        process.exit(1);
      }
    }

    // Create directories
    const componentsDir = path.join(process.cwd(), "src", "components");
    await fs.ensureDir(componentsDir);

    // Create a basic tailwind.config.js if it doesn't exist
    const tailwindConfigPath = path.join(process.cwd(), "tailwind.config.js");
    if (!(await fs.pathExists(tailwindConfigPath))) {
      const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;
      await fs.writeFile(tailwindConfigPath, tailwindConfig);
    }

    spinner.succeed("DeepDanci UI initialized successfully");
    console.log(`\n${chalk.green("Next steps:")}`);
    console.log(
      `1. ${chalk.cyan("npx deepdanci add Button")} - Add a button component`
    );
    console.log(
      `2. ${chalk.cyan("npx deepdanci list")} - View all available components`
    );
  } catch (error) {
    spinner.fail(`Initialization failed: ${(error as Error).message}`);
    process.exit(1);
  }
}
