// Auth
import { auth } from "server/auth";
// Vendors
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);
