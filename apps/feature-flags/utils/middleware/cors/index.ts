// Types
import type { NextApiRequest, NextApiResponse } from "next";
// Utils
import Cors from "cors";

const cors = Cors({
  methods: ["GET"],
  origin: process.env.API_ACCESS_CONTROL_ALLOW_ORIGIN ?? "*",
  optionsSuccessStatus: 200,
});

function checkCors(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const withCors = (
  handler: (req: NextApiRequest, res: NextApiResponse) => void,
) => {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
      await checkCors(req, res, cors);

      return handler(req, res);
    } catch {
      res.status(403).json({ error: "CORS Error" });
    }
  };
};

export default withCors;
