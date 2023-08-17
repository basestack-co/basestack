import React from "react";
import Head from "next/head";
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
            pathname: "/[projectSlug]/flags",
            query: { projectSlug: item.slug },
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
              Recent projects
            </Text>
            {!!data?.length && (
              <Button
                flexShrink={0}
                variant={ButtonVariant.Outlined}
                onClick={() => setCreateProjectModalOpen({ isOpen: true })}
              >
                Create project
              </Button>
            )}
          </Header>
          {!isLoading && !data?.length && (
            <GetStartedCard
              icon={{
                name: "folder_open",
              }}
              title="Create your first project"
              description="Create your first project to start creating flags!"
              button={{
                text: "Create Project",
                onClick: () => setCreateProjectModalOpen({ isOpen: true }),
                variant: ButtonVariant.Primary,
              }}
            />
          )}
          {isLoading && (
            <ProjectsList>
              <Skeleton
                numberOfItems={3}
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
              Quick links
            </Text>
          </Header>
          <ContentContainer>
            <GetStartedCard
              icon={{
                name: "downloading",
              }}
              title="Set Up the SDK"
              description="Integrate Feature Flags into your Product using the official SDKs. Discover the available libraries."
              button={{
                text: "View Instructions",
                onClick: () => setIntegrationModalOpen({ isOpen: true }),
                variant: ButtonVariant.Outlined,
              }}
            />
            <Card hasHoverAnimation p={theme.spacing.s5}>
              <IconBox icon="folder_open" mb={theme.spacing.s5} />
              <Text size="large" mb={theme.spacing.s2}>
                Documentation, Help and Support
              </Text>
              <TextLink
                text="Read the"
                link={{
                  text: "Documentation",
                  href: config.urls.docs.flags.base,
                  target: "_blank",
                }}
              />
              <TextLink
                text="Check out the"
                link={{
                  text: "SDK’s",
                  href: config.urls.docs.flags.sdk.base,
                  target: "_blank",
                }}
              />
              <TextLink
                text="How to"
                link={{
                  text: "Contribute?",
                  href: config.urls.docs.contribute,
                  target: "_blank",
                }}
              />
              <TextLink
                text=" Open an issue on"
                link={{
                  text: "Github",
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
