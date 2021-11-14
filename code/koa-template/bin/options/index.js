const inquirer = require("inquirer");
const packageName = require("./question/packageName");
const port = require("./question/port");
const selectMiddleware = require('./question/selectMiddleware');

module.exports = async () => {
  const options = await inquirer.prompt([packageName(), port(),selectMiddleware()]);

  return options;
};



