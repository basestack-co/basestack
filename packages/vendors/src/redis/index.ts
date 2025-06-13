import { Redis } from "@upstash/redis";

// Only initialize Redis client on the server side
export const client =
  typeof window === "undefined"
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL!,
        token: process.env.UPSTASH_REDIS_REST_TOKEN!,
      })
    : null;
