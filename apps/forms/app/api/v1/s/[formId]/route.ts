import { NextResponse } from "next/server";
// import { redirect } from 'next/navigation'
// Utils
import { PlanTypeId, config as utilsConfig } from "@basestack/utils";
import { withUsageUpdate } from "server/db/utils/subscription";
// Prisma
import { prisma } from "server/db";
// Jobs
import {
  sendEmailEvent,
  sendDataToExternalWebhookEvent,
  checkDataForSpamEvent,
} from "libs/qstash";
// Utils
import {
  FormError,
  FormMode,
  getMetadata,
  formatFormData,
  verifyForm,
} from "./utils";

const { hasFormPlanFeature } = utilsConfig.plans;

// redirect('https://nextjs.org/')

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST",
  "Access-Control-Allow-Headers": "Content-Type, Origin, Accept",
};

export async function POST(
  req: Request,
  { params }: { params: Promise<{ formId: string }> },
) {
  const referer = req.headers.get("referer") || "/";
  const { formId } = await params;

  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("mode") || "";

  const metadata = getMetadata(req);

  try {
    const form = await verifyForm(formId, referer, metadata);

    if (form?.isEnabled) {
      const planId = form.usage.planId as PlanTypeId;

      const data = await formatFormData(
        req,
        form.errorUrl,
        form.redirectUrl,
        form.honeypot ?? "",
      );

      if (data) {
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

          if (
            form.hasSpamProtection &&
            hasFormPlanFeature(planId, "hasSpamProtection")
          ) {
            await checkDataForSpamEvent({
              submissionId: submission.id,
              data,
            });
          }
        }

        if (!!form.webhookUrl && hasFormPlanFeature(planId, "hasWebhooks")) {
          await sendDataToExternalWebhookEvent({
            url: form.webhookUrl,
            body: {
              formId,
              name: form.name,
              data,
            },
          });
        }

        if (
          !!form.emails &&
          hasFormPlanFeature(planId, "hasEmailNotifications")
        ) {
          await sendEmailEvent({
            template: "new-submission",
            to: form.emails.split(",").map((email) => email.trim()),
            subject: `New form submission received for ${form.name}`,
            props: {
              formName: form.name,
              content: data,
              formId,
            },
          });
        }

        const queryString =
          form.hasDataQueryString &&
          hasFormPlanFeature(planId, "hasDataQueryString")
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

        return NextResponse.redirect(successUrl, 307);
      }
    } else {
      throw new FormError({
        code: 409,
        url: `${form?.errorUrl}?goBackUrl=${form?.redirectUrl}`,
        message:
          "Error: The form is disabled and not able to accept submissions.",
      });
    }
  } catch (error) {
    if (error instanceof FormError) {
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
        return NextResponse.redirect(error.url, 307);
      }
    } else {
      return NextResponse.json(
        { error: true, message: "An unexpected error occurred." },
        { status: 500, headers },
      );
    }
  }
}
