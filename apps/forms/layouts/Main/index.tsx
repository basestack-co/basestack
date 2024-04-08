import React, { Fragment } from "react";
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
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/sign-in");
    },
  });

  const { data, isLoading: isLoadingForms } = trpc.form.all.useQuery(
    undefined,
    {
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
    },
  );

  if (status === "loading" || isLoadingForms) {
    return (
      <Loader hasDelay={false}>
        <Splash product="forms" />
      </Loader>
    );
  }

  return (
    <Fragment>
      <Navigation data={data} />
      {children}
    </Fragment>
  );
};

export default MainLayout;
