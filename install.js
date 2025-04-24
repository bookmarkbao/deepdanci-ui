#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

// 控制台输出颜色
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

console.log(`${colors.cyan}正在安装 DeepDanci UI CLI...${colors.reset}\n`);

try {
  // 构建CLI
  console.log(`${colors.yellow}构建CLI...${colors.reset}`);
  execSync("cd cli && npm install && npm run build", { stdio: "inherit" });

  // 全局安装CLI
  console.log(`\n${colors.yellow}全局安装CLI...${colors.reset}`);
  execSync("npm install -g ./cli", { stdio: "inherit" });

  console.log(`\n${colors.green}DeepDanci UI CLI 安装成功!${colors.reset}`);
  console.log(`\n${colors.blue}现在可以使用以下命令:${colors.reset}`);
  console.log(`  ${colors.cyan}deepdanci init${colors.reset} - 初始化项目`);
  console.log(
    `  ${colors.cyan}deepdanci add Button${colors.reset} - 添加Button组件`
  );
  console.log(
    `  ${colors.cyan}deepdanci list${colors.reset} - 列出所有可用组件`
  );
} catch (error) {
  console.error(`\n安装失败: ${error.message}`);
  process.exit(1);
}
