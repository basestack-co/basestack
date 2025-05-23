// Vendors
import { createAuthClient } from "better-auth/react";
// Plugins
import { polarClient } from "@polar-sh/better-auth";
import { multiSessionClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [multiSessionClient(), polarClient()],
});
