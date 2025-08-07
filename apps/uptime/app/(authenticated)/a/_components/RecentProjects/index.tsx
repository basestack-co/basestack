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

const RecentProjects = () => {
  const t = useTranslations("home");
  const theme = useTheme();
  const router = useRouter();
  const setCreateProjectModalOpen = useStore(
    (state) => state.setCreateProjectModalOpen,
  );

  const { data, isLoading } = api.projects.recent.useQuery(undefined, {
    select: (projects) => {
      return projects?.map((item) => ({
        id: item.id,
        slug: item.slug,
        onClick: () => router.push(`/a/project/${item.id}/monitors`),
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
          {t("projects.title")}
        </Text>
        {!!data?.length && (
          <Button
            flexShrink={0}
            variant={ButtonVariant.Outlined}
            onClick={() => setCreateProjectModalOpen({ isOpen: true })}
          >
            {t("projects.action")}
          </Button>
        )}
      </Header>

      {!isLoading && !data?.length && (
        <Empty
          p={`${theme.spacing.s6} ${theme.spacing.s5}`}
          iconName="service_toolbox"
          title={t("projects.empty.title")}
          description={t("projects.empty.description")}
          button={{
            text: t("projects.empty.action"),
            onClick: () => setCreateProjectModalOpen({ isOpen: true }),
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
          {data.slice(0, 4).map((project) => (
            <ProjectsListItem key={project.id}>
              <ProjectCard
                text={project.text}
                onClick={project.onClick}
                count={project.count}
                menuItems={[
                  {
                    icon: "flag",
                    text: t("projects.card.menu.monitors"),
                    onClick: () =>
                      router.push(`/a/project/${project.id}/monitors`),
                  },
                  {
                    icon: "settings",
                    text: t("projects.card.menu.settings"),
                    onClick: () =>
                      router.push(`/a/project/${project.id}/settings`),
                  },
                ]}
                {...(!project.isAdmin && {
                  label: {
                    text: t("projects.tag.text"),
                    tooltip: t("projects.tag.tooltip"),
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

export default RecentProjects;
