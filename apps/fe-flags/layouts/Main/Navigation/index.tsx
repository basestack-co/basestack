import { memo, useCallback, useMemo, useState } from "react";
import { useTheme } from "styled-components";
import { useMediaQuery } from "@basestack/hooks";
// Components
import { Avatar, Button, ButtonVariant } from "@basestack/design-system";
import { Container, List, ListItem, LogoContainer } from "./styles";
import { ButtonLink, MoreMenu, ProjectsMenu } from "./components";
// Server
import { trpc } from "libs/trpc";
// Router
import { useRouter } from "next/router";
// Store
import {
  seIsCreateProjectModalOpen,
  seIstCreateFlagModalOpen,
} from "contexts/modals/actions";
// Hooks
import useModals from "hooks/useModals";

export interface LinkItem {
  text: string;
  to: string;
  isExternal?: boolean;
}

const leftItems = [
  {
    text: "Features",
    to: "/flags",
  },
  {
    text: "Settings",
    to: "/settings/general",
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
}

const Navigation = ({ isDesktop }: NavigationProps) => {
  const theme = useTheme();

  const { dispatch } = useModals();
  const router = useRouter();
  const { data, isLoading } = trpc.useQuery(["project.all"]);
  const [projectId, setProjectId] = useState("");

  const onRenderItems = useCallback(
    (items: LinkItem[], type: string) =>
      items.map(({ text, to, isExternal }, i) => {
        return (
          <ListItem key={`${type}-list-item-${i}`}>
            <ButtonLink
              href={to}
              isExternal={isExternal}
              isActive={router.pathname === to}
            >
              {text}
            </ButtonLink>
          </ListItem>
        );
      }),
    [router.pathname]
  );

  const onSelectProject = (id: string) => {
    setProjectId(id);
  };

  const projects = useMemo(
    () =>
      data?.projects.map((item) => {
        return {
          id: item.id,
          onClick: () => onSelectProject(item.id),
          text: item.name,
        };
      }),
    [data]
  );

  return (
    <Container data-testid="navigation">
      <List data-testid="navigation-left-ul">
        <ListItem>
          <LogoContainer>
            <Avatar round={false} alt="user image" userName="Logo" />
          </LogoContainer>
        </ListItem>
        <ProjectsMenu
          onClickCreateProject={() =>
            dispatch(seIsCreateProjectModalOpen(true))
          }
          projectId={projectId}
          projects={projects ?? []}
        />
        {isDesktop && (
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
          <Avatar alt="user image" userName="Flávio Amaral" />
        </ListItem>
      </List>
    </Container>
  );
};

export default Navigation;
