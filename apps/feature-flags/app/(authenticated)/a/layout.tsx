"use client";

// Components
import { Loader, Splash } from "@basestack/design-system";
// Vendors
import { auth } from "@basestack/vendors";
import Navigation from "components/Navigation";
// Modals
import Modals from "modals";
// Router
import { useRouter } from "next/navigation";
import React, { Fragment } from "react";
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
