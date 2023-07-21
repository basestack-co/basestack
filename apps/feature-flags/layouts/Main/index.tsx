import React, { Fragment, useEffect, useState } from "react";
import { useMediaQuery } from "@basestack/hooks";
import { useTheme } from "styled-components";
// Router
import { useRouter } from "next/router";
// Store
import { useStore } from "store";
// Auth
import { useSession } from "next-auth/react";
// Components
import {
  Splash,
  Loader,
  Button,
  ButtonVariant,
} from "@basestack/design-system";
import NavigationDrawer from "./Navigation/Mobile";
import Navigation from "./Navigation/Desktop";
// Server
import { trpc } from "libs/trpc";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery(theme.device.max.lg);
  const router = useRouter();
  const setCreateFlagModalOpen = useStore(
    (state) => state.setCreateFlagModalOpen,
  );
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

  const { data, isLoading: isLoadingProjects } = trpc.project.all.useQuery(
    undefined,
    { enabled: status === "authenticated" },
  );

  if (status === "loading" || isLoadingProjects) {
    return (
      <Loader>
        <Splash />
      </Loader>
    );
  }

  return (
    <Fragment>
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
      <div>
        <Button
          variant={ButtonVariant.Primary}
          onClick={() => console.log("yo")}
          icon="help"
        >
          Button Primary
        </Button>
        <br />
        <Button
          variant={ButtonVariant.Secondary}
          onClick={() => console.log("yo")}
          icon="help"
        >
          Button Secondary
        </Button>
        <br />
        <Button
          variant={ButtonVariant.Tertiary}
          onClick={() => console.log("yo")}
          icon="help"
        >
          Button Tertiary
        </Button>
        <br />
        <Button
          variant={ButtonVariant.PrimaryNeutral}
          onClick={() => console.log("yo")}
          icon="help"
        >
          Button PrimaryNeutral
        </Button>
        <br />
        <Button
          variant={ButtonVariant.Neutral}
          onClick={() => console.log("yo")}
          icon="help"
        >
          Button Neutral
        </Button>
        <br />
        <Button
          variant={ButtonVariant.DangerFilled}
          onClick={() => console.log("yo")}
          icon="help"
        >
          Button DangerFilled
        </Button>
        <br />
        <Button
          variant={ButtonVariant.Danger}
          onClick={() => console.log("yo")}
          icon="help"
        >
          Button Danger
        </Button>
        <br />
        <Button
          variant={ButtonVariant.Outlined}
          onClick={() => console.log("yo")}
          icon="help"
        >
          Button Outlined
        </Button>
        <br />
        <br />
        <br />
        <Button
          isLoading
          variant={ButtonVariant.Primary}
          onClick={() => console.log("yo")}
        >
          Button Primary
        </Button>
        <br />
        <Button
          isLoading
          variant={ButtonVariant.Secondary}
          onClick={() => console.log("yo")}
        >
          Button Secondary
        </Button>
        <br />
        <Button
          isLoading
          variant={ButtonVariant.Tertiary}
          onClick={() => console.log("yo")}
        >
          Button Tertiary
        </Button>
        <br />
        <Button
          isLoading
          variant={ButtonVariant.PrimaryNeutral}
          onClick={() => console.log("yo")}
        >
          Button PrimaryNeutral
        </Button>
        <br />
        <Button
          isLoading
          variant={ButtonVariant.Neutral}
          onClick={() => console.log("yo")}
        >
          Button Neutral
        </Button>
        <br />
        <Button
          isLoading
          variant={ButtonVariant.DangerFilled}
          onClick={() => console.log("yo")}
        >
          Button DangerFilled
        </Button>
        <br />
        <Button
          isLoading
          variant={ButtonVariant.Danger}
          onClick={() => console.log("yo")}
        >
          Button DangerFilled
        </Button>
        <br />
        <Button
          isLoading
          variant={ButtonVariant.Outlined}
          onClick={() => console.log("yo")}
        >
          Button Outlined
        </Button>
      </div>
      {children}
    </Fragment>
  );
};

export default MainLayout;
