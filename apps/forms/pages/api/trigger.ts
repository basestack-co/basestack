import { createPagesRoute } from "@trigger.dev/nextjs";
import { triggerClient } from "libs/trigger";

import "jobs";

//export const config = {
//  maxDuration: 60,
//};

// This route is used to send and receive data with Trigger.dev
const { handler, config } = createPagesRoute(triggerClient);

export { config };

export default handler;
