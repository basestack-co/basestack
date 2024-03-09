import React, { useCallback, useMemo } from "react";
import { useTheme } from "styled-components";
// UI
import { ProjectsMenu, AvatarDropdown } from "@basestack/ui";
// Components
import {
  Logo,
  IconButton,
  PopupActionProps,
  Text,
} from "@basestack/design-system";
import {
  DesktopContainer,
  DesktopList,
  DesktopListItem,
  LogoContainer,
} from "./styles";
import ButtonLink from "./ButtonLink";
import { internalLinks, externalLinks } from "./utils";
// Router
import { useRouter } from "next/router";
import Link from "next/link";
// Locales
import useTranslation from "next-translate/useTranslation";
// Store
import { useStore } from "store";
// Auth
import { useSession, signOut } from "next-auth/react";

export interface LinkItem {
  text: string;
  to: string;
  isExternal?: boolean;
  i18nKey: string;
}

interface NavigationProps {
  isDesktop: boolean;
  data?: Array<PopupActionProps>;
  onClickMenuButton: () => void;
}

const Navigation = ({
  isDesktop,
  data,
  onClickMenuButton,
}: NavigationProps) => {
  const { t } = useTranslation("navigation");
  const theme = useTheme();
  const { data: session } = useSession();
  const router = useRouter();

  const setIsDarkMode = useStore((state) => state.setDarkMode);
  const isDarkMode = useStore((state) => state.isDarkMode);

  const setCreateProjectModalOpen = useStore(
    (state) => state.setCreateFormModalOpen,
  );

  const formId = router.query.formId as string;

  const onRenderItems = useCallback(
    (items: LinkItem[], type: string) =>
      items.map(({ text, to, isExternal, i18nKey }, i) => {
        return (
          <DesktopListItem key={`${type}-list-item-${i}`}>
            <ButtonLink
              href={to.replace("[formId]", formId)}
              isExternal={isExternal}
              isActive={
                router.pathname === to ||
                router.pathname.includes(text.toLowerCase())
              }
            >
              {t(i18nKey)}
            </ButtonLink>
          </DesktopListItem>
        );
      }),
    [router.pathname, formId, t],
  );

  const currentForm = useMemo(() => {
    const form = data?.find(({ slug }) => slug === formId);

    return form?.text ?? "";
  }, [formId, data]);

  const truncateProjectName = (str: string) => {
    return str.length <= 18 ? str : str.slice(0, 18) + "...";
  };

  return (
    <DesktopContainer data-testid="navigation">
      <DesktopList data-testid="navigation-left-ul">
        {!isDesktop && (
          <>
            <DesktopListItem>
              <IconButton
                mr={theme.spacing.s3}
                icon="menu"
                size="medium"
                onClick={onClickMenuButton}
              />
            </DesktopListItem>
            {!!currentForm && (
              <DesktopListItem>
                <Text size="medium">{truncateProjectName(currentForm)}</Text>
              </DesktopListItem>
            )}
          </>
        )}
        {isDesktop && (
          <>
            <DesktopListItem>
              <Link href="/">
                <LogoContainer>
                  <Logo size={36} />
                </LogoContainer>
              </Link>
            </DesktopListItem>
            <ProjectsMenu
              onCreate={() => setCreateProjectModalOpen({ isOpen: true })}
              current={currentForm}
              data={data ?? []}
              title={t("forms.title")}
              select={{
                title: t("forms.select"),
                create: t("create.form"),
              }}
            />
            {!!formId && onRenderItems(internalLinks, "left")}
          </>
        )}
      </DesktopList>
      {isDesktop && (
        <DesktopList ml="auto" data-testid="navigation-right-ul">
          {onRenderItems(externalLinks, "right")}
          <DesktopListItem ml={theme.spacing.s3}>
            <AvatarDropdown
              name={session?.user.name || t("dropdown.username")}
              email={session?.user.email || ""}
              src={session?.user.image || ""}
              darkModeText={t("dropdown.dark-mode")}
              isDarkMode={isDarkMode}
              onSetDarkMode={setIsDarkMode}
              list={[
                {
                  icon: "add_circle",
                  text: t("create.project"),
                },
                {
                  icon: "group_add",
                  text: t("dropdown.invite"),
                  isDisabled: true,
                  separator: true,
                },
                {
                  icon: "settings",
                  text: t("dropdown.settings"),
                  onClick: () =>
                    router.push({
                      pathname: "/profile/settings",
                    }),
                },
                {
                  icon: "logout",
                  text: t("dropdown.logout"),
                  onClick: signOut,
                },
              ]}
            />
          </DesktopListItem>
        </DesktopList>
      )}
    </DesktopContainer>
  );
};

export default Navigation;
