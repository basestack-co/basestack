"use client";

import React, { Fragment } from "react";
// Router
import { useRouter } from "next/navigation";
// Auth
import { authClient } from "utils/auth/client";
// Modals
import Modals from "modals";
// Components
import { Splash, Loader } from "@basestack/design-system";
import Navigation from "components/Navigation";
// Server
import { api } from "utils/trpc/react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { isPending: isSessionLoading } = authClient.useSession();

  const [forms, usage] = api.useQueries((t) => [
    t.form.all(undefined, {
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
  ]);

  if (isSessionLoading || forms.isLoading || usage.isLoading) {
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
