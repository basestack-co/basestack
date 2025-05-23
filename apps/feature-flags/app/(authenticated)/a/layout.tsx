"use client";

import React, { Fragment } from "react";
// Router
import { useRouter } from "next/navigation";
// Libs
import { authClient } from "libs/auth/client";
// Components
import { Splash, Loader } from "@basestack/design-system";
import Navigation from "components/Navigation";
// Modals
import Modals from "modals";
// Server
import { api } from "utils/trpc/react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { isPending: isSessionLoading } = authClient.useSession();

  const [projects, usage] = api.useQueries((t) => [
    t.project.all(undefined, {
      enabled: !isSessionLoading,
      select: (data) =>
        data?.projects.map((item) => ({
          id: item.id,
          slug: item.slug,
          onClick: () => router.push(`/a/project/${item.id}/flags`),
          text: item.name,
          isAdmin: item.isAdmin,
          role: item.role,
          isActive: false,
        })),
    }),
    t.usage.current(undefined, {
      enabled: !isSessionLoading,
    }),
  ]);

  if (isSessionLoading || projects.isLoading || usage.isLoading) {
    return (
      <Loader hasDelay={false}>
        <Splash product="flags" />
      </Loader>
    );
  }

  return (
    <Fragment>
      <Navigation data={projects.data} />
      {children}
      <Modals />
    </Fragment>
  );
};

export default MainLayout;
