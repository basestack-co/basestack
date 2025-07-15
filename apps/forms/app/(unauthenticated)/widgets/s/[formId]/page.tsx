import { Suspense } from "react";
import { unstable_cache } from "next/cache";
// Hono
import { client } from "utils/hono/client";
// Components
import Loader from "./_components/Loader";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ formId: string }>;
  searchParams: Promise<{ layout: string; theme: string }>;
}) {
  const { formId } = await params;
  const { layout, theme } = await searchParams;

  const getCachedSubmissions = unstable_cache(
    async () => {
      const response = await client.api.v1.s[":formId"].$get({
        param: {
          formId,
        },
      });

      if (!response.ok) {
        return {
          submissions: [],
          isEnabled: false,
        };
      }

      return response.json();
    },
    [formId],
    {
      tags: ["submissions"],
      // revalidate: 3600,
    },
  );

  const data = await getCachedSubmissions();

  return (
    <Suspense
      fallback={
        <div style={{ fontSize: "20px", color: "black" }}>Loading...</div>
      }
    >
      <Loader data={data} layout={layout} theme={theme} />
    </Suspense>
  );
}
