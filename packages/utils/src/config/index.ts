import * as defaults from "./defaults";
import * as flags from "./flags";
import * as plans from "./plans";

const isDev = process.env.NODE_ENV === "development";

const config = {
  isDev,
  ...defaults,
  ...plans,
  ...flags,
};

export default config;
