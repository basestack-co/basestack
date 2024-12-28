"use client";

import React, { Fragment } from "react";
// Router
import { useRouter, usePathname } from "next/navigation";
// Auth
import { useSession } from "next-auth/react";
// Components
import { Splash, Loader } from "@basestack/design-system";
import Navigation from "components/Navigation";
// Server
import { api } from "utils/trpc/react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const isAuthPages =
    pathname === "/auth/sign-in" || pathname === "/auth/sign-up";

  const { status } = useSession({
    required: true,
    async onUnauthenticated() {
      if (!isAuthPages) {
        await router.push("/auth/sign-in");
      }
    },
  });

  const [forms, usage] = api.useQueries((t) => [
    t.form.all(undefined, {
      enabled: status === "authenticated" && !isAuthPages,
      select: (data) =>
        data?.forms.map((item) => ({
          id: item.id,
          slug: item.id,
          onClick: () => router.push(`/form/${item.id}/submissions`),
          text: item.name,
        })),
    }),
    t.subscription.usage(undefined, {
      enabled: status === "authenticated" && !isAuthPages,
    }),
  ]);

  if (
    !isAuthPages &&
    (status === "loading" || forms.isLoading || usage.isLoading)
  ) {
    return (
      <Loader hasDelay={false}>
        <Splash product="forms" />
      </Loader>
    );
  }

  return (
    <Fragment>
      {!isAuthPages && <Navigation data={forms.data} />}
      {children}
    </Fragment>
  );
};

export default MainLayout;
