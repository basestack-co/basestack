import { Hono } from "hono";
import { cors } from "hono/cors";
// Utils
import { logger } from "hono/logger";
//  Routes
import statusPages from "./routes/statusPages";
import jobs from "./routes/jobs";
import schedules from "./routes/schedules";

const app = new Hono().basePath("/api/v1");

app.use(
  "/status-pages/*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "referer"],
    maxAge: 86400,
    credentials: false,
  }),
);

app.use(logger());

export const routes = app
  .route("/status-pages", statusPages)
  .route("/jobs", jobs)
  .route("/schedules", schedules);

export default app;
