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
import { Container, List, ListItem, LogoContainer } from "./styles";
import ButtonLink from "../elements/ButtonLink";
import {
  getInternalLinks,
  getExternalLinks,
  getAvatarDropdownList,
} from "../utils";
// Router
import { useRouter } from "next/router";
import Link from "next/link";
// Locales
import useTranslation from "next-translate/useTranslation";
// Store
import { useStore } from "store";
// Auth
import { useUser, useClerk } from "@clerk/nextjs";

export interface LinkItem {
  text: string;
  to: string;
  isExternal?: boolean;
  activeText: string;
}

interface NavigationProps {
  isDesktop: boolean;
  data?: Array<PopupActionProps>;
  onClickMenuButton: () => void;
}

const DesktopNavigation = ({
  isDesktop,
  data,
  onClickMenuButton,
}: NavigationProps) => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { t } = useTranslation("navigation");
  const theme = useTheme();
  const router = useRouter();

  const setIsDarkMode = useStore((state) => state.setDarkMode);
  const isDarkMode = useStore((state) => state.isDarkMode);

  const setCreateProjectModalOpen = useStore(
    (state) => state.setCreateFormModalOpen,
  );

  const formId = router.query.formId as string;

  const onRenderItems = useCallback(
    (items: LinkItem[], type: string) =>
      items.map(({ text, to, isExternal, activeText }, i) => {
        return (
          <ListItem key={`${type}-list-item-${i}`}>
            <ButtonLink
              href={to}
              isExternal={isExternal}
              isActive={
                router.pathname === to ||
                router.pathname.includes(activeText.toLowerCase())
              }
            >
              {t(text)}
            </ButtonLink>
          </ListItem>
        );
      }),
    [router.pathname, t],
  );

  const currentForm = useMemo(() => {
    const form = data?.find(({ slug }) => slug === formId);

    return form?.text ?? "";
  }, [formId, data]);

  const truncateProjectName = (str: string) => {
    return str.length <= 18 ? str : str.slice(0, 18) + "...";
  };

  return (
    <Container data-testid="navigation">
      <List data-testid="navigation-left-ul">
        {!isDesktop && (
          <>
            <ListItem>
              <IconButton
                mr={theme.spacing.s3}
                icon="menu"
                size="medium"
                onClick={onClickMenuButton}
              />
            </ListItem>
            {!!currentForm && (
              <ListItem>
                <Text size="medium">{truncateProjectName(currentForm)}</Text>
              </ListItem>
            )}
          </>
        )}
        {isDesktop && (
          <>
            <ListItem>
              <Link href="/">
                <LogoContainer>
                  <Logo size={36} />
                </LogoContainer>
              </Link>
            </ListItem>
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
            {!!formId && onRenderItems(getInternalLinks(t, formId), "left")}
          </>
        )}
      </List>
      {isDesktop && (
        <List ml="auto" data-testid="navigation-right-ul">
          {onRenderItems(getExternalLinks(t), "right")}
          <ListItem ml={theme.spacing.s3}>
            <AvatarDropdown
              name={user?.firstName ?? t("dropdown.username")}
              email={user?.primaryEmailAddress?.emailAddress ?? ""}
              src={user?.imageUrl ?? ""}
              darkModeText={t("dropdown.dark-mode")}
              isDarkMode={isDarkMode}
              onSetDarkMode={setIsDarkMode}
              list={getAvatarDropdownList(t, router, signOut)}
            />
          </ListItem>
        </List>
      )}
    </Container>
  );
};

export default DesktopNavigation;
