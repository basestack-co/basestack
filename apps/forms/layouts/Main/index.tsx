import React, { Fragment, useEffect, useState } from "react";
// Router
import { useRouter } from "next/router";
// Auth
import { useSession } from "next-auth/react";
// Components
import { Splash, Loader } from "@basestack/design-system";
import Navigation from "components/Navigation";
// Server
import { trpc } from "libs/trpc";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/sign-in");
    },
  });

  const [forms, usage] = trpc.useQueries((t) => [
    t.form.all(undefined, {
      enabled: status === "authenticated",
      select: (data) =>
        data?.forms.map((item) => ({
          id: item.id,
          slug: item.id,
          onClick: () =>
            router.push({
              pathname: "/form/[formId]/submissions",
              query: { formId: item.id },
            }),
          text: item.name,
        })),
    }),
    t.subscription.usage(undefined, { enabled: status === "authenticated" }),
  ]);

  if (status === "loading" || forms.isLoading || usage.isLoading) {
    return (
      <Loader hasDelay={false}>
        <Splash product="forms" />
      </Loader>
    );
  }

  return (
    <Fragment>
      <Navigation data={forms.data} hasSubscription={!!usage.data} />
      {children}
    </Fragment>
  );
};

export default MainLayout;
