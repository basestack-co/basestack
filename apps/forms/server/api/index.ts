import { Hono } from "hono";
// Utils
import { logger } from "hono/logger";
// Types
import { Env } from "./types";
//  Routes
import submissions from "./routes/submissions";
import jobs from "./routes/jobs";

const app = new Hono<Env>().basePath("/api/v1");

app.use(logger());

export const routes = app.route("/s", submissions).route("/jobs", jobs);

export default app;
