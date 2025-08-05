"use client";

import { Button, ButtonVariant, Empty, Text } from "@basestack/design-system";
// Components
import { ProjectCard, ProjectCardLoading } from "@basestack/ui";
// Router
import { useRouter } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
// Store
import { useStore } from "store";
// Styles
import { useTheme } from "styled-components";
// Server
import { api } from "utils/trpc/react";
import { Header, ProjectsList, ProjectsListItem, Section } from "./styles";

const RecentServices = () => {
  const t = useTranslations("home");
  const theme = useTheme();
  const router = useRouter();
  const setCreateServiceModalOpen = useStore(
    (state) => state.setCreateServiceModalOpen,
  );

  const { data, isLoading } = api.services.recent.useQuery(undefined, {
    select: (services) => {
      return services?.map((item) => ({
        id: item.id,
        slug: item.slug,
        onClick: () => router.push(`/a/service/${item.id}/monitors`),
        text: item.name,
        isAdmin: item.isAdmin,
        count: [
          {
            icon: "flag",
            value: item.count.monitors ?? 0,
          },
          {
            icon: "group",
            value: item.count.members ?? 0,
          },
        ],
      }));
    },
    refetchOnMount: "always",
  });

  return (
    <Section mb={theme.spacing.s7}>
      <Header>
        <Text size="xLarge" mr={theme.spacing.s5}>
          {t("services.title")}
        </Text>
        {!!data?.length && (
          <Button
            flexShrink={0}
            variant={ButtonVariant.Outlined}
            onClick={() => setCreateServiceModalOpen({ isOpen: true })}
          >
            {t("services.action")}
          </Button>
        )}
      </Header>

      {!isLoading && !data?.length && (
        <Empty
          p={`${theme.spacing.s6} ${theme.spacing.s5}`}
          iconName="service_toolbox"
          title={t("services.empty.title")}
          description={t("services.empty.description")}
          button={{
            text: t("services.empty.action"),
            onClick: () => setCreateServiceModalOpen({ isOpen: true }),
          }}
        />
      )}
      {isLoading && (
        <ProjectsList>
          <ProjectCardLoading />
        </ProjectsList>
      )}
      {!isLoading && !!data?.length && (
        <ProjectsList>
          {data.slice(0, 4).map((service) => (
            <ProjectsListItem key={service.id}>
              <ProjectCard
                text={service.text}
                onClick={service.onClick}
                count={service.count}
                menuItems={[
                  {
                    icon: "flag",
                    text: t("services.menu.monitors"),
                    onClick: () =>
                      router.push(`/a/service/${service.id}/monitors`),
                  },
                  {
                    icon: "settings",
                    text: t("services.menu.settings"),
                    onClick: () =>
                      router.push(`/a/service/${service.id}/settings`),
                  },
                ]}
                {...(!service.isAdmin && {
                  label: {
                    text: t("services.tag.text"),
                    tooltip: t("services.tag.tooltip"),
                  },
                })}
              />
            </ProjectsListItem>
          ))}
        </ProjectsList>
      )}
    </Section>
  );
};

export default RecentServices;
