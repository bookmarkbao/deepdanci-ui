#!/usr/bin/env node
import { Command } from "commander";
import { add } from "./commands/add";
import { init } from "./commands/init";
import { list } from "./commands/list";
import { readFileSync } from "fs";
import { join } from "path";

const program = new Command();

// 从 package.json 中读取版本号
const packageJson = JSON.parse(
  readFileSync(join(__dirname, "..", "package.json"), "utf8")
);

program
  .name("deepdanci")
  .description("CLI for adding DeepDanci UI components to your project")
  .version(packageJson.version);

program
  .command("add")
  .description("Add a component to your project")
  .argument(
    "<component-path>",
    "Path of the component to add (e.g. button, ui-dp/button)"
  )
  .option("-y, --yes", "Skip confirmation prompt")
  .option(
    "-o, --output <directory>",
    "Output directory (default: same as source)"
  )
  .action(add);

program
  .command("init")
  .description("Initialize your project with DeepDanci UI dependencies")
  .action(init);

program
  .command("list")
  .description("List all available components")
  .action(list);

program.parse();
