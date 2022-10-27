const common = require("@basestack/config/jest.base.config");

module.exports = {
  ...common,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
