module.exports = {
  clearMocks: true,
  testEnvironment: "jsdom",
  coverageDirectory: "coverage",
  roots: ["<rootDir>"],
  testMatch: ["**/?(*.)+(spec).+(ts|tsx|js|jsx)"],
  transform: { "^.+\\.(ts|tsx|jsx)$": "ts-jest" },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  modulePathIgnorePatterns: ["/dist/"],
};
