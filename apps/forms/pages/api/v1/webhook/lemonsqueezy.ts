import type { NextApiRequest, NextApiResponse } from "next";
// Utils
import Cors from "cors";
import {
  withCors,
  withHeaders,
  withSignatureVerification,
} from "@basestack/utils";
// Jobs
import { updateSubsTask, UpdateSubsTaskPayload } from "libs/trigger/jobs";

const cors = Cors({
  methods: ["POST"],
  origin: ["https://basestack.co", "https://lemonsqueezy.com"],
  optionsSuccessStatus: 200,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const body = req.body as UpdateSubsTaskPayload;

    await updateSubsTask.trigger(body, {
      tags: [
        `subscriptionEvent:${body.meta.event_name}`,
        `subscriptionCustomerId:${body.data.attributes.customer_id}`,
        `subscriptionProductId:${body.data.attributes.product_id}`,
      ],
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      code: 405,
      error: true,
      message: `The HTTP method is not supported at this route.`,
    });
  }
};

export default withCors(
  cors,
  withHeaders(
    ["x-signature"],
    withSignatureVerification(
      "x-signature",
      process.env.LEMONSQUEEZY_SIGNATURE_SECRET!,
      handler,
    ),
  ),
);
