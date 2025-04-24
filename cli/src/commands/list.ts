import ora from "ora";
import chalk from "chalk";
import { getAllComponents } from "../utils";

export async function list(): Promise<void> {
  const spinner = ora("Fetching available directories...").start();

  try {
    const directories = await getAllComponents();

    if (directories.length === 0) {
      spinner.info("No directories found.");
      return;
    }

    spinner.succeed(`Found ${directories.length} directories`);

    console.log("\nAvailable directories:");
    directories.forEach((dir) => {
      console.log(`  ${chalk.cyan(dir.path)}`);
    });

    console.log(
      `\nRun ${chalk.cyan(
        "npx deepdanci add <component-path>"
      )} to add a component to your project.`
    );

    console.log(`\nExamples:`);
    console.log(
      `  ${chalk.cyan(
        "npx deepdanci add button"
      )} - Add button to components directory`
    );
    console.log(
      `  ${chalk.cyan(
        "npx deepdanci add lib/utils"
      )} - Add utils to lib directory`
    );
  } catch (error) {
    spinner.fail(`Failed to list directories: ${(error as Error).message}`);
    process.exit(1);
  }
}
