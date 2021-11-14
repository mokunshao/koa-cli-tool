// 可以基于 template 来直接生成
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

module.exports = (config = {}) => {
  const codeTemplate = fs.readFileSync(
    path.resolve(__dirname, "./template/main.ejs")
  );
  const code = ejs.render(codeTemplate.toString(), {
    static: config.static || true,
    port: config.port,
    middleware: config.middleware,
    packageName: config.packageName,
  });

  return prettier.format(code);
};
