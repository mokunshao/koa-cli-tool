// 可以基于 template 来直接生成
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

module.exports = (config) => {
  const codeTemplate = fs.readFileSync(
    path.resolve(__dirname, "./template/package.ejs")
  );
  const code = ejs.render(codeTemplate.toString(), {
    packageName: config.packageName,
    middleware: config.middleware,
  });
  return prettier.format(code, { parser: "json" });
};
