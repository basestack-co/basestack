// Types
import type { NextApiRequest, NextApiResponse } from "next";

export const checkCors = (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (
    req: NextApiRequest,
    res: NextApiResponse,
    next: (result?: any) => void,
  ) => void,
) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
};

export const withCors = (
  cors: (
    req: NextApiRequest,
    res: NextApiResponse,
    next: (result?: any) => void,
  ) => void,
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
