import { Hono } from "hono";
import { cors } from "hono/cors";
// Utils
import { logger } from "hono/logger";
import jobs from "./routes/jobs";
//  Routes
import submissions from "./routes/submissions";
// Types
import { Env } from "./types";

const app = new Hono<Env>().basePath("/api/v1");

app.use(
  "/s/*",
  cors({
    origin: "*",
    allowMethods: ["POST"],
    allowHeaders: ["Content-Type", "referer"],
    maxAge: 86400,
    credentials: false,
  }),
);

app.use(logger());

export const routes = app.route("/s", submissions).route("/jobs", jobs);

export default app;
