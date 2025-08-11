// Types
import { NotificationChannel } from ".prisma/client";
// Utils
import { randomUUID } from "node:crypto";
import { Hono } from "hono";
// Prisma
import { prisma } from "server/db";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email().optional().nullable(),
  phone: z
    .string()
    .regex(/^\+[1-9]\d{7,14}$/, "Phone must be E.164 format, e.g. +15551234567")
    .optional()
    .nullable(),
  channels: z.array(z.nativeEnum(NotificationChannel)).min(1),
  components: z.array(z.string()).optional(),
  hp: z.string().optional(),
});

const verifySchema = z.object({ token: z.string().uuid() });

const unsubscribeSchema = z.object({
  subscriberId: z.string(),
  token: z.string(),
});

const resendSchema = z
  .object({
    email: z.string().email().optional(),
    phone: z
      .string()
      .regex(/^\+[1-9]\d{7,14}$/)
      .optional(),
  })
  .refine((v) => !!v.email || !!v.phone, {
    message: "Provide email or phone",
    path: ["email"],
  });

const statusPagesRoutes = new Hono()
  .get("/:slugOrId", async (c) => {
    const slugOrId = c.req.param("slugOrId");
    const since = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);

    const page = await prisma.statusPage.findFirst({
      where: {
        isPublic: true,
        isEnabled: true,
        OR: [{ id: slugOrId }, { slug: slugOrId }, { domain: slugOrId }],
      },
      select: {
        id: true,
        name: true,
        slug: true,
        domain: true,
        language: true,
        timezone: true,
        logoUrl: true,
        favicon: true,
        theme: true,
        headerMessage: true,
        footerMessage: true,
        twitterHandle: true,
        supportUrl: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: { components: true, subscribers: true, incidents: true },
        },
        components: {
          orderBy: { order: "asc" },
          select: {
            id: true,
            name: true,
            description: true,
            status: true,
            order: true,
            monitor: {
              select: {
                id: true,
                name: true,
                type: true,
                checks: {
                  where: { checkedAt: { gte: since } },
                  orderBy: { checkedAt: "desc" },
                  select: {
                    id: true,
                    status: true,
                    responseTime: true,
                    statusCode: true,
                    error: true,
                    region: true,
                    checkedAt: true,
                  },
                },
              },
            },
          },
        },
        incidents: {
          select: {
            incident: {
              select: {
                id: true,
                title: true,
                description: true,
                status: true,
                severity: true,
                isScheduled: true,
                scheduledStart: true,
                scheduledEnd: true,
                resolvedAt: true,
                createdAt: true,
                updatedAt: true,
                updates: {
                  orderBy: { createdAt: "asc" },
                  select: {
                    id: true,
                    message: true,
                    status: true,
                    createdAt: true,
                  },
                },
                monitors: {
                  select: {
                    monitor: { select: { id: true, name: true, type: true } },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!page) return c.json({ error: "Status page not found" }, 404);

    const incidents = page.incidents.map((spi) => ({
      ...spi.incident,
      monitors: spi.incident.monitors.map((m) => m.monitor),
    }));

    return c.json({
      id: page.id,
      name: page.name,
      slug: page.slug,
      domain: page.domain,
      language: page.language,
      timezone: page.timezone,
      logoUrl: page.logoUrl,
      favicon: page.favicon,
      theme: page.theme,
      headerMessage: page.headerMessage,
      footerMessage: page.footerMessage,
      twitterHandle: page.twitterHandle,
      supportUrl: page.supportUrl,
      createdAt: page.createdAt,
      updatedAt: page.updatedAt,
      counts: page._count,
      components: page.components.map((cpt) => ({
        id: cpt.id,
        name: cpt.name,
        description: cpt.description,
        status: cpt.status,
        order: cpt.order,
        monitor: cpt.monitor
          ? {
              id: cpt.monitor.id,
              name: cpt.monitor.name,
              type: cpt.monitor.type,
              checks: cpt.monitor.checks,
            }
          : null,
      })),
      incidents,
    });
  })
  .post("/:slugOrId/subscribers", async (c) => {
    const slugOrId = c.req.param("slugOrId");
    const json = await c.req.json().catch(() => null);

    if (!json) return c.json({ error: "Invalid JSON body" }, 400);

    const parsed = bodySchema.safeParse(json);

    if (!parsed.success) {
      return c.json(
        { error: "Invalid payload", details: parsed.error.flatten() },
        400,
      );
    }
    const { email, phone, channels, components, hp } = parsed.data;

    if (hp && hp.trim().length > 0) return c.json({ ok: true }, 200);

    const allowed = new Set<NotificationChannel>([
      NotificationChannel.EMAIL,
      NotificationChannel.SMS,
    ]);
    if (!channels.every((ch) => allowed.has(ch))) {
      return c.json({ error: "Unsupported channel(s)" }, 400);
    }

    if (!email && !phone) {
      return c.json({ error: "Either email or phone is required" }, 400);
    }
    if (channels.includes(NotificationChannel.EMAIL) && !email) {
      return c.json({ error: "EMAIL channel requires email" }, 400);
    }
    if (channels.includes(NotificationChannel.SMS) && !phone) {
      return c.json({ error: "SMS channel requires phone" }, 400);
    }

    const page = await prisma.statusPage.findFirst({
      where: {
        isPublic: true,
        isEnabled: true,
        OR: [{ id: slugOrId }, { slug: slugOrId }, { domain: slugOrId }],
      },
      select: { id: true },
    });

    if (!page) return c.json({ error: "Status page not found" }, 404);

    let safeComponents: string[] = [];
    if (components?.length) {
      const existing = await prisma.statusPageComponent.findMany({
        where: { statusPageId: page.id, id: { in: components } },
        select: { id: true },
      });
      safeComponents = existing.map((c) => c.id);
    }

    const or: Array<{ email?: string; phone?: string }> = [];

    if (email) or.push({ email });
    if (phone) or.push({ phone });
    if (or.length) {
      const dup = await prisma.statusPageSubscriber.findFirst({
        where: { statusPageId: page.id, OR: or },
        select: { id: true },
      });
      if (dup) return c.json({ error: "Subscriber already exists" }, 409);
    }

    const verifyToken = randomUUID();
    const subscriber = await prisma.statusPageSubscriber.create({
      data: {
        statusPageId: page.id,
        email: email ?? null,
        phone: phone ?? null,
        channels,
        components: safeComponents,
        isVerified: false,
        verifyToken,
      },
      select: {
        id: true,
        isVerified: true,
        createdAt: true,
      },
    });

    // TODO: trigger email/SMS verification using verifyToken

    return c.json({ subscriber }, 201);
  })
  .post("/:slugOrId/subscribers/verify", async (c) => {
    const slugOrId = c.req.param("slugOrId");
    const json = await c.req.json().catch(() => null);
    const parsed = verifySchema.safeParse(json);
    if (!parsed.success) return c.json({ error: "Invalid payload" }, 400);

    const page = await prisma.statusPage.findFirst({
      where: {
        isPublic: true,
        isEnabled: true,
        OR: [{ id: slugOrId }, { slug: slugOrId }, { domain: slugOrId }],
      },
      select: { id: true },
    });
    if (!page) return c.json({ error: "Status page not found" }, 404);

    const sub = await prisma.statusPageSubscriber.findFirst({
      where: { statusPageId: page.id, verifyToken: parsed.data.token },
      select: { id: true, isVerified: true },
    });
    if (!sub) return c.json({ error: "Invalid or expired token" }, 400);
    if (sub.isVerified) return c.json({ ok: true }, 200);

    await prisma.statusPageSubscriber.update({
      where: { id: sub.id },
      data: { isVerified: true, verifyToken: null },
    });
    return c.json({ ok: true }, 200);
  })
  .post("/:slugOrId/subscribers/unsubscribe", async (c) => {
    const slugOrId = c.req.param("slugOrId");
    const json = await c.req.json().catch(() => null);
    const parsed = unsubscribeSchema.safeParse(json);
    if (!parsed.success) return c.json({ error: "Invalid payload" }, 400);

    const page = await prisma.statusPage.findFirst({
      where: {
        isPublic: true,
        isEnabled: true,
        OR: [{ id: slugOrId }, { slug: slugOrId }, { domain: slugOrId }],
      },
      select: { id: true },
    });
    if (!page) return c.json({ error: "Status page not found" }, 404);

    const sub = await prisma.statusPageSubscriber.findFirst({
      where: {
        id: parsed.data.subscriberId,
        statusPageId: page.id,
        verifyToken: parsed.data.token,
      },
      select: { id: true },
    });
    if (!sub) return c.json({ error: "Invalid token or subscriber" }, 400);

    await prisma.statusPageSubscriber.delete({ where: { id: sub.id } });
    return c.json({ ok: true }, 200);
  })
  .post("/:slugOrId/subscribers/resend", async (c) => {
    const slugOrId = c.req.param("slugOrId");
    const json = await c.req.json().catch(() => null);
    const parsed = resendSchema.safeParse(json);
    if (!parsed.success) return c.json({ error: "Invalid payload" }, 400);

    const page = await prisma.statusPage.findFirst({
      where: {
        isPublic: true,
        isEnabled: true,
        OR: [{ id: slugOrId }, { slug: slugOrId }, { domain: slugOrId }],
      },
      select: { id: true },
    });
    if (!page) return c.json({ error: "Status page not found" }, 404);

    const sub = await prisma.statusPageSubscriber.findFirst({
      where: {
        statusPageId: page.id,
        OR: [
          ...(parsed.data.email
            ? ([{ email: parsed.data.email }] as const)
            : []),
          ...(parsed.data.phone
            ? ([{ phone: parsed.data.phone }] as const)
            : []),
        ],
      },
      select: { id: true, isVerified: true },
    });
    if (!sub) return c.json({ error: "Subscriber not found" }, 404);
    if (sub.isVerified) return c.json({ ok: true }, 200);

    const token = randomUUID();
    await prisma.statusPageSubscriber.update({
      where: { id: sub.id },
      data: { verifyToken: token },
    });

    // TODO: send email/SMS with verification link containing token
    return c.json({ ok: true }, 200);
  });

export default statusPagesRoutes;
