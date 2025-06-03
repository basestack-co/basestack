// Auth
import { createAuthClient } from "better-auth/react";
// Plugins
import { multiSessionClient } from "better-auth/client/plugins";

export const client = createAuthClient({
  plugins: [multiSessionClient()],
});
