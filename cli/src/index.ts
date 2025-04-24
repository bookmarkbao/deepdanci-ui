#!/usr/bin/env node
import { Command } from "commander";
import { add } from "./commands/add";
import { init } from "./commands/init";
import { list } from "./commands/list";

const program = new Command();

program
  .name("deepdanci")
  .description("CLI for adding DeepDanci UI components to your project")
  .version("0.1.0");

program
  .command("add")
  .description("Add a component to your project")
  .argument("<component>", "Name of the component to add")
  .option("-y, --yes", "Skip confirmation prompt")
  .option("-o, --output <directory>", "Output directory", "./src/components")
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
