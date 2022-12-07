import React, { useEffect } from "react";
// SEO
import Head from "next/head";
// Layout
import MainLayout from "layouts/Main";
// Modules
import Flags from "modules/Flags";
// Router
import { useRouter } from "next/router";
// Server
import { trpc } from "libs/trpc";

const FlagsPage = () => {
  const router = useRouter();
  const projectSlug = router.query.projectSlug as string;

  const { data, isLoading, isError } = trpc.project.bySlug.useQuery(
    { projectSlug },
    {
      enabled: !!projectSlug,
    }
  );

  useEffect(() => {
    // Verify if the project is still available
    if (!isLoading && data && !data.project) {
      router.push("/");
    }
  }, [isLoading, data, router]);

  if (isLoading || !data) {
    return <div>Loading Project...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <Head>
        <title>Flags for {data.project?.name}</title>
      </Head>
      <Flags project={data.project} />;
    </>
  );
};

FlagsPage.Layout = MainLayout;

export default FlagsPage;
