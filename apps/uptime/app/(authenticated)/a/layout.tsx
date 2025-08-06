"use client";

// Components
import { Loader, Splash } from "@basestack/design-system";
// Libs
import { auth } from "@basestack/vendors";
import Navigation from "components/Navigation";
// Router
import { useRouter } from "next/navigation";
// Modals
import Modals from "modals";
// React
import { Fragment, ReactNode } from "react";
// Server
import { api } from "utils/trpc/react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const { isPending: isSessionLoading } = auth.client.useSession();

  const [projects, usage, subscription] = api.useQueries((t) => [
    t.projects.list(undefined, {
      enabled: !isSessionLoading,
      select: (data) =>
        data?.projects.map((item) => ({
          id: item.id,
          slug: item.slug,
          onClick: () => router.push(`/a/project/${item.id}/monitors`),
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
        <Splash product="uptime" />
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
