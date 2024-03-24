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

const formatFormData = (
  fields: formidable.Fields,
  errorUrl: string,
  redirectUrl: string,
) => {
  const url = `${errorUrl}?goBackUrl=${redirectUrl}`;

  // If there are no fields in the request, throw an error
  if (Object.keys(fields).length === 0) {
    throw {
      status: 400,
      data: {
        url,
        message: "Error: No fields found in the request",
      },
    };
  }

  const { _trap, ...data } = Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : value,
    ]),
  );

  // Check if _trap has a non-empty value
  if (typeof _trap === "string" && _trap.trim() !== "") {
    throw {
      status: 400,
      data: {
        url,
        message: "Error: You are a bot!",
      },
    };
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

  return {
    ...current?.form,
    redirectUrl: current?.form.redirectUrl ?? referer,
    successUrl: current?.form.successUrl ?? defaultSuccessUrl,
    errorUrl: current?.form.errorUrl ?? defaultErrorUrl,
    user: current?.user,
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const referer = req.headers.referer ?? "/";
    const { formId, mode } = req.query as { formId: string; mode: string };

    try {
      if (!formId) {
        throw {
          status: 400,
          data: {
            url: `${defaultErrorUrl}?goBackUrl=${referer}`,
            message: "No formId found in the request",
          },
        };
      }

      const { redirectUrl, successUrl, errorUrl, isEnabled, hasRetention } =
        await getFormOnUser(formId, referer);

      // only submit if the form is enabled and has retention
      if (isEnabled && hasRetention) {
        const form = formidable({});
        const [fields, files] = await form.parse(req);
        const data = formatFormData(fields, errorUrl!, redirectUrl!);

        await prisma.submission.create({
          data: {
            formId,
            data,
            metadata: getMetadata(req),
          },
        });
      }

      const success = `${successUrl}?goBackUrl=${redirectUrl}`;

      return mode === "rest"
        ? res.status(200).json({ url: success })
        : res.redirect(307, success);
    } catch (error: any) {
      const message = error.message ?? "Something went wrong";
      const url = error.url ?? referer;
      const errorUrl = `${url}&message=${message}`;

      return mode === "rest"
        ? res.status(error.code ?? 400).json({ url: errorUrl })
        : res.redirect(307, errorUrl);
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
