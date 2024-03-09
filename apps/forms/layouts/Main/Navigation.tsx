import React, { useState } from "react";
import { useMedia } from "react-use";
import { useTheme } from "styled-components";
// Router
import { useRouter } from "next/router";
// Auth
import { useSession } from "next-auth/react";
// UI
import { Navigation } from "@basestack/ui";
// Components
import { PopupActionProps } from "@basestack/design-system";
import AvatarDropdown from "../../components/AvatarDropdown";
// Store
import { useStore } from "store";
// Locales
import useTranslation from "next-translate/useTranslation";
// Utils
import { externalLinks, internalLinks } from "./utils";

export interface Props {
  data?: Array<PopupActionProps>;
}

const NavigationContainer = ({ data }: Props) => {
  const theme = useTheme();
  const { t } = useTranslation("navigation");
  const { data: session } = useSession();
  const isMobile = useMedia(theme.device.max.lg, false);
  const router = useRouter();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const formId = router.query.formId as string;

  const setCreateFormModalOpen = useStore(
    (state) => state.setCreateFormModalOpen,
  );

  return (
    <Navigation
      data={data}
      isDesktop={!isMobile}
      projectId={formId}
      internalLinks={internalLinks}
      externalLinks={externalLinks}
      onLogoClick={() => router.push("/")}
      desktopProps={{
        onClickMenuButton: () => setIsDrawerOpen(true),
        onCreateProject: () => setCreateFormModalOpen({ isOpen: true }),
        pathname: router.pathname,
        createProjectText: t("create.form"),
      }}
      mobileProps={{
        onClose: () => setIsDrawerOpen(false),
        isDrawerOpen,
        createProjectText: t("create.form"),
        projectTitle: t("forms.title"),
        externalLinksText: t("external.links"),
      }}
      rightSideComponent={
        <AvatarDropdown
          name={session?.user.name || t("dropdown.username")}
          email={session?.user.email || ""}
          src={session?.user.image || ""}
        />
      }
    />
  );
};

export default NavigationContainer;
