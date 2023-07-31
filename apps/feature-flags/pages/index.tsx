import { useCallback, useMemo } from "react";
import { useTheme } from "styled-components";
import Head from "next/head";
import { useRouter } from "next/router";
import { useStore } from "store";
import { trpc } from "libs/trpc";
import { useSession } from "next-auth/react";
// Components
import {
  Text,
  ButtonVariant,
  Card,
  Avatar,
  IconBox,
} from "@basestack/design-system";
import GetStartedCard from "components/GetStarted/GetStartedCard";
import TextLink from "components/GetStarted/TextLink";
// Styles
import {
  Container,
  ContentContainer,
  ProjectButton,
  ProjectsList,
  ProjectsListItem,
} from "components/GetStarted/styles";
// Layout
import MainLayout from "../layouts/Main";

const MainPage = () => {
  const router = useRouter();
  const theme = useTheme();

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
        <Text size="xLarge">Let’s get started</Text>
        <Text muted size="small" mb={theme.spacing.s5}>
          Follow the steps below to start
        </Text>
        <ContentContainer>
          {projects?.length && (
            <Card hasHoverAnimation p={theme.spacing.s5}>
              <Text size="large" mb={theme.spacing.s5}>
                Recent Projects
              </Text>
              <ProjectsList>
                {projects?.map((project) => (
                  <ProjectsListItem key={project.id}>
                    <ProjectButton onClick={project.onClick}>
                      <Avatar
                        size="small"
                        userName={project.text}
                        alt={`${project.text} project`}
                        round={false}
                      />
                      <Text size="small" ml={theme.spacing.s2}>
                        {project.text}
                      </Text>
                    </ProjectButton>
                  </ProjectsListItem>
                ))}
              </ProjectsList>
            </Card>
          )}
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
          <GetStartedCard
            icon={{
              name: "downloading",
              color: "green",
            }}
            title="Install our SDK"
            description="Integrate Moonflags into your Javascript, React, Go, PHP. More languages are coming soon!"
            button={{
              text: "View Instructions",
              onClick: () => console.log("instructions"),
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
      </Container>
    </div>
  );
};

MainPage.Layout = MainLayout;

export default MainPage;
