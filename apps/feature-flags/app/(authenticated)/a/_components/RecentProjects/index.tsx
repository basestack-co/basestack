"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useStore } from "store";
import { api } from "utils/trpc/react";
import { ProjectCard, ProjectCardLoading } from "@basestack/ui";
import { Button, ButtonVariant, Text, Empty } from "@basestack/design-system";
import { useTheme } from "styled-components";
import { ProjectsListItem, ProjectsList, Section, Header } from "./styles";

const RecentProjects = () => {
  const t = useTranslations("home");
  const theme = useTheme();
  const router = useRouter();
  const setCreateProjectModalOpen = useStore(
    (state) => state.setCreateProjectModalOpen,
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
                    icon: "edit",
                    text: "Edit",
                    onClick: () => console.log("edit"),
                  },
                  {
                    icon: "delete",
                    text: "Delete",
                    onClick: () => console.log("delete"),
                    variant: ButtonVariant.Danger,
                  },
                ]}
              />
            </ProjectsListItem>
          ))}
        </ProjectsList>
      )}
    </Section>
  );
};

export default RecentProjects;
