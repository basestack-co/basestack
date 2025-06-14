"use client";

import React, { Fragment } from "react";
// Router
import { useRouter } from "next/navigation";
// Vendors
import { auth } from "@basestack/vendors";
// Components
import { Splash, Loader } from "@basestack/design-system";
import Navigation from "components/Navigation";
// Modals
import Modals from "modals";
// Server
import { api } from "utils/trpc/react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { isPending: isSessionLoading } = auth.client.useSession();

  const [projects, usage, subscription] = api.useQueries((t) => [
    t.projects.list(undefined, {
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
    t.subscription.usage(undefined, {
      enabled: !isSessionLoading,
    }),
    t.subscription.current(undefined, {
      enabled: !isSessionLoading,
    }),
  ]);

  if (
    isSessionLoading ||
    projects.isLoading ||
    usage.isLoading ||
    subscription.isLoading
  ) {
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
