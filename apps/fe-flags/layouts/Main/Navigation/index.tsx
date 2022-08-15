import { useCallback, useMemo } from "react";
import { useTheme } from "styled-components";
// Components
import { Avatar, Button, ButtonVariant } from "@basestack/design-system";
import { Container, List, ListItem, LogoContainer } from "./styles";
import { ButtonLink, MoreMenu, ProjectsMenu } from "./components";
// Router
import { useRouter } from "next/router";
import Link from "next/link";
// Types
import { inferQueryOutput } from "libs/trpc";
// Store
import {
  seIsCreateProjectModalOpen,
  seIstCreateFlagModalOpen,
} from "contexts/modals/actions";
// Hooks
import useModals from "hooks/useModals";
// Auth
import { useSession } from "next-auth/react";

export interface LinkItem {
  text: string;
  to: string;
  isExternal?: boolean;
}

const leftItems = [
  {
    text: "Features",
    to: "/[projectSlug]/flags",
  },
  {
    text: "Settings",
    to: "/[projectSlug]/settings/general",
  },
];

const rightItems = [
  {
    text: "Documentation",
    to: "/documentation",
  },
  {
    text: "Resources",
    to: "/resources",
  },
  {
    text: "Github",
    to: "https://github.com/",
    isExternal: true,
  },
];

interface NavigationProps {
  isDesktop: boolean;
  data?: inferQueryOutput<"project.all">;
}

const Navigation = ({ isDesktop, data }: NavigationProps) => {
  const theme = useTheme();
  const { data: session } = useSession();
  const { dispatch } = useModals();
  const router = useRouter();

  const projectSlug = router.query.projectSlug as string;

  const onRenderItems = useCallback(
    (items: LinkItem[], type: string) =>
      items.map(({ text, to, isExternal }, i) => {
        return (
          <ListItem key={`${type}-list-item-${i}`}>
            <ButtonLink
              href={to.replace("[projectSlug]", projectSlug)}
              isExternal={isExternal}
              isActive={router.pathname === to}
            >
              {text}
            </ButtonLink>
          </ListItem>
        );
      }),
    [router.pathname, projectSlug]
  );

  const onSelectProject = useCallback(
    (projectSlug: string) => {
      router.push({
        pathname: "/[projectSlug]/flags",
        query: { projectSlug },
      });
    },
    [router]
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
    [data, onSelectProject]
  );

  return (
    <Container data-testid="navigation">
      <List data-testid="navigation-left-ul">
        <ListItem>
          <Link href="/">
            <LogoContainer>
              <Avatar round={false} alt="user image" userName="Logo" />
            </LogoContainer>
          </Link>
        </ListItem>
        <ProjectsMenu
          onClickCreateProject={() =>
            dispatch(seIsCreateProjectModalOpen(true))
          }
          projectSlug={projectSlug}
          projects={projects ?? []}
        />
        {isDesktop && !!projectSlug && (
          <>
            {onRenderItems(leftItems, "left")}
            <ListItem ml={theme.spacing.s5}>
              <Button
                onClick={() => dispatch(seIstCreateFlagModalOpen(true))}
                variant={ButtonVariant.Primary}
              >
                Create flag
              </Button>
            </ListItem>
          </>
        )}
      </List>
      <List ml="auto" data-testid="navigation-right-ul">
        {isDesktop && <>{onRenderItems(rightItems, "right")}</>}
        {!isDesktop && <MoreMenu />}
        <ListItem ml={theme.spacing.s3}>
          <Avatar
            src={session?.user.image ?? ""}
            alt="user image"
            userName={session?.user.name ?? session?.user.email}
          />
        </ListItem>
      </List>
    </Container>
  );
};

export default Navigation;
