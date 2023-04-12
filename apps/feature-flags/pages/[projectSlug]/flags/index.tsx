import React from "react";
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

  return (
    <>
      <Head>
        <title>Flags for {data?.project?.name}</title>
      </Head>
      <Flags project={data?.project ?? null} />
    </>
  );
};

FlagsPage.Layout = MainLayout;

export default FlagsPage;
