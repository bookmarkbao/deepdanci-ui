#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");

/**
 * 本脚本用于将项目根目录的components目录复制到CLI包中
 * 确保发布时包含所有组件
 */

async function copyComponents() {
  try {
    // 源目录和目标目录
    const sourceDir = path.join(__dirname, "..", "..", "components");
    const targetDir = path.join(__dirname, "..", "components");

    console.log(`Copying components from ${sourceDir} to ${targetDir}`);

    // 确保目标目录存在
    await fs.ensureDir(targetDir);

    // 复制目录内容
    await fs.copy(sourceDir, targetDir, {
      overwrite: true,
      errorOnExist: false,
      filter: (src) => {
        // 排除测试和开发文件
        const excludePatterns = [
          /\.test\./,
          /\.spec\./,
          /\/__tests__\//,
          /\/node_modules\//,
          /\.git\//,
        ];

        return !excludePatterns.some((pattern) => pattern.test(src));
      },
    });

    console.log("Components copied successfully!");
  } catch (error) {
    console.error(`Error copying components: ${error.message}`);
    process.exit(1);
  }
}

copyComponents();
