import { headers } from "next/headers";

function getSubdomain(
  host: string,
  baseDomain: string = "baseuptime.com"
): string | null {
  const cleanHost = host.split(":")[0];

  if (cleanHost.endsWith(`.${baseDomain}`)) {
    const subdomain = cleanHost.replace(`.${baseDomain}`, "");

    const parts = subdomain.split(".");
    return parts[0] || null;
  }

  return null;
}
export default async function Home() {
  const headersList = await headers();
  const host = headersList.get("x-forwarded-host") || "";

  const subdomain = getSubdomain(host);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1>This is the status page for {subdomain || "unknown"}</h1>
    </div>
  );
}
