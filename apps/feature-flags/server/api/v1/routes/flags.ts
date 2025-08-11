import { Hono } from "hono";
// Prisma
import { getDb } from "server/db";
// Middleware
import { ProjectPermissionMiddleware } from "../middleware";

const flagsRoutes = new Hono()
  .use(ProjectPermissionMiddleware)
  .get("/", async (c) => {
    try {
      const projectKey = c.req.header("x-project-key");
      const environmentKey = c.req.header("x-environment-key");
      const prisma = getDb();

      const flags = await prisma.flag.findMany({
        where: {
          environment: {
            key: environmentKey,
            project: {
              key: projectKey,
            },
          },
        },
        select: {
          slug: true,
          enabled: true,
          payload: true,
          expiredAt: true,
          description: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return c.json(
        { flags },
        {
          status: 200,
        }
      );
    } catch (error: any) {
      return c.json(
        {
          error: true,
          message: "Something went wrong, please try again later.",
        },
        { status: error.code ?? 400 }
      );
    }
  })
  .get("/:slug", async (c) => {
    try {
      const slug = c.req.param("slug");
      const projectKey = c.req.header("x-project-key");
      const environmentKey = c.req.header("x-environment-key");

      const prisma = getDb();

      const flag = await prisma.flag.findFirst({
        where: {
          slug,
          environment: {
            key: environmentKey,
            project: {
              key: projectKey,
            },
          },
        },
        select: {
          slug: true,
          enabled: true,
          payload: true,
          expiredAt: true,
          description: true,
        },
      });

      if (!flag) {
        return c.json(
          {
            enabled: false,
            error: true,
            message: `Flag with slug ${slug} does not exist`,
          },
          { status: 404 }
        );
      }

      return c.json(flag, {
        status: 200,
      });
    } catch (error: any) {
      return c.json(
        {
          error: true,
          message: "Something went wrong, please try again later.",
        },
        { status: error.code ?? 400 }
      );
    }
  });

export default flagsRoutes;
