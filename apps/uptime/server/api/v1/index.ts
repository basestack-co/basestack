import { Hono } from "hono";
// Utils
import { logger } from "hono/logger";
//  Routes
import jobs from "./routes/jobs";

const app = new Hono().basePath("/api/v1");

app.use(logger());

export const routes = app.route("/jobs", jobs);

export default app;
