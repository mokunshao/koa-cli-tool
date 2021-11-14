#!/usr/bin/env node


const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
const initOptions = require("./options");
const createIndexContent = require("./createIndexContent.js");
const createPackageContent = require("./createPackageContent.js");
const { adapter, config } = require("./config");

(async () => {
  const options = await initOptions();

  adapter(options);

  // 1. 创建文件夹
  fs.mkdirSync(path.resolve(__dirname, process.cwd(), config.packageName));
  console.log(chalk.hex("#7FFF00").bold(`创建项目 ${config.packageName}`));

  // 2. 添加 index.js
  fs.writeFileSync(
    path.resolve(getRootPath(), "index.js"),
    createIndexContent({
      ...config,
    })
  );
  console.log(chalk.hex("#7FFF00").bold(`创建入口文件 index.js`));

  // 3. 创建 package.json
  fs.writeFileSync(
    path.resolve(getRootPath(), "package.json"),
    createPackageContent({ ...config })
  );
  console.log(chalk.hex("#7FFF00").bold(`创建 package.json`));

  // 3.1
  if (config.middleware.static) {
    fs.mkdirSync(path.resolve(getRootPath(), "static"));
  }
  // 3.2
  if (config.middleware.views) {
    fs.mkdirSync(path.resolve(getRootPath(), "views"));
  }

  // 4. 安装
  installDependency();
})();

function installDependency() {
  const execa = require("execa");

  execa(`yarn`, {
    cwd: getRootPath(),
    stdio: [2, 2, 2],
  });
}

function getRootPath() {
  return path.resolve(__dirname, process.cwd(), config.packageName);
}
