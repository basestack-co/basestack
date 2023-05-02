import { useCallback, useMemo } from "react";
import { useTheme } from "styled-components";
// Components
import { Avatar, Button, ButtonVariant } from "@basestack/design-system";
import { Container, List, ListItem, LogoContainer } from "./styles";
import AvatarDropdown from "./AvatarDropdown";
import { ButtonLink, MoreMenu, ProjectsMenu } from "./components";
// Router
import { useRouter } from "next/router";
import Link from "next/link";
// Types
import { RouterOutput } from "libs/trpc";
// Store
import { useStore } from "store";
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
    isExternal: true,
  },
  {
    text: "Resources",
    to: "/resources",
    isExternal: true,
  },
  {
    text: "Github",
    to: "https://github.com/",
    isExternal: true,
  },
];

interface NavigationProps {
  isDesktop: boolean;
  data?: RouterOutput["project"]["all"];
}

const Navigation = ({ isDesktop, data }: NavigationProps) => {
  const theme = useTheme();
  const { data: session } = useSession();
  const router = useRouter();

  const setCreateProjectModalOpen = useStore(
    (state) => state.setCreateProjectModalOpen
  );

  const setCreateFlagModalOpen = useStore(
    (state) => state.setCreateFlagModalOpen
  );

  const projectSlug = router.query.projectSlug as string;

  const onRenderItems = useCallback(
    (items: LinkItem[], type: string) =>
      items.map(({ text, to, isExternal }, i) => {
        return (
          <ListItem key={`${type}-list-item-${i}`}>
            <ButtonLink
              href={to.replace("[projectSlug]", projectSlug)}
              isExternal={isExternal}
              isActive={
                router.pathname === to ||
                router.pathname.includes(text.toLowerCase())
              }
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
            setCreateProjectModalOpen({ isOpen: true })
          }
          projectSlug={projectSlug}
          projects={projects ?? []}
        />
        {isDesktop && !!projectSlug && (
          <>
            {onRenderItems(leftItems, "left")}
            <ListItem ml={theme.spacing.s5}>
              <Button
                onClick={() => setCreateFlagModalOpen({ isOpen: true })}
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
          <AvatarDropdown
            name={session?.user.name || "User Name"}
            email={session?.user.email || ""}
            src={session?.user.image || ""}
          />
        </ListItem>
      </List>
    </Container>
  );
};

export default Navigation;
