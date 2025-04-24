/**
 * 这个文件会被复制到用户项目中，
 * 所以保持简单并只依赖必要的包
 */

/**
 * Merges class names with tailwind-merge
 * @param inputs class name values to merge
 * @returns merged class name string
 */
export function cn(...inputs: any[]): string {
  // 如果用户已经安装了 clsx 和 tailwind-merge，使用它们
  try {
    // 动态导入，避免直接依赖
    const clsx = require("clsx");
    const { twMerge } = require("tailwind-merge");
    return twMerge(clsx(inputs));
  } catch (e) {
    // 简化的合并逻辑作为后备
    return inputs.filter(Boolean).join(" ").trim().replace(/\s+/g, " ");
  }
}
