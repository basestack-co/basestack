// Vendors
import { createAuthClient } from "better-auth/react";
// Plugins
import { multiSessionClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [multiSessionClient()],
});
