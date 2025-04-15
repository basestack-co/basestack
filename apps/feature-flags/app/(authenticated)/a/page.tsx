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
  Button,
  ButtonVariant,
  Card,
  IconBox,
  Text,
  Skeleton,
} from "@basestack/design-system";
import GetStartedCard from "./_components/GetStarted/GetStartedCard";
import TextLink from "./_components/GetStarted/TextLink";
import { ProjectCard } from "@basestack/ui";
// Styles
import { useTheme } from "styled-components";
import {
  Container,
  ContentContainer,
  Header,
  ProjectsList,
  ProjectsListItem,
  Section,
} from "./_components/GetStarted/styles";
import UsageSection from "../../../components/Usage";
// Utils
import { config } from "@basestack/utils";

const MainPage = () => {
  const t = useTranslations("home");
  const router = useRouter();
  const theme = useTheme();

  const setIntegrationModalOpen = useStore(
    (state) => state.setIntegrationModalOpen,
  );

  const { data, isLoading } = api.project.recent.useQuery(undefined, {
    select: (projects) =>
      projects?.map((item) => ({
        id: item.id,
        slug: item.slug,
        onClick: () => router.push(`/a/project/${item.id}/flags`),
        text: item.name,
        flags: item.flags,
      })),
  });

  const setCreateProjectModalOpen = useStore(
    (state) => state.setCreateProjectModalOpen,
  );

  const usageMock = [
    { title: "Storage", used: 0.07, total: 0.5, description: "GB" },
    { title: "Compute", used: 2.12, total: 200, description: "h" },
    { title: "Branch Compute", used: 4, total: 5, description: "h" },
    { title: "Projects", used: 2, total: 10 },
  ];

  return (
    <div>
      <Container>
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
            <GetStartedCard
              icon={{
                name: "folder_open",
              }}
              title={t("projects.empty.title")}
              description={t("projects.empty.description")}
              button={{
                text: t("projects.empty.action"),
                onClick: () => setCreateProjectModalOpen({ isOpen: true }),
                variant: ButtonVariant.Primary,
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
                <ProjectsListItem key={project.id}>
                  <ProjectCard
                    text={project.text}
                    onClick={project.onClick}
                    flags={project.flags.count}
                  />
                </ProjectsListItem>
              ))}
            </ProjectsList>
          )}
        </Section>

        <UsageSection
          mb={theme.spacing.s7}
          title={t("usage.title")}
          date="Apr 1, 2025 to now"
          link="Upgrade"
          href="/"
          data={usageMock}
        />

        <Section>
          <Header>
            <Text size="xLarge" mr={theme.spacing.s5}>
              {t("links.title")}
            </Text>
          </Header>
          <ContentContainer>
            <GetStartedCard
              icon={{
                name: "downloading",
              }}
              title={t("links.sdks.title")}
              description={t("links.sdks.description")}
              button={{
                text: t("links.sdks.action"),
                onClick: () => setIntegrationModalOpen({ isOpen: true }),
                variant: ButtonVariant.Outlined,
              }}
            />
            <Card hasHoverAnimation p={theme.spacing.s5}>
              <IconBox icon="folder_open" mb={theme.spacing.s5} />
              <Text size="large" mb={theme.spacing.s2}>
                {t("links.external.title")}
              </Text>
              <TextLink
                text={t("links.external.read_the")}
                link={{
                  text: t("links.external.docs"),
                  href: config.urls.docs.flags.base,
                  target: "_blank",
                }}
              />
              <TextLink
                text={t("links.external.check_out_the")}
                link={{
                  text: t("links.external.sdks"),
                  href: config.urls.docs.flags.sdk.base,
                  target: "_blank",
                }}
              />
              <TextLink
                text={t("links.external.how_to")}
                link={{
                  text: t("links.external.contribute"),
                  href: config.urls.docs.contribute,
                  target: "_blank",
                }}
              />
              <TextLink
                text={t("links.external.open_on")}
                link={{
                  text: t("links.external.github"),
                  href: config.urls.repo,
                  target: "_blank",
                }}
                hasMarginBottom={false}
              />
            </Card>
          </ContentContainer>
        </Section>
      </Container>
    </div>
  );
};

export default MainPage;
