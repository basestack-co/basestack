"use client";

import React from "react";
// Locales
import { useTranslations } from "next-intl";
// Router
import { useRouter } from "next/navigation";
// Store
import { useStore } from "store";
// Server
import { api } from "utils/trpc/react";
// Components
import { ProjectCard, ProjectCardLoading } from "@basestack/ui";
import { Button, ButtonVariant, Text, Empty } from "@basestack/design-system";
// Styles
import { useTheme } from "styled-components";
import { ProjectsListItem, ProjectsList, Section, Header } from "./styles";

const RecentProjects = () => {
  const t = useTranslations("home");
  const theme = useTheme();
  const router = useRouter();
  const setCreateProjectModalOpen = useStore(
    (state) => state.setCreateProjectModalOpen
  );

  const { data, isLoading } = api.project.recent.useQuery(undefined, {
    select: (projects) =>
      projects?.map((item) => ({
        id: item.id,
        slug: item.slug,
        onClick: () => router.push(`/a/project/${item.id}/flags`),
        text: item.name,
        flags: item.flags,
        isAdmin: item.isAdmin,
      })),
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
          iconName="folder_open"
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
                flags={project.flags.count}
                menuItems={[
                  {
                    icon: "flag",
                    text: t("projects.menu.features"),
                    onClick: () =>
                      router.push(`/a/project/${project.id}/flags`),
                  },
                  {
                    icon: "settings",
                    text: t("projects.menu.settings"),
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
