module.exports = {
  rollup(config) {
    //include dependencies
    if (config.output.format === "umd") {
      delete config.external;
    }
    return config;
  },
};
