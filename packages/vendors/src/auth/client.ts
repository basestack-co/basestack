// Auth

// Plugins
import { multiSessionClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const client = createAuthClient({
  plugins: [multiSessionClient()],
});
