import React, { Fragment } from "react";
// Router
import { useRouter } from "next/router";
// Components
import { Splash, Loader } from "@basestack/design-system";
import Navigation from "components/Navigation";
// Server
import { trpc } from "libs/trpc";
// Auth
import { useAuth } from "@clerk/nextjs";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = useAuth();
  const router = useRouter();

  const { data, isLoading: isLoadingForms } = trpc.form.all.useQuery(
    undefined,
    {
      enabled: !!userId,
      select: (data) =>
        data?.forms.map((item) => ({
          id: item.id,
          slug: item.id,
          onClick: () =>
            router.push({
              pathname: "/[formId]/submissions",
              query: { formId: item.id },
            }),
          text: item.name,
        })),
    },
  );

  if (isLoadingForms) {
    return (
      <Loader hasDelay={false}>
        <Splash />
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
