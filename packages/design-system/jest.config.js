const common = require("config/jest.base.config");

module.exports = {
  ...common,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
