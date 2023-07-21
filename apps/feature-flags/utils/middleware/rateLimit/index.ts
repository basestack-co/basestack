// Types
import type { NextApiRequest, NextApiResponse } from "next";
// Cache
import rateLimit from "./cache";
import * as process from "process";

const defaultInterval = 60 * 1000; // 60 seconds
const defaultUniqueTokenPerInterval = 1000; // Max users per second

const limiter = rateLimit({
  interval: Number(process.env.RATE_LIMIT_WINDOW_MS) ?? defaultInterval,
  uniqueTokenPerInterval:
    Number(process.env.RATE_LIMIT_UNIQUE_TOKEN_PER_SECOND) ??
    defaultUniqueTokenPerInterval,
});

const withRateLimit = (
  handler: (req: NextApiRequest, res: NextApiResponse) => void,
) => {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
      await limiter.check(
        res,
        Number(process.env.RATE_LIMIT_MAX) ?? 60,
        "FLAGS_CACHE_TOKEN",
      );
      return handler(req, res);
    } catch {
      res.status(429).json({ error: "Rate limit Exceeded" });
    }
  };
};

export default withRateLimit;
