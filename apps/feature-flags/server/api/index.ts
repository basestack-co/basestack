import { Hono } from "hono";
// Utils
import { logger } from "hono/logger";
// Types
import { Env } from "./types";
//  Routes
import flags from "./routes/flags";
import jobs from "./routes/jobs";

const app = new Hono<Env>().basePath("/api/v1");

app.use(logger());

export const routes = app.route("/flags", flags).route("/jobs", jobs);

export default app;
