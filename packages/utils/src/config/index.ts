import * as defaults from "./defaults";
import * as flags from "./flags";
import * as permissions from "./permissions";
import * as plans from "./plans";

const isDev = process.env.NODE_ENV === "development";

const config = {
  isDev,
  ...defaults,
  ...plans,
  ...flags,
  ...permissions,
};

export default config;
