// Utils
import {
  type AppEnv,
  emailToId,
  getMetadata,
  Product,
  RequestError,
  UsageEvent,
  config as utilsConfig,
} from "@basestack/utils";
// Vendors
import { polar, qstash } from "@basestack/vendors";
import { Hono } from "hono";
// Prisma
import { prisma } from "server/db";
import { AppMode } from "utils/helpers/general";
// Utils
import { FormMode, formatFormData, verifyForm } from "../utils/form";

const { urls } = utilsConfig;

const productUrl = urls.getAppWithEnv(Product.FORMS, AppMode as AppEnv);

const submissionsRoutes = new Hono().post("/:formId", async (c) => {
  const formId = c.req.param("formId");
  const referer = c.req.header("referer") || productUrl;

  const { searchParams } = new URL(c.req.url);
  const mode = searchParams.get("mode") || "";

  const metadata = getMetadata(c.req.raw);
  try {
    const form = await verifyForm(formId, referer!, metadata);

    if (form?.isEnabled) {
      const externalCustomerId = emailToId(form.adminUserEmail);

      const data = await formatFormData(
        c.req.raw,
        form.errorUrl,
        form.redirectUrl,
        form.honeypot ?? "",
      );

      if (data) {
        await polar.createUsageEvent(
          UsageEvent.FORMS_SUBMISSION,
          externalCustomerId,
          {
            product: Product.FORMS,
            formId,
            adminUserEmail: form.adminUserEmail,
          },
        );

        if (form?.hasRetention) {
          const submission = await prisma.$transaction(async (tx) => {
            const response = await tx.submission.create({
              data: {
                formId,
                data,
                metadata,
              },
              select: {
                id: true,
              },
            });

            return response;
          });

          if (form.hasSpamProtection) {
            await qstash.events.checkDataForSpamEvent({
              userId: form.userId,
              submissionId: submission.id,
              externalCustomerId,
              data,
            });
          }
        }

        if (form.webhookUrl) {
          await qstash.events.sendDataToExternalWebhookEvent({
            url: form.webhookUrl,
            externalCustomerId,
            body: {
              formId,
              name: form.name,
              data,
            },
          });
        }

        if (form.emails) {
          await qstash.events.sendEmailEvent({
            template: "new-submission",
            to: form.emails.split(",").map((email) => email.trim()),
            subject: `New form submission received for ${form.name}`,
            externalCustomerId,
            props: {
              formName: form.name,
              content: data,
              formId,
            },
          });
        }

        const queryString = form.hasDataQueryString
          ? `&data=${encodeURI(JSON.stringify(data))}`
          : "";

        const successUrl = `${form?.successUrl}?goBackUrl=${form?.redirectUrl}${queryString}`;

        if (mode === FormMode.REST) {
          return c.json(
            {
              code: 200,
              success: true,
              message: "Your form has been submitted successfully!",
              url: successUrl,
            },
            { status: 200 },
          );
        }

        return c.redirect(successUrl, 303);
      }
    } else {
      throw new RequestError({
        code: 409,
        url: `${form?.errorUrl}?goBackUrl=${form?.redirectUrl}`,
        message:
          "Error: The form is disabled and not able to accept submissions.",
      });
    }
  } catch (error) {
    if (error instanceof RequestError) {
      if (mode === FormMode.REST) {
        return c.json(
          {
            error: true,
            code: error.code,
            message: error.message,
            url: error.url,
          },
          { status: error.code as any },
        );
      } else {
        return c.redirect(`${error.url}&message=${error.message}`, 303);
      }
    } else {
      return c.json(
        { error: true, message: "An unexpected error occurred." },
        { status: 500 },
      );
    }
  }
});

export default submissionsRoutes;
