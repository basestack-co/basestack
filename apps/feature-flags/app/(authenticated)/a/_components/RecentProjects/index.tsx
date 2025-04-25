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
import {
  Avatar,
  Button,
  ButtonVariant,
  Card,
  Text,
  HorizontalRule,
  Icon,
  Skeleton,
  Empty,
} from "@basestack/design-system";
// Styles
import { useTheme } from "styled-components";
// Utils
import {
  Box,
  ProjectCardButton,
  ProjectsListItem,
  ProjectsList,
  Row,
  Section,
  Header,
} from "./styles";

interface ProjectCardProps {
  text: string;
  onClick: () => void;
  flags: number;
}

const ProjectCard = ({ onClick, text, flags = 0 }: ProjectCardProps) => {
  const theme = useTheme();
  return (
    <ProjectsListItem>
      <ProjectCardButton onClick={onClick}>
        <Card height="100%" width="100%" hasHoverAnimation>
          <Box mb="auto" p={theme.spacing.s5}>
            <Avatar
              size="xSmall"
              userName={text}
              alt={`${text} project`}
              round={false}
            />
            <Text size="small" textAlign="left" mt={theme.spacing.s3}>
              {text}
            </Text>
          </Box>
          <HorizontalRule />
          <Box p={`${theme.spacing.s3} ${theme.spacing.s5}`}>
            <Row>
              <Icon icon="flag" size="small" />
              <Text size="small" textAlign="left" ml={theme.spacing.s1}>
                {flags}
              </Text>
            </Row>
          </Box>
        </Card>
      </ProjectCardButton>
    </ProjectsListItem>
  );
};

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
          <Skeleton
            numberOfItems={1}
            items={[
              { h: 28, w: 28, mb: 12 },
              { h: 22, w: "50%", mb: 32 },
              { h: 22, w: 28 },
            ]}
            padding="20px 20px 12px 20px"
          />
        </ProjectsList>
      )}
      {!isLoading && !!data?.length && (
        <ProjectsList>
          {data.slice(0, 4).map((project) => (
            <ProjectCard
              key={project.id}
              text={project.text}
              onClick={project.onClick}
              flags={project.flags.count}
            />
          ))}
        </ProjectsList>
      )}
    </Section>
  );
};

export default RecentProjects;
