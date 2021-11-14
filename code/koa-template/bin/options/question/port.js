const { defaultConfig } = require("../../config");

module.exports = () => {
  return {
    type: "input",
    name: "port",
    message: "set server port number",
    default() {
      return defaultConfig.port;
    },
  };
};
