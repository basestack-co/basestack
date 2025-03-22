// Client
import { Client } from "@upstash/qstash";

export const client = new Client({ token: process.env.QSTASH_TOKEN! });
export const baseUrl = process.env.UPSTASH_WORKFLOW_URL;
