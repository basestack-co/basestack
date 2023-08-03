import { useCallback, useMemo } from "react";
import { useTheme } from "styled-components";
import Head from "next/head";
import { useRouter } from "next/router";
import { useStore } from "store";
import { trpc } from "libs/trpc";
import { useSession } from "next-auth/react";
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
} from "@basestack/design-system";
import GetStartedCard from "components/GetStarted/GetStartedCard";
import TextLink from "components/GetStarted/TextLink";
// Styles
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
// Layout
import MainLayout from "../layouts/Main";

interface ProjectCardProps {
  id: string;
  text: string;
  onClick: () => void;
  flags: number;
}

const ProjectCard = ({ id, onClick, text, flags = 0 }: ProjectCardProps) => {
  const theme = useTheme();
  return (
    <ProjectsListItem>
      <ProjectCardButton onClick={onClick}>
        <Card height="100%" width="100%" hasHoverAnimation>
          <Box mb="auto" p={theme.spacing.s5}>
            <Avatar
              size="small"
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

  const setSDKModalOpen = useStore((state) => state.setSDKModalOpen);

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/sign-in");
    },
  });

  const { data } = trpc.project.all.useQuery(undefined, {
    enabled: status === "authenticated",
  });

  const setCreateProjectModalOpen = useStore(
    (state) => state.setCreateProjectModalOpen,
  );

  const onSelectProject = useCallback(
    (projectSlug: string) => {
      router.push({
        pathname: "/[projectSlug]/flags",
        query: { projectSlug },
      });
    },
    [router],
  );

  const projects = useMemo(
    () =>
      data?.projects.map((item) => {
        return {
          id: item.id,
          slug: item.slug,
          onClick: () => onSelectProject(item.slug),
          text: item.name,
        };
      }),
    [data, onSelectProject],
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
            {projects?.length && (
              <Button
                flexShrink={0}
                variant={ButtonVariant.Tertiary}
                onClick={() => setCreateProjectModalOpen({ isOpen: true })}
              >
                Create project
              </Button>
            )}
          </Header>
          {!projects?.length && (
            <GetStartedCard
              icon={{
                name: "folder_open",
                color: "blue",
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
          {projects?.length && (
            <ProjectsList>
              {projects.slice(0, 4).map((project) => (
                <ProjectCard
                  key={project.id}
                  text={project.text}
                  id={project.id}
                  onClick={project.onClick}
                  flags={0}
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
                color: "green",
              }}
              title="Install our SDK"
              description="Integrate Moonflags into your Javascript, React, Go, PHP. More languages are coming soon!"
              button={{
                text: "View Instructions",
                onClick: () => setSDKModalOpen({ isOpen: true }),
                variant: ButtonVariant.Tertiary,
              }}
            />
            <Card hasHoverAnimation p={theme.spacing.s5}>
              <IconBox icon="folder_open" color="gray" />
              <Text size="large" mb={theme.spacing.s2}>
                Documentation, help and support
              </Text>
              <TextLink
                text="Read our"
                link={{ text: "user guide", href: "/" }}
              />
              <TextLink
                text="Watch a quick"
                link={{ text: "video tour", href: "/" }}
              />
              <TextLink
                text="View docs for our"
                link={{ text: "SDK’s", href: "/" }}
              />
              <TextLink
                text=" Open an issue on"
                link={{ text: "Github", href: "/" }}
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
