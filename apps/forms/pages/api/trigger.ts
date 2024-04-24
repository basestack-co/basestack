import { createPagesRoute } from "@trigger.dev/nextjs";
import { triggerClient } from "libs/trigger";

import "libs/trigger/jobs";

//uncomment this to set a higher max duration (it must be inside your plan limits).
// Full docs: https://vercel.com/docs/functions/serverless-functions/runtimes#max-duration
//export const config = {
//  maxDuration: 60,
//};

// This route is used to send and receive data with Trigger.dev
const { handler, config } = createPagesRoute(triggerClient);

export { config };

export default handler;
