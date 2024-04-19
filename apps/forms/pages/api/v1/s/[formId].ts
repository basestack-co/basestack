import type { NextApiRequest, NextApiResponse } from "next";
// Utils
import formidable from "formidable";
import requestIp from "request-ip";
import Cors from "cors";
import { withCors } from "@basestack/utils";
// import { z } from "zod";
// Prisma
import prisma from "libs/prisma";

const defaultSuccessUrl = "/form/status/success";
const defaultErrorUrl = "/form/status/error";

export enum FormMode {
  REST = "rest",
}

export const config = {
  api: {
    bodyParser: false,
  },
};

// More at https://github.com/expressjs/cors
const cors = Cors({
  methods: ["POST"],
  origin: "*",
  optionsSuccessStatus: 200,
});

/* const formDataSchema = z.object({
  email: z.string().email(),
  message: z.string(),
});
const validations = formDataSchema.parse(formData); */

const handleError = (
  res: NextApiResponse,
  error: { message: string; url: string; code?: number },
  mode: string,
  referer: string = "/",
) => {
  const message = error.message || "Something went wrong";
  const url = error.url || referer;
  const errorUrl = `${url}&message=${encodeURI(message)}`;
  const code = error.code || 400;

  return mode === FormMode.REST
    ? res.status(code).json({ error: true, code, message, url: errorUrl })
    : res.redirect(307, errorUrl);
};

const formatFormData = async (
  req: NextApiRequest,
  res: NextApiResponse,
  errorUrl: string,
  redirectUrl: string,
  referer: string = "/",
  mode: string,
) => {
  const f = formidable({});
  const [fields, files] = await f.parse(req);
  const url = `${errorUrl}?goBackUrl=${redirectUrl}`;

  // If there are no fields in the request, throw an error
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
  }

  // TODO: check here for the custom honeypot field

  const { _trap, ...data } = Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : value,
    ]),
  );

  // Check if _trap has a non-empty value
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
  }

  return data;
};

const getMetadata = (req: NextApiRequest) => {
  const ip = requestIp.getClientIp(req);

  return {
    ip,
  };
};

const getFormOnUser = async (formId: string, referer: string) => {
  const current = await prisma.formOnUsers.findFirst({
    where: {
      formId: formId,
    },
    select: {
      form: {
        select: {
          isEnabled: true,
          hasRetention: true,
          redirectUrl: true,
          successUrl: true,
          errorUrl: true,
          webhookUrl: true,
          rules: true,
          hasSpamProtection: true,
          hasDataQueryString: true,
          honeypot: true,
          blockIpAddresses: true,
          emails: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!current) {
    return null;
  }

  return {
    ...current?.form,
    redirectUrl: current?.form.redirectUrl || referer,
    successUrl: current?.form.successUrl || defaultSuccessUrl,
    errorUrl: current?.form.errorUrl || defaultErrorUrl,
    user: current?.user,
  };
};

const verifyForm = async (
  res: NextApiResponse,
  formId: string,
  referer: string,
  mode: string,
) => {
  // If there is no formId in the request, throw an error
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
  }

  const form = await getFormOnUser(formId, referer);

  // If there is no form found with the ID in the request, throw an error
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
  }

  // TODO: check here block IP addresses from the user form

  // TODO: check here for valid website urls from the user

  return form;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const referer = req.headers.referer || "/";
    const { formId, mode } = req.query as { formId: string; mode: string };

    try {
      const form = await verifyForm(res, formId, referer, mode);

      if (form?.isEnabled) {
        const data = await formatFormData(
          req,
          res,
          form.errorUrl,
          form.redirectUrl,
          referer,
          mode,
        );

        if (form?.hasRetention) {
          await prisma.submission.create({
            data: {
              formId,
              data,
              metadata: getMetadata(req),
            },
          });
        }

        if (!!form.webhookUrl) {
          console.log("Trigger the webhook background job");
        }

        if (form.hasSpamProtection) {
          console.log(
            "Check if the form has spam protection with the background job",
          );
        }

        if (!!form.emails) {
          console.log("Send email to the form owner with background job");
        }
      }

      // TODO: check here if the user has hasDataQueryString enabled to pass the data to the successUrl

      const successUrl = `${form?.successUrl}?goBackUrl=${form?.redirectUrl}`;

      return mode === FormMode.REST
        ? res.status(200).json({
            code: 200,
            success: true,
            message: "Your form has been submitted successfully!",
            url: successUrl,
          })
        : res.redirect(307, successUrl);
    } catch (error: any) {
      return handleError(res, error, mode, referer);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      code: 405,
      error: true,
      message: `The HTTP method is not supported at this route.`,
    });
  }
};

export default withCors(cors, handler);
