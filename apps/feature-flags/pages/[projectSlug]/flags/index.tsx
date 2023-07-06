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
    },
  );

  return (
    <>
      <Head>
        <title>{data?.project?.name ?? "Project"} / Flags</title>
      </Head>
      {/* @ts-ignore */}
      <Flags project={data?.project!} />
    </>
  );
};

FlagsPage.Layout = MainLayout;

export default FlagsPage;
