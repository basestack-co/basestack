import { headers } from "next/headers";

function getSubdomain(
  host: string,
  baseDomain: string = "baseuptime.com"
): string | null {
  const cleanHost = host.split(":")[0];

  // Case 1: Direct subdomain like super.baseuptime.com
  if (cleanHost.endsWith(`.${baseDomain}`)) {
    const subdomain = cleanHost.replace(`.${baseDomain}`, "");
    const parts = subdomain.split(".");
    return parts[0] || null;
  }

  // Case 2: Custom domain - we'll return null here since we can't determine
  // the subdomain from just the custom domain without additional data
  return null;
}

function getSubdomainFromHeaders(headersList: Headers): string | null {
  // Try to get the original host from various headers
  const possibleHosts = [
    headersList.get("x-forwarded-host"),
    headersList.get("host"),
    headersList.get("x-original-host"),
    headersList.get("x-host"),
    headersList.get("cf-connecting-ip"), // Cloudflare specific
  ].filter(Boolean);

  // Also check for custom headers that might contain the original subdomain
  const customSubdomain =
    headersList.get("x-subdomain") || headersList.get("x-original-subdomain");

  if (customSubdomain) {
    return customSubdomain;
  }

  // Try each host header to find a subdomain
  for (const host of possibleHosts) {
    if (host) {
      const subdomain = getSubdomain(host);
      if (subdomain) {
        return subdomain;
      }
    }
  }

  return null;
}

export default async function Home() {
  const headersList = await headers();
  const host =
    headersList.get("x-forwarded-host") || headersList.get("host") || "";
  const subdomain = getSubdomainFromHeaders(headersList);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          Status Page for {subdomain || "unknown"}
        </h1>
        <p className="text-gray-600 text-sm">Host: {host}</p>
        <p className="text-gray-600 text-sm">
          Detected subdomain: {subdomain || "none"}
        </p>

        {/* Debug info - remove in production */}
        <details className="mt-4 text-left max-w-md">
          <summary className="cursor-pointer text-sm text-gray-500">
            Debug Headers
          </summary>
          <div className="text-xs mt-2 space-y-1">
            <div>
              x-forwarded-host: {headersList.get("x-forwarded-host") || "none"}
            </div>
            <div>host: {headersList.get("host") || "none"}</div>
            <div>
              x-original-host: {headersList.get("x-original-host") || "none"}
            </div>
            <div>x-subdomain: {headersList.get("x-subdomain") || "none"}</div>
          </div>
        </details>
      </div>
    </div>
  );
}
