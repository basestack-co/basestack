"use client";

import React, { Fragment } from "react";
// Router
import { useRouter } from "next/navigation";
// Auth
import { useSession } from "next-auth/react";
// Components
import { Splash, Loader } from "@basestack/design-system";
import Navigation from "components/Navigation";
// Server
import { api } from "utils/trpc/react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/sign-in");
    },
  });

  const [flags, usage] = api.useQueries((t) => [
    t.project.all(undefined, {
      enabled: status === "authenticated",
      select: (data) =>
        data?.projects.map((item) => ({
          id: item.id,
          slug: item.slug,
          onClick: () => router.push(`/a/project/${item.id}/flags`),
          text: item.name,
        })),
    }),
    t.subscription.usage(undefined, {
      enabled: status === "authenticated",
    }),
  ]);

  if (status === "loading" || flags.isLoading || usage.isLoading) {
    return (
      <Loader hasDelay={false}>
        <Splash product="flags" />
      </Loader>
    );
  }

  return (
    <Fragment>
      <Navigation data={flags.data} />
      {children}
    </Fragment>
  );
};

export default MainLayout;
