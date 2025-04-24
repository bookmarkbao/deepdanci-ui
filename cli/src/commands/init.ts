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

    // Define the dependencies to install with exact versions
    const dependencies: Record<string, string> = {
      react: "^19.0.0",
      "react-dom": "^19.0.0",
      tailwindcss: "^4.0.0",
      "class-variance-authority": "^0.7.0",
      clsx: "^2.0.0",
      "tailwind-merge": "^3.2.0",
      "tailwindcss-animate": "^1.0.7",
      "tw-animate-css": "^1.2.8",
    };

    // For Next.js projects
    const isNextJsProject = packageJson.dependencies?.["next"] !== undefined;
    if (isNextJsProject) {
      spinner.info("Next.js project detected. Configuring for Next.js 15+...");
      dependencies["next"] = "15.3.1";
    }

    // Check and add missing dependencies
    const missingDeps: string[] = [];
    for (const [dep, version] of Object.entries(dependencies)) {
      if (!packageJson.dependencies?.[dep]) {
        missingDeps.push(`${dep}@${version}`);
      }
    }

    // Add Tailwind PostCSS to dev dependencies if not present
    const devDependencies: Record<string, string> = {
      "@tailwindcss/postcss": "^4.0.0",
    };

    const missingDevDeps: string[] = [];
    for (const [dep, version] of Object.entries(devDependencies)) {
      if (!packageJson.devDependencies?.[dep]) {
        missingDevDeps.push(`${dep}@${version}`);
      }
    }

    // Install missing dependencies if any
    if (missingDeps.length > 0) {
      spinner.text = "Installing dependencies...";

      // Check if using npm or yarn
      const hasYarnLock = await fs.pathExists(
        path.join(process.cwd(), "yarn.lock")
      );
      const hasPnpmLock = await fs.pathExists(
        path.join(process.cwd(), "pnpm-lock.yaml")
      );

      let installCmd = "npm install";
      if (hasYarnLock) {
        installCmd = "yarn add";
      } else if (hasPnpmLock) {
        installCmd = "pnpm add";
      }

      try {
        await execAsync(`${installCmd} ${missingDeps.join(" ")}`);
      } catch (error) {
        spinner.fail(
          `Failed to install dependencies: ${(error as Error).message}`
        );
        process.exit(1);
      }
    }

    // Install dev dependencies if needed
    if (missingDevDeps.length > 0) {
      spinner.text = "Installing dev dependencies...";

      let installDevCmd = "npm install --save-dev";
      const hasYarnLock = await fs.pathExists(
        path.join(process.cwd(), "yarn.lock")
      );
      const hasPnpmLock = await fs.pathExists(
        path.join(process.cwd(), "pnpm-lock.yaml")
      );

      if (hasYarnLock) {
        installDevCmd = "yarn add --dev";
      } else if (hasPnpmLock) {
        installDevCmd = "pnpm add --save-dev";
      }

      try {
        await execAsync(`${installDevCmd} ${missingDevDeps.join(" ")}`);
      } catch (error) {
        spinner.warn(
          `Failed to install dev dependencies: ${(error as Error).message}`
        );
        // Continue even if dev dependencies fail
      }
    }

    // Create directories
    const componentsDir = path.join(process.cwd(), "src", "components");
    await fs.ensureDir(componentsDir);

    // Create a basic tailwind.config.js if it doesn't exist (updated for Tailwind CSS 4)
    const tailwindConfigPath = path.join(process.cwd(), "tailwind.config.js");
    if (!(await fs.pathExists(tailwindConfigPath))) {
      const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "rgb(var(--border))",
        input: "rgb(var(--input))",
        ring: "rgb(var(--ring))",
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
        primary: {
          DEFAULT: "rgb(var(--primary))",
          foreground: "rgb(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary))",
          foreground: "rgb(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive))",
          foreground: "rgb(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "rgb(var(--muted))",
          foreground: "rgb(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "rgb(var(--accent))",
          foreground: "rgb(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "rgb(var(--popover))",
          foreground: "rgb(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "rgb(var(--card))",
          foreground: "rgb(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tw-animate-css")
  ],
}`;
      await fs.writeFile(tailwindConfigPath, tailwindConfig);
    }

    // Create a CSS variables file for the color scheme
    const cssVarsPath = path.join(process.cwd(), "src", "styles");
    await fs.ensureDir(cssVarsPath);

    const globalCssPath = path.join(cssVarsPath, "globals.css");
    if (!(await fs.pathExists(globalCssPath))) {
      const globalCss = `:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --accent: 240 4.8% 95.9%;
  --accent-foreground: 240 5.9% 10%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 240 5.9% 10%;
  --radius: 0.5rem;
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --card: 240 10% 3.9%;
  --card-foreground: 0 0% 98%;
  --popover: 240 10% 3.9%;
  --popover-foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 240 5.9% 10%;
  --secondary: 240 3.7% 15.9%;
  --secondary-foreground: 0 0% 98%;
  --muted: 240 3.7% 15.9%;
  --muted-foreground: 240 5% 64.9%;
  --accent: 240 3.7% 15.9%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 3.7% 15.9%;
  --input: 240 3.7% 15.9%;
  --ring: 240 4.9% 83.9%;
}

* {
  border-color: hsl(var(--border));
}

body {
  color: hsl(var(--foreground));
  background: hsl(var(--background));
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`;
      await fs.writeFile(globalCssPath, globalCss);
    }

    spinner.succeed("DeepDanci UI initialized successfully");
    console.log(`\n${chalk.green("Next steps:")}`);
    console.log(
      `1. ${chalk.cyan(
        "Import globals.css"
      )} - Add to your main layout or entry file`
    );
    console.log(
      `2. ${chalk.cyan(
        "npx deepdanci add Button"
      )} - Add a button component (will be created as ${chalk.cyan(
        "dp-button"
      )})`
    );
    console.log(
      `3. ${chalk.cyan("npx deepdanci list")} - View all available components`
    );
    console.log(
      `\n${chalk.blue("Note:")} All components are prefixed with ${chalk.cyan(
        "dp-"
      )} in your file system, but you can import them using their standard names.`
    );
  } catch (error) {
    spinner.fail(`Initialization failed: ${(error as Error).message}`);
    process.exit(1);
  }
}
