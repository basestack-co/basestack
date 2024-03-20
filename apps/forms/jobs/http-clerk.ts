import { triggerClient } from "libs/trigger";
import { Webhook, WebhookVerificationError } from "svix";
import prisma from "libs/prisma";

const clerk = triggerClient.defineHttpEndpoint({
  id: "clerk.com",
  title: "Clerk",
  source: "clerk.com",
  icon: "clerk",
  verify: async (
    request: Request,
  ): Promise<{ success: boolean; reason?: string }> => {
    const body = await request.text();
    const svixId = request.headers.get("svix-id") ?? "";
    const svixIdTimeStamp = request.headers.get("svix-timestamp") ?? "";
    const svixSignature = request.headers.get("svix-signature") ?? "";

    if (!svixId || !svixIdTimeStamp || !svixSignature) {
      return {
        success: false,
        reason: "Missing svix headers",
      };
    }

    const svixHeaders = {
      "svix-id": svixId,
      "svix-timestamp": svixIdTimeStamp,
      "svix-signature": svixSignature,
    };

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SIGNING_SECRET as string);

    type WebhookEvent = string;

    try {
      wh.verify(body, svixHeaders) as WebhookEvent;

      return {
        success: true,
      };
    } catch (err: unknown) {
      console.log(`❌ Error message: ${(err as Error).message}`);

      if (err instanceof WebhookVerificationError) {
        return {
          success: false,
          reason: err.message,
        };
      }

      return {
        success: false,
        reason: "Unknown error",
      };
    }
  },
});

triggerClient.defineJob({
  id: "http-clerk",
  name: "HTTP Clerk",
  version: "1.0.0",
  enabled: true,
  trigger: clerk.onRequest(),
  run: async (request, io, ctx) => {
    await io.logger.info(`Preparing to save user from Clerk webhook...`);

    const body = await request.json();

    await io.logger.info(`Clerk WebHook body`, body);

    await io.runTask(
      "create-user",
      async () => {
        await prisma.user.create({
          data: {
            externalId: body.data.id,
            email: body.data.email_addresses[0].email_address ?? "",
            name: body.data.first_name,
            image: body.data.image_url,
          },
        });
      },

      { name: "Create User on database" },
    );

    await io.logger.info("✨ User saved successfully! ✨");
  },
});
