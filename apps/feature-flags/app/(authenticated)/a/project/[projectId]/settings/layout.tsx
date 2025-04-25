"use client";

import React, { useEffect, useMemo } from "react";
// Router
import { useParams, useRouter, usePathname } from "next/navigation";
// Server
import { api } from "utils/trpc/react";
// Theme
import { useTheme } from "styled-components";
// Components
import { Loader, Skeleton, Tabs, Text } from "@basestack/design-system";
import {
  StyledLink,
  Container,
  List,
  ListItem,
  SettingsContainer,
  StyledButton,
} from "./styles";
// Hooks
import { useMedia } from "react-use";
// Locales
import { useTranslations, NamespaceKeys } from "next-intl";

const getLinks = (projectId: string) => [
  {
    id: "1",
    i18nKey: "navigation.setting.general",
    tab: "general",
    href: `/a/project/${projectId}/settings/general`,
  },
  {
    id: "2",
    i18nKey: "navigation.setting.members",
    tab: "members",
    href: `/a/project/${projectId}/settings/members`,
  },
  {
    id: "3",
    i18nKey: "navigation.setting.environments",
    tab: "environments",
    href: `/a/project/${projectId}/settings/environments`,
  },
  {
    id: "4",
    i18nKey: "navigation.setting.security",
    tab: "security",
    href: `/a/project/${projectId}/settings/security`,
  },
];

const SettingsLayout = ({ children }: { children: React.ReactElement }) => {
  const t = useTranslations();
  const theme = useTheme();
  const isDesktop = useMedia(theme.device.min.lg, false);
  const router = useRouter();
  const pathname = usePathname();
  const { projectId } = useParams<{ projectId: string }>();

  const { data: project, isLoading: isLoadingProject } =
    api.project.byId.useQuery(
      { projectId },
      {
        enabled: !!projectId,
      }
    );

  const renderLink = useMemo(() => {
    return getLinks(projectId).map(({ id, i18nKey, href }) => (
      <ListItem key={`settings-button-list-${id}`}>
        <StyledLink href={href} passHref>
          <StyledButton isActive={pathname === href}>
            {t(i18nKey as NamespaceKeys<string, "navigation">)}
          </StyledButton>
        </StyledLink>
      </ListItem>
    ));
  }, [pathname, projectId, t]);

  const activeLinkIndex = useMemo(
    () => getLinks(projectId).findIndex((button) => button.href === pathname),
    [pathname, projectId]
  );

  const items = useMemo(
    () =>
      getLinks(projectId).map(({ i18nKey, tab }) => {
        return {
          id: tab.toLowerCase(),
          text: t(i18nKey as NamespaceKeys<string, "navigation">),
        };
      }),
    [t, projectId]
  );

  useEffect(() => {
    document.title = `${project?.name ?? "Project"} / Settings`;
  }, [project?.name]);

  return (
    <Container>
      <Text size="xLarge" mb={theme.spacing.s5}>
        Settings
      </Text>
      <SettingsContainer>
        {isDesktop && <List top={activeLinkIndex * 100}>{renderLink}</List>}
        {!isDesktop && (
          <Tabs
            items={items}
            onSelect={(tab) => {
              router.push(`/a/project/${projectId}/settings/${tab}`);
            }}
            sliderPosition={activeLinkIndex}
            backgroundColor="transparent"
          />
        )}
        {isLoadingProject || !project ? (
          <Loader hasDelay={false}>
            <Skeleton
              items={[
                { h: 24, w: "15%", mb: 10 },
                { h: 18, w: "40%", mb: 20 },
                { h: 100, w: "100%", mb: 20 },
                { h: 1, w: "100%", mb: 16 },
                { h: 36, w: 120, mb: 0, ml: "auto" },
              ]}
              padding={20}
            />
          </Loader>
        ) : (
          children
        )}
      </SettingsContainer>
    </Container>
  );
};

export default SettingsLayout;
