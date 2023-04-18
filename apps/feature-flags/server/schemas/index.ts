import projectSchema from "./project";
import environmentSchema from "./environment";
import flagSchema from "./flag";
import historySchema from "./history";
import userSchema from "./user";

const schemas = {
  project: projectSchema,
  environment: environmentSchema,
  flag: flagSchema,
  history: historySchema,
  user: userSchema,
};

export default schemas;
