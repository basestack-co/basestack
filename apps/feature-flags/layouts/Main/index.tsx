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

  const { data, isLoading: isLoadingProjects } = trpc.project.all.useQuery(
    undefined,
    {
      enabled: status === "authenticated",
      select: (data) =>
        data?.projects.map((item) => ({
          id: item.id,
          slug: item.slug,
          onClick: () =>
            router.push({
              pathname: "/[projectSlug]/flags",
              query: { projectSlug: item.slug },
            }),
          text: item.name,
        })),
    },
  );

  if (status === "loading" || isLoadingProjects) {
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
