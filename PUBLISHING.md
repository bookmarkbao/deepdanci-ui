# DeepDanci UI 发布指南

本文档描述了如何发布 DeepDanci UI 到 npm。

## 准备工作

1. 确保组件在本地测试通过
2. 更新版本号（在 `cli/package.json` 和根目录的 `package.json` 文件中）
3. 更新 CHANGELOG.md（如果存在）

## 发布流程

### 1. 登录到 npm

```bash
npm login
```

根据提示输入您的 npm 用户名、密码和邮箱。

### 2. 构建 CLI

```bash
# 切换到仓库根目录
cd /path/to/deepdanci-ui

# 安装依赖
npm install

# 构建 CLI
npm run build:cli
```

### 3. 发布 CLI 包

```bash
# 发布 CLI
npm run publish:cli
```

或者手动发布：

```bash
cd cli
npm publish --access public
```

### 4. 验证发布

发布完成后，验证包是否可以正常安装和使用：

```bash
# 全局安装
npm install -g deepdanci

# 查看可用组件
deepdanci list

# 添加组件
deepdanci add Button
```

## 更新现有版本

如需更新已发布的版本，请按照以下步骤操作：

1. 修改代码
2. 更新版本号（在 `cli/package.json` 中）
3. 重新构建和发布

## 注意事项

- 确保 npm 包名在全局范围内是唯一的
- 使用 `npm deprecate` 命令废弃旧版本（如需要）
- 使用 `npm unpublish` 删除问题版本（仅限发布后 24 小时内）
