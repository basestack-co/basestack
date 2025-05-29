import { NextResponse } from "next/server";
// Utils
import {
  RequestError,
  emailToId,
  getMetadata,
  UsageEvent,
  Product,
} from "@basestack/utils";
import { withUsageUpdate } from "server/db/utils/subscription";
// Prisma
import { prisma } from "server/db";
// Vendors
import { qstash, polar } from "@basestack/vendors";
// Utils
import { FormMode, formatFormData, verifyForm } from "./utils";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Origin, Accept",
};

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers });
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ formId: string }> },
) {
  const referer = req.headers.get("referer") || "http://localhost:3003";
  const { formId } = await params;

  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("mode") || "";

  const metadata = getMetadata(req);

  try {
    const form = await verifyForm(formId, referer, metadata);

    if (form?.isEnabled) {
      const externalCustomerId = emailToId(form.adminUserEmail);

      const data = await formatFormData(
        req,
        form.errorUrl,
        form.redirectUrl,
        form.honeypot ?? "",
      );

      if (data) {
        await polar.createUsageEvent(
          UsageEvent.FORM_SUBMISSION,
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

            await withUsageUpdate(tx, form.userId, "submissions", "increment");

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

        if (!!form.webhookUrl) {
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

        if (!!form.emails) {
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
          return NextResponse.json(
            {
              code: 200,
              success: true,
              message: "Your form has been submitted successfully!",
              url: successUrl,
            },
            { status: 200, headers },
          );
        }

        return NextResponse.redirect(successUrl, 303);
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
        return NextResponse.json(
          {
            error: true,
            code: error.code,
            message: error.message,
            url: error.url,
          },
          { status: error.code, headers },
        );
      } else {
        return NextResponse.redirect(
          `${error.url}&message=${error.message}`,
          303,
        );
      }
    } else {
      return NextResponse.json(
        { error: true, message: "An unexpected error occurred." },
        { status: 500, headers },
      );
    }
  }
}
