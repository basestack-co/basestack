import { NextRequest, NextResponse } from "next/server";
// Utils
import formidable from "formidable";
import requestIp from "request-ip";
import Cors from "cors";
import { withCors, PlanTypeId, config as utilsConfig } from "@basestack/utils";
import { withUsageUpdate } from "libs/prisma/utils/subscription";
// Prisma
import { prisma } from "server/db";
// Jobs
import {
  sendEmailEvent,
  sendDataToExternalWebhookEvent,
  checkDataForSpamEvent,
} from "libs/qstash";

const { hasFormPlanFeature, getFormLimitByKey } = utilsConfig.plans;

const defaultSuccessUrl = "/form/status/success";
const defaultErrorUrl = "/form/status/error";

export enum FormMode {
  REST = "rest",
}

// Disable body parsing for this route
export const config = {
  api: {
    bodyParser: false,
  },
};

// Initialize CORS
const cors = Cors({
  methods: ["POST"],
  origin: "*",
  optionsSuccessStatus: 200,
});

const handleError = (
  res: NextResponse,
  error: { message: string; url: string; code?: number },
  mode: string,
  referer: string = "/",
) => {
  const message = error.message || "Something went wrong";
  const url = error.url || referer;
  const errorUrl = `${url}&message=${encodeURIComponent(message)}`;
  const code = error.code || 400;

  return mode === FormMode.REST
    ? NextResponse.json(
        { error: true, code, message, url: errorUrl },
        { status: code },
      )
    : NextResponse.redirect(errorUrl, 307);
};

const formatFormData = async (
  req: NextRequest,
  res: NextResponse,
  errorUrl: string,
  redirectUrl: string,
  referer: string = "/",
  mode: string,
  honeypot: string = "_trap",
) => {
  const f = formidable({});
  const [fields, files] = await f.parse(req);
  const url = `${errorUrl}?goBackUrl=${redirectUrl}`;

  if (Object.keys(fields).length === 0) {
    handleError(
      res,
      {
        url,
        message: "Error: No fields found in the request",
      },
      mode,
      referer,
    );
    return null;
  }

  const { [honeypot]: _trap, ...data } = Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : value,
    ]),
  );

  if (typeof _trap === "string" && _trap.trim() !== "") {
    handleError(
      res,
      {
        url,
        message: "Error: You are a bot!",
      },
      mode,
      referer,
    );
    return null;
  }

  return data;
};

const getMetadata = (req: NextRequest) => {
  const ip = requestIp.getClientIp(req);

  return {
    ip,
    referer: req.headers.get("referer") || "/",
    userAgent: req.headers.get("user-agent") || "",
    acceptLanguage: req.headers.get("accept-language") || "",
  };
};

const getFormOnUser = async (formId: string, referer: string) => {
  const current = await prisma.formOnUsers.findFirst({
    where: {
      formId: formId,
    },
    select: {
      form: {
        omit: {
          createdAt: true,
          updatedAt: true,
          id: true,
          rules: true,
        },
      },
      user: {
        select: {
          id: true,
          subscription: {
            select: {
              planId: true,
              submissions: true,
            },
          },
        },
      },
    },
  });

  if (!current) {
    return null;
  }

  return {
    ...current.form,
    redirectUrl: current.form.redirectUrl || referer,
    successUrl: current.form.successUrl || defaultSuccessUrl,
    errorUrl: current.form.errorUrl || defaultErrorUrl,
    userId: current.user.id,
    usage: current.user.subscription || {
      planId: PlanTypeId.FREE,
      submissions: 0,
    },
  };
};

const verifyForm = async (
  res: NextResponse,
  formId: string,
  referer: string,
  mode: string,
  metadata: { ip: string | null },
) => {
  if (!formId) {
    handleError(
      res,
      {
        url: `${defaultErrorUrl}?goBackUrl=${referer}`,
        message: "No formId found in the request",
      },
      mode,
      referer,
    );
    return;
  }

  const form = await getFormOnUser(formId, referer);

  if (!form) {
    handleError(
      res,
      {
        code: 404,
        url: `${defaultErrorUrl}?goBackUrl=${referer}`,
        message: "Error: No form found with the ID in the request",
      },
      mode,
      referer,
    );
    return;
  }

  if (form.isEnabled) {
    const planId = form.usage.planId as PlanTypeId;

    if (form.usage.submissions >= getFormLimitByKey(planId, "submissions")) {
      handleError(
        res,
        {
          code: 403,
          url: `${form.errorUrl}?goBackUrl=${form.redirectUrl}`,
          message:
            "Error: Form submission limit exceeded. Please consider upgrading.",
        },
        mode,
        referer,
      );
      return;
    }

    if (form.websites && hasFormPlanFeature(planId, "hasWebsites")) {
      const websites = form.websites.split(",");
      const isValid = websites.some((website) => referer.includes(website));

      if (!isValid) {
        handleError(
          res,
          {
            code: 403,
            url: `${form.errorUrl}?goBackUrl=${form.redirectUrl}`,
            message: "Error: The website is not allowed to submit the form",
          },
          mode,
          referer,
        );
        return;
      }
    }

    if (
      form.blockIpAddresses &&
      metadata?.ip &&
      hasFormPlanFeature(planId, "hasBlockIPs")
    ) {
      const blockIpAddresses = form.blockIpAddresses.split(",");
      const isBlocked = blockIpAddresses.some((ip) => ip === metadata.ip);

      if (isBlocked) {
        handleError(
          res,
          {
            code: 403,
            url: `${form.errorUrl}?goBackUrl=${form.redirectUrl}`,
            message:
              "Error: Your IP address is blocked from submitting the form",
          },
          mode,
          referer,
        );
        return;
      }
    }
  }

  return form;
};

export async function POST(req: NextRequest) {
  const referer = req.headers.get("referer") || "/";
  const url = new URL(req.url);
  const formId = url.searchParams.get("formId") || "";
  const mode = url.searchParams.get("mode") || FormMode.REST;
  const metadata = getMetadata(req);

  try {
    const form = await verifyForm(req, formId, referer, mode, metadata);

    if (form && form.isEnabled) {
      // Rest of the handler logic goes here
    }
  } catch (error: any) {
    return handleError(res, error, mode, referer);
  }
}
