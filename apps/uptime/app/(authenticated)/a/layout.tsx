"use client";

// Components
import { Loader, Splash } from "@basestack/design-system";
// Libs
import { auth } from "@basestack/vendors";
import Navigation from "components/Navigation";
// Modals
import Modals from "modals";
import type React from "react";
import { Fragment } from "react";
// Server
import { api } from "utils/trpc/react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isPending: isSessionLoading } = auth.client.useSession();

  const [usage, subscription] = api.useQueries((t) => [
    t.subscription.usage(undefined, {
      enabled: !isSessionLoading,
    }),
    t.subscription.current(undefined, {
      enabled: !isSessionLoading,
    }),
  ]);

  if (isSessionLoading || usage.isLoading || subscription.isLoading) {
    return (
      <Loader hasDelay={false}>
        <Splash product="uptime" />
      </Loader>
    );
  }

  return (
    <Fragment>
      <Navigation data={[]} />
      {children}
      <Modals />
    </Fragment>
  );
};

export default MainLayout;
