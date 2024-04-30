import React from "react";
import Head from "next/head";
// Locales
import useTranslation from "next-translate/useTranslation";
// Router
import { useRouter } from "next/router";
// Store
import { useStore } from "store";
// Server
import { trpc } from "libs/trpc";
// Components
import {
  Avatar,
  Button,
  ButtonVariant,
  Card,
  IconBox,
  Text,
  HorizontalRule,
  Icon,
  Skeleton,
} from "@basestack/design-system";
import GetStartedCard from "components/GetStarted/GetStartedCard";
import TextLink from "components/GetStarted/TextLink";
// Styles
import { useTheme } from "styled-components";
import {
  Box,
  Container,
  ContentContainer,
  Header,
  ProjectCardButton,
  ProjectsList,
  ProjectsListItem,
  Row,
  Section,
} from "components/GetStarted/styles";
// Utils
import { config } from "@basestack/utils";
// Layout
import MainLayout from "../layouts/Main";

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

const MainPage = () => {
  const { t } = useTranslation("home");
  const router = useRouter();
  const theme = useTheme();

  const setIntegrationModalOpen = useStore(
    (state) => state.setIntegrationModalOpen,
  );

  const { data, isLoading } = trpc.project.recent.useQuery(undefined, {
    select: (projects) =>
      projects?.map((item) => ({
        id: item.id,
        slug: item.slug,
        onClick: () =>
          router.push({
            pathname: "/project/[projectId]/flags",
            query: { projectId: item.id },
          }),
        text: item.name,
        flags: item.flags,
      })),
  });

  const setCreateProjectModalOpen = useStore(
    (state) => state.setCreateProjectModalOpen,
  );

  return (
    <div>
      <Head>
        <title>Basestack / Feature Flags</title>
      </Head>
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

MainPage.Layout = MainLayout;

export default MainPage;
