import React, { Fragment, useEffect, useState } from "react";
import { useMedia } from "react-use";
import { useTheme } from "styled-components";
// Router
import { useRouter } from "next/router";
// Auth
import { useSession } from "next-auth/react";
// UI
import { Navigation } from "@basestack/ui";
// Components
import { Splash, Loader } from "@basestack/design-system";
// Server
import { trpc } from "libs/trpc";
// Utils
import { externalLinks, internalLinks } from "./utils";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMedia(theme.device.max.lg, false);
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/sign-in");
    },
  });

  useEffect(() => {
    if (!isMobile) {
      setIsDrawerOpen(false);
    }
  }, [isMobile]);

  const { data, isLoading: isLoadingProjects } = trpc.form.all.useQuery(
    undefined,
    {
      enabled: status === "authenticated",
      select: (data) =>
        data?.forms.map((item) => ({
          id: item.id,
          slug: item.id,
          onClick: () =>
            router.push({
              pathname: "/[formId]/submissions",
              query: { projectSlug: item.id },
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
      {/*

         <Navigation
        onClickMenuButton={() => setIsDrawerOpen(true)}
        isDesktop={!isMobile}
        data={data}
      />
      <NavigationDrawer
        data={data}
        onClose={() => setIsDrawerOpen(false)}
        isDrawerOpen={isDrawerOpen}
      />

       */}


      {children}
    </Fragment>
  );
};

export default MainLayout;
