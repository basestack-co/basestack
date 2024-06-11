import * as defaults from "./defaults";
import * as plans from "./plans";
import * as flags from "./flags";

const isDev = process.env.NODE_ENV === "development";

const config = {
  isDev,
  ...defaults,
  ...plans,
  ...flags,
};

export default config;
