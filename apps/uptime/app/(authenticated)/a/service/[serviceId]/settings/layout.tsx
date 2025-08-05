"use client";

// types
import type { Role } from ".prisma/client";
// Components
import { Loader, Skeleton, Tabs, Text } from "@basestack/design-system";
// Utils
import { config } from "@basestack/utils";
// Router
import { useParams, usePathname, useRouter } from "next/navigation";
// Locales
import { type NamespaceKeys, useTranslations } from "next-intl";
import type React from "react";
import { useEffect, useMemo } from "react";
// Hooks
import { useMedia } from "react-use";
// Theme
import { useTheme } from "styled-components";
// Server
import { api } from "utils/trpc/react";
import {
  Container,
  List,
  ListItem,
  SettingsContainer,
  StyledButton,
  StyledLink,
} from "./styles";

const { hasUptimePermission } = config.plans;

const getLinks = (serviceId: string, role: Role | undefined) => [
  {
    id: "1",
    i18nKey: "navigation.setting.general",
    tab: "general",
    href: `/a/service/${serviceId}/settings/general`,
    isVisible: true,
  },
  {
    id: "2",
    i18nKey: "navigation.setting.members",
    tab: "members",
    href: `/a/service/${serviceId}/settings/members`,
    isVisible: true,
  },
];

const SettingsLayout = ({ children }: { children: React.ReactElement }) => {
  const t = useTranslations();
  const theme = useTheme();
  const isDesktop = useMedia(theme.device.min.lg, false);
  const router = useRouter();
  const pathname = usePathname();
  const { serviceId } = useParams<{ serviceId: string }>();

  const { data: service, isLoading: isLoadingService } =
    api.services.byId.useQuery(
      { serviceId },
      {
        enabled: !!serviceId,
      }
    );

  const renderLink = useMemo(() => {
    return getLinks(serviceId, service?.role)
      .filter((link) => link.isVisible)
      .map(({ id, i18nKey, href }) => (
        <ListItem key={`settings-button-list-${id}`}>
          <StyledLink href={href} passHref>
            <StyledButton isActive={pathname === href}>
              {t(i18nKey as NamespaceKeys<string, "navigation">)}
            </StyledButton>
          </StyledLink>
        </ListItem>
      ));
  }, [pathname, serviceId, t, service?.role]);

  const activeLinkIndex = useMemo(
    () =>
      getLinks(serviceId, service?.role).findIndex(
        (button) => button.href === pathname
      ),
    [pathname, serviceId, service?.role]
  );

  const items = useMemo(
    () =>
      getLinks(serviceId, service?.role)
        .filter((link) => link.isVisible)
        .map(({ i18nKey, tab }) => {
          return {
            id: tab.toLowerCase(),
            text: t(i18nKey as NamespaceKeys<string, "navigation">),
          };
        }),
    [t, serviceId, service?.role]
  );

  useEffect(() => {
    document.title = `${service?.name ?? "Service"} / Settings`;
  }, [service?.name]);

  useEffect(() => {
    const link = getLinks(serviceId, service?.role).find(
      (link) => link.href === pathname
    );

    if (!link?.isVisible) {
      router.push(`/a/service/${serviceId}/settings/general`);
    }
  }, [pathname, serviceId, service?.role, router]);

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
              router.push(`/a/service/${serviceId}/settings/${tab}`);
            }}
            sliderPosition={activeLinkIndex}
            backgroundColor="transparent"
          />
        )}
        {isLoadingService || !service ? (
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
