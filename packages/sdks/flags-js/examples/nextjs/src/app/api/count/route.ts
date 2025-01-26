import { ServerFlagsSDK } from "@/libs/feature-flags/server";

export async function GET() {
  const flagsClient = ServerFlagsSDK.getInstance();

  const flag = await flagsClient.getFlag("count");
  const data = await flagsClient.getAllFlags();

  return Response.json({ data, flag });
}
