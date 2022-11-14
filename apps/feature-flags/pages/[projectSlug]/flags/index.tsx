import React from "react";
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

  const { data, isLoading } = trpc.useQuery(
    ["project.bySlug", { projectSlug }],
    {
      enabled: !!projectSlug,
    }
  );

  if (isLoading || !data) {
    return <div>Loading Project...</div>;
  }

  return <Flags project={data.project} />;
};

FlagsPage.Layout = MainLayout;

export default FlagsPage;
