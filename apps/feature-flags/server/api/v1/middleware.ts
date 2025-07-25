// Hono

// Utils
import { getMetadata } from "@basestack/utils";
import { createMiddleware } from "hono/factory";
import { verifyProjectRequest } from "./utils/project";

export const ProjectPermissionMiddleware = createMiddleware(async (c, next) => {
  const projectKey = c.req.header("x-project-key");
  const environmentKey = c.req.header("x-environment-key");

  if (!projectKey || !environmentKey) {
    return c.json(
      {
        error: true,
        message: "Missing required headers: x-project-key or x-environment-key",
      },
      { status: 400 },
    );
  }

  const referer = c.req.header("referer") || "/";
  const metadata = getMetadata(c.req.raw);

  const isAllowed = await verifyProjectRequest(projectKey, referer, metadata);

  if (!isAllowed) {
    return c.json(
      {
        error: true,
        message: "You are not allowed to access this resource.",
      },
      { status: 403 },
    );
  }

  await next();
});
