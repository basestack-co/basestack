// Types
import { Prisma, MonitorStatus } from ".prisma/client";
import {
  createTRPCRouter,
  protectedProcedure,
  withProjectRestrictions,
} from "server/trpc";
// Utils
import { z } from "zod";

export const projectMonitorChecksRouter = createTRPCRouter({
  list: protectedProcedure
    .use(withProjectRestrictions({ roles: [] }))
    .input(
      z.object({
        projectId: z.string(),
        monitorId: z.string(),
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        search: z.string().optional().nullable(),
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 10;

      const s = input.search?.trim();
      const orFilters: Prisma.MonitorCheckWhereInput[] = [];

      if (s && s.length > 0) {
        const num = Number(s);
        const isNum = !Number.isNaN(num);
        const statusKey = s.toUpperCase() as keyof typeof MonitorStatus;
        const statusMatch = MonitorStatus[statusKey];

        orFilters.push(
          { region: { contains: s, mode: Prisma.QueryMode.insensitive } },
          { error: { contains: s, mode: Prisma.QueryMode.insensitive } },
          ...(statusMatch ? [{ status: statusMatch }] : []),
          ...(isNum
            ? [
                { statusCode: num },
                { responseTime: num },
                { responseSize: num },
              ]
            : [])
        );
      }

      const where: Prisma.MonitorCheckWhereInput = {
        monitorId: input.monitorId,
        monitor: { projectId: input.projectId },
        ...(orFilters.length ? { OR: orFilters } : {}),
      };

      const [total, checks] = await ctx.prisma.$transaction([
        ctx.prisma.monitorCheck.count({ where }),
        ctx.prisma.monitorCheck.findMany({
          where,
          take: limit + 1,
          cursor: input.cursor ? { id: input.cursor } : undefined,
          skip: input.cursor ? 1 : 0,
          orderBy: [{ checkedAt: "desc" }, { id: "desc" }],
          select: {
            id: true,
            status: true,
            responseTime: true,
            responseSize: true,
            statusCode: true,
            error: true,
            checkedAt: true,
          },
        }),
      ]);

      let nextCursor: typeof input.cursor | undefined;

      if (checks.length > limit) {
        const nextItem = checks.pop();
        nextCursor = nextItem!.id;
      }

      return { checks, nextCursor, total };
    }),
  graph: protectedProcedure
    .use(withProjectRestrictions({ roles: [] }))
    .input(
      z.object({
        projectId: z.string(),
        monitorId: z.string(),
        range: z.enum(["day", "week", "month"]).default("day"),
      })
    )
    .query(async ({ ctx, input }) => {
      const now = new Date();
      const from =
        input.range === "day"
          ? new Date(now.getTime() - 24 * 60 * 60 * 1000)
          : input.range === "week"
            ? new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
            : new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      const unit =
        input.range === "day"
          ? Prisma.sql`'minute'`
          : input.range === "week"
            ? Prisma.sql`'hour'`
            : Prisma.sql`'day'`;

      const rows = await ctx.prisma.$queryRaw<
        Array<{
          bucket: Date;
          responseTimeAvg: number | null;
          responseSizeAvg: number | null;
          statusCodeAvg: number | null;
          samples: bigint;
          upCount: bigint;
          downCount: bigint;
          errorCount: bigint;
        }>
      >(Prisma.sql`
        SELECT
          date_trunc(${unit}, mc."checkedAt") AS bucket,
          AVG(mc."responseTime")         AS "responseTimeAvg",
          AVG(mc."responseSize")         AS "responseSizeAvg",
          AVG(mc."statusCode")           AS "statusCodeAvg",
          COUNT(*)                       AS samples,
          SUM(CASE WHEN mc."status" = 'UP' THEN 1 ELSE 0 END)                        AS "upCount",
          SUM(CASE WHEN mc."status" = 'DOWN' THEN 1 ELSE 0 END)                      AS "downCount",
          SUM(CASE WHEN mc."status" IN ('ERROR','TIMEOUT') THEN 1 ELSE 0 END)        AS "errorCount"
        FROM "MonitorCheck" mc
        JOIN "Monitor" m ON m."id" = mc."monitorId"
        WHERE mc."monitorId" = ${input.monitorId}
          AND m."projectId" = ${input.projectId}
          AND mc."checkedAt" >= ${from}
        GROUP BY 1
        ORDER BY 1 ASC
      `);

      const data = rows.map((r) => ({
        t: new Date(r.bucket).toISOString(),
        responseTime:
          r.responseTimeAvg !== null ? Number(r.responseTimeAvg) : null,
        responseSize:
          r.responseSizeAvg !== null ? Number(r.responseSizeAvg) : null,
        statusCode:
          r.statusCodeAvg !== null ? Math.round(Number(r.statusCodeAvg)) : null,
        up: Number(r.upCount),
        down: Number(r.downCount),
        error: Number(r.errorCount),
        samples: Number(r.samples),
      }));

      return {
        range: input.range,
        from: from.toISOString(),
        to: now.toISOString(),
        unit:
          input.range === "day"
            ? "minute"
            : input.range === "week"
              ? "hour"
              : "day",
        data,
      };
    }),
});
