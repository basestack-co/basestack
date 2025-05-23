// Polar
import { Polar } from "@polar-sh/sdk";
// Utils
import { AppMode } from "utils/helpers/general";

export const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server: AppMode === "production" ? "production" : "sandbox",
});
