import { memo, useCallback } from "react";
import { useTheme } from "styled-components";
import { useMediaQuery } from "@basestack/hooks";
import { Avatar, Button, ButtonVariant } from "../../atoms";
import { Container, List, ListItem, LogoContainer } from "./styles";
import { ButtonLink, MoreMenu, ProjectsMenu } from "./components";
import { PopupItem } from "../../molecules/PopupActions";

export interface LinkItem {
  text: string;
  onClick: (to: string, isExternal?: boolean) => void;
  to: string;
  isExternal?: boolean;
}

export interface NavigationProps {
  /**
   * create callback
   */
  onCreate: () => void;
  /**
   * pathname
   */
  pathname: string;
  /**
   * Left items navigation
   */
  leftItems: Array<LinkItem>;
  /**
   * Right items navigation
   */
  rightItems: Array<LinkItem>;
  projects: Array<PopupItem>;
  projectId: string;
}

const Navigation = ({
  onCreate,
  pathname,
  leftItems,
  rightItems,
  projects,
  projectId,
}: NavigationProps) => {
  const theme = useTheme();
  const isLargeDevice = useMediaQuery(theme.device.min.lg);

  const onRenderItems = useCallback(
    (items: LinkItem[], type: string) =>
      items.map(({ text, onClick, to, isExternal }, i) => {
        return (
          <ListItem key={`${type}-list-item-${i}`}>
            <ButtonLink
              onClick={() => onClick(to, isExternal)}
              isActive={pathname === to}
            >
              {text}
            </ButtonLink>
          </ListItem>
        );
      }),
    []
  );

  return (
    <Container data-testid="navigation">
      <List data-testid="navigation-left-ul">
        <ListItem>
          <LogoContainer>
            <Avatar round={false} alt="user image" userName="Logo" />
          </LogoContainer>
        </ListItem>
        {projects && !!projects.length && (
          <ProjectsMenu projectId={projectId} projects={projects} />
        )}

        {isLargeDevice && (
          <>
            {onRenderItems(leftItems, "left")}

            <ListItem ml={theme.spacing.s5}>
              <Button onClick={onCreate} variant={ButtonVariant.Primary}>
                Create flag
              </Button>
            </ListItem>
          </>
        )}
      </List>
      <List ml="auto" data-testid="navigation-right-ul">
        {isLargeDevice && <>{onRenderItems(rightItems, "rigth")}</>}
        {!isLargeDevice && <MoreMenu />}
        <ListItem ml={theme.spacing.s3}>
          <Avatar alt="user image" userName="Flávio Amaral" />
        </ListItem>
      </List>
    </Container>
  );
};

export default memo(Navigation);
