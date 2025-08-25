// Next
import { headers } from "next/headers";
// React
import { Suspense, cache } from "react";
// Components
import ClientComponent from "./ClientComponent";

const getDomain = cache(async (baseDomain: string) => {
  const headersList = await headers();
  const host =
    headersList.get("x-forwarded-host") || headersList.get("host") || "";

  const cleanHost = host.split(":")[0];

  if (cleanHost.endsWith(`.${baseDomain}`)) {
    const subdomain = cleanHost.replace(`.${baseDomain}`, "");

    const parts = subdomain.split(".");
    return parts[0] || null;
  }

  return host;
});

const getStatusPageBySlug = cache(async (slug: string) => {
  // const res = await fetch(`http://localhost:3004/api/v1/status-pages/${slug}`);
  const res = await fetch(`https://meowfacts.herokuapp.com/?count=3`, {
    cache: "force-cache",
    next: {
      tags: [`status-page-${slug}`],
    },
  });
  const data = await res.json();

  return data;
});

export default async function Home() {
  const subdomain = await getDomain("baseuptime.com");
  const data = await getStatusPageBySlug("super-page-slug");

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1>This is the status page for {subdomain || "unknown"}</h1>

      <p>The data is {JSON.stringify(data)}</p>

      <Suspense fallback={<div>Loading...</div>}>
        <ClientComponent />
      </Suspense>
    </div>
  );
}
