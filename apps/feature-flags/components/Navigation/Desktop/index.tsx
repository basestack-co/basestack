import React, { useCallback, useMemo } from "react";
import { useTheme } from "styled-components";
// Components
import {
  Avatar,
  Button,
  ButtonVariant,
  IconButton,
  PopupActionProps,
  Text,
} from "@basestack/design-system";
import { Container, List, ListItem, LogoContainer } from "./styles";
import ButtonLink from "../ButtonLink";
import ProjectsMenu from "../../ProjectsMenu";
import AvatarDropdown from "../../AvatarDropdown";
import { internalLinks, externalLinks } from "../data";
// Router
import { useRouter } from "next/router";
import Link from "next/link";
// Store
import { useStore } from "store";
// Auth
import { useSession } from "next-auth/react";

export interface LinkItem {
  text: string;
  to: string;
  isExternal?: boolean;
}

interface NavigationProps {
  isDesktop: boolean;
  data?: Array<PopupActionProps>;
  onClickMenuButton: () => void;
}

const Navigation = ({
  isDesktop,
  data,
  onClickMenuButton,
}: NavigationProps) => {
  const theme = useTheme();
  const { data: session } = useSession();
  const router = useRouter();

  const setCreateProjectModalOpen = useStore(
    (state) => state.setCreateProjectModalOpen,
  );

  const setCreateFlagModalOpen = useStore(
    (state) => state.setCreateFlagModalOpen,
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
    [router.pathname, projectSlug],
  );

  const currentProject = useMemo(() => {
    const project = data?.find(({ slug }) => slug === projectSlug);

    return project?.text ?? "";
  }, [projectSlug, data]);

  return (
    <Container data-testid="navigation">
      <List data-testid="navigation-left-ul">
        {!isDesktop && (
          <>
            <ListItem>
              <IconButton
                mr={theme.spacing.s3}
                icon="menu"
                size="medium"
                onClick={onClickMenuButton}
              />
            </ListItem>
            {!!currentProject && (
              <ListItem>
                <Text size="medium">{currentProject}</Text>
              </ListItem>
            )}
          </>
        )}
        {isDesktop && (
          <>
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
              currentProject={currentProject}
              projects={data ?? []}
            />
            {!!projectSlug && (
              <>
                {onRenderItems(internalLinks, "left")}
                <ListItem ml={theme.spacing.s5}>
                  <Button
                    onClick={() => setCreateFlagModalOpen({ isOpen: true })}
                    variant={ButtonVariant.Primary}
                  >
                    Create
                  </Button>
                </ListItem>
              </>
            )}
          </>
        )}
      </List>
      {isDesktop && (
        <List ml="auto" data-testid="navigation-right-ul">
          {onRenderItems(externalLinks, "right")}
          <ListItem ml={theme.spacing.s3}>
            <AvatarDropdown
              name={session?.user.name || "User Name"}
              email={session?.user.email || ""}
              src={session?.user.image || ""}
            />
          </ListItem>
        </List>
      )}
    </Container>
  );
};

export default Navigation;
