#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

console.log(`${colors.cyan}Installing DeepDanci UI CLI...${colors.reset}\n`);

try {
  // Build the CLI
  console.log(`${colors.yellow}Building CLI...${colors.reset}`);
  execSync("cd cli && npm install && npm run build", { stdio: "inherit" });

  // Install CLI globally
  console.log(`\n${colors.yellow}Installing CLI globally...${colors.reset}`);
  execSync("npm install -g ./cli", { stdio: "inherit" });

  console.log(
    `\n${colors.green}DeepDanci UI CLI installed successfully!${colors.reset}`
  );
  console.log(`\n${colors.blue}You can now use the CLI:${colors.reset}`);
  console.log(
    `  ${colors.cyan}deepdanci init${colors.reset} - Initialize your project`
  );
  console.log(
    `  ${colors.cyan}deepdanci add Button${colors.reset} - Add a Button component`
  );
  console.log(
    `  ${colors.cyan}deepdanci list${colors.reset} - List all available components`
  );
} catch (error) {
  console.error(`\nInstallation failed: ${error.message}`);
  process.exit(1);
}
