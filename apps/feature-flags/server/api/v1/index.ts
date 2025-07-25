import { Hono } from "hono";
import { cors } from "hono/cors";
// Utils
import { logger } from "hono/logger";
//  Routes
import flags from "./routes/flags";
import jobs from "./routes/jobs";

const app = new Hono().basePath("/api/v1");

app.use(
  "/flags/*",
  cors({
    origin: "*",
    allowMethods: ["GET"],
    allowHeaders: [
      "Content-Type",
      "referer",
      "x-project-key",
      "x-environment-key",
    ],
    maxAge: 86400,
    credentials: false,
  }),
);

app.use(logger());

export const routes = app.route("/flags", flags).route("/jobs", jobs);

export default app;
