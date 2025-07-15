// Types
import type { AppType } from "server/api/v1";
// Vendors
import { hc } from "hono/client";

export const client = hc<AppType>("http://localhost:3003/");
