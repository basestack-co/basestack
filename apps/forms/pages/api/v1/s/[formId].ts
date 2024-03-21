import type { NextApiRequest, NextApiResponse } from "next";
// Utils
import formidable from "formidable";
import requestIp from "request-ip";
// Prisma
import prisma from "libs/prisma";

// import { z } from "zod";

export const config = {
  api: {
    bodyParser: false,
  },
};

/* const formDataSchema = z.object({
  email: z.string().email(),
  message: z.string(),
});
const validations = formDataSchema.parse(formData); */

const formatFormData = (fields: formidable.Fields) => {
  // If there are no fields in the request, throw an error
  if (Object.keys(fields).length === 0) {
    throw new Error("Error: No fields found in the request");
  }

  const { _trap, ...data } = Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : value,
    ]),
  );

  // Check if _trap has a non-empty value
  if (typeof _trap === "string" && _trap.trim() !== "") {
    throw new Error("Error: You are a bot!");
  }

  return data;
};

const getMetadata = (req: NextApiRequest) => {
  const ip = requestIp.getClientIp(req);

  return {
    ip,
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const referer = req.headers.referer ?? "/";

    try {
      const { formId } = req.query as { formId: string };

      if (!formId) {
        throw new Error("Error: No formId found in the request");
      }

      const form = formidable({});
      const [fields, files] = await form.parse(req);
      const formData = formatFormData(fields);

      await prisma.submission.create({
        data: {
          formId,
          data: formData,
          metadata: getMetadata(req),
        },
      });

      res.redirect(307, `/form/status/success?goBackUrl=${referer}`);
    } catch (error: any) {
      const message = error.message ?? "Something went wrong";
      res.redirect(
        307,
        `/form/status/error?message=${message}&goBackUrl=${referer}`,
      );
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

export default handler;
