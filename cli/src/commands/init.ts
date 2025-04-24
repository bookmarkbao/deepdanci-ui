import ora from "ora";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";

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

    // Define the dependencies to install with exact versions
    const dependencies: Record<string, string> = {};

    // Check and add missing dependencies
    const missingDeps: string[] = [];
    for (const [dep, version] of Object.entries(dependencies)) {
      if (!packageJson.dependencies?.[dep]) {
        missingDeps.push(`${dep}@${version}`);
      }
    }

    // Create directories
    const directories = [
      path.join(process.cwd(), "components"),
      path.join(process.cwd(), "hooks"),
      path.join(process.cwd(), "lib"),
    ];

    // Create each directory
    for (const dir of directories) {
      await fs.ensureDir(dir);
      spinner.text = `Creating directory: ${dir}`;
    }

    spinner.succeed("DeepDanci UI initialized successfully");
    console.log(`\n${chalk.green("Next steps:")}`);
    console.log(
      `1. ${chalk.cyan(
        "npx deepdanci add promotional-header"
      )} - Add the promotional header component`
    );
    console.log(
      `2. ${chalk.cyan(
        "npx deepdanci add terms-of-service"
      )} - Add terms of service component`
    );
    console.log(
      `3. ${chalk.cyan("npx deepdanci add hooks/useTest")} - Add a test hook`
    );
    console.log(
      `4. ${chalk.cyan("npx deepdanci list")} - View all available components`
    );
  } catch (error) {
    spinner.fail(`Initialization failed: ${(error as Error).message}`);
    process.exit(1);
  }
}
