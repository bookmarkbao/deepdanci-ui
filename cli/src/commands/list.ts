import ora from "ora";
import chalk from "chalk";
import { getAllComponents } from "../utils";

export async function list(): Promise<void> {
  const spinner = ora("Fetching available components...").start();

  try {
    const components = await getAllComponents();

    if (components.length === 0) {
      spinner.info("No components found.");
      return;
    }

    spinner.succeed(`Found ${components.length} components`);

    console.log("\nAvailable components:");
    components.forEach((component) => {
      console.log(`  ${chalk.cyan(component)}`);
    });

    console.log(
      `\nRun ${chalk.cyan(
        "npx deepdanci add <component>"
      )} to add a component to your project.`
    );
  } catch (error) {
    spinner.fail(`Failed to list components: ${(error as Error).message}`);
    process.exit(1);
  }
}
