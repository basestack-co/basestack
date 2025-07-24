"use client";

// Components
import { Loader, Splash } from "@basestack/design-system";
// Libs
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

  const [forms, usage, subscription] = api.useQueries((t) => [
    t.forms.list(undefined, {
      enabled: !isSessionLoading,
      select: (data) =>
        data?.forms.map((item) => ({
          id: item.id,
          slug: item.id,
          onClick: () => router.push(`/a/form/${item.id}/submissions`),
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
    forms.isLoading ||
    usage.isLoading ||
    subscription.isLoading
  ) {
    return (
      <Loader hasDelay={false}>
        <Splash product="forms" />
      </Loader>
    );
  }

  return (
    <Fragment>
      <Navigation data={forms.data} />
      {children}
      <Modals />
    </Fragment>
  );
};

export default MainLayout;
