// Types
import type { NextApiRequest, NextApiResponse } from "next";
// Utils
import requestIp from "request-ip";
// Cache
import rateLimit from "./cache";
import * as process from "process";

const defaultInterval = 60000; // 60 seconds
const defaultUniqueTokenPerInterval = 2000; // Max users per second

const limiter = rateLimit({
  interval: Number(process.env.API_RATE_LIMIT_WINDOW_MS) ?? defaultInterval,
  uniqueTokenPerInterval:
    Number(process.env.API_RATE_LIMIT_UNIQUE_TOKEN_PER_SECOND) ??
    defaultUniqueTokenPerInterval,
});

const withRateLimit = (
  handler: (req: NextApiRequest, res: NextApiResponse) => void,
) => {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
      const identifier = requestIp.getClientIp(req);
      await limiter.check(
        res,
        Number(process.env.API_RATE_LIMIT_MAX) ?? 120,
        `${identifier}`,
      );
      return handler(req, res);
    } catch {
      res.status(429).json({ error: "Rate limit Exceeded" });
    }
  };
};

export default withRateLimit;
