import React, { Fragment, useState } from "react";
import { useMediaQuery } from "@basestack/hooks";
import { useTheme } from "styled-components";
// Router
import { useRouter } from "next/router";
import Link, { LinkProps } from "next/link";
// Context
import useModals from "hooks/useModals";
import { seIstCreateFlagModalOpen } from "contexts/modals/actions";
// Auth
import { useSession } from "next-auth/react";
import { Navigation, TabBar } from "@basestack/design-system";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.device.min.lg);
  const router = useRouter();
  const { dispatch } = useModals();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/sign-in");
    },
  });
  const [projectId, setProjectId] = useState("");

  const onHandleNavigation = (to: string, isExternal: boolean = false) => {
    if (typeof window !== "undefined" && isExternal) {
      window.open(to, "_blank");
    } else {
      router.push(to);
    }
  };

  const onSelectProject = (id: string) => {
    setProjectId(id);
  };

  if (status === "loading") {
    return <div>isLoading</div>;
  }

  return (
    <Fragment>
      <Navigation
        pathname={router.pathname}
        onCreate={() => dispatch(seIstCreateFlagModalOpen(true))}
        projectId={projectId}
        projects={[
          {
            id: "125",
            text: "Demo project",
            onClick: onSelectProject,
          },
        ]}
        leftItems={[
          {
            text: "Features",
            to: "/flags",
            onClick: onHandleNavigation,
          },
          {
            text: "Settings",
            to: "/settings/general",
            onClick: onHandleNavigation,
          },
        ]}
        rightItems={[
          {
            text: "Documentation",
            to: "/documentation",
            onClick: onHandleNavigation,
          },
          {
            text: "Resources",
            to: "/resources",
            onClick: onHandleNavigation,
          },
          {
            text: "Github",
            to: "https://github.com/",
            isExternal: true,
            onClick: onHandleNavigation,
          },
        ]}
      />
      {children}
      {!isDesktop && (
        <TabBar
          pathname={router.pathname}
          onCreateFlag={() => dispatch(seIstCreateFlagModalOpen(true))}
        />
      )}
    </Fragment>
  );
};

export default MainLayout;
