import type { NextApiResponse } from "next";
import { LRUCache } from "lru-cache";

interface Options {
  uniqueTokenPerInterval?: number;
  interval?: number;
}

const rateLimit = (options?: Options) => {
  const { uniqueTokenPerInterval = 500, interval = 60000 } = options || {};
  const tokenCache = new LRUCache<string, number[]>({
    max: uniqueTokenPerInterval,
    ttl: interval,
  });

  return {
    check: async (res: NextApiResponse, limit: number, token: string) => {
      let tokenCount = tokenCache.get(token) || [0];
      const [currentUsage] = tokenCount;

      if (currentUsage === 0) {
        tokenCache.set(token, tokenCount);
      }

      tokenCount[0] += 1;

      const isRateLimited = currentUsage >= limit;

      res.setHeader("X-RateLimit-Limit", limit);
      res.setHeader(
        "X-RateLimit-Remaining",
        isRateLimited ? 0 : limit - currentUsage,
      );

      if (isRateLimited) {
        throw new Error("Rate limit Exceeded");
      }
    },
  };
};

export default rateLimit;
