import React, { useCallback, useMemo } from "react";
import { useTheme } from "styled-components";
// Types
import { DesktopNavigationProps, LinkItem } from "../types";
// Components
import {
  Logo,
  Button,
  ButtonVariant,
  IconButton,
  Text,
} from "@basestack/design-system";
import { Container, List, ListItem, LogoContainer } from "./styles";
import ButtonLink from "../elements/ButtonLink";
import Selector from "../elements/Selector";

const Navigation = ({
  isDesktop,
  data,
  onClickMenuButton,
  projectId,
  pathname,
  externalLinks,
  internalLinks,
  onLogoClick,
  onCreateProject,
  rightSideComponent,
  createProjectText,
}: DesktopNavigationProps) => {
  const theme = useTheme();

  const onRenderItems = useCallback(
    (items: LinkItem[], type: string) =>
      items.map(({ text, to, isExternal }, i) => {
        return (
          <ListItem key={`${type}-list-item-${i}`}>
            <ButtonLink
              href={to.replace("[formId]", projectId)}
              isExternal={isExternal}
              isActive={
                pathname === to || pathname.includes(text.toLowerCase())
              }
            >
              {text}
            </ButtonLink>
          </ListItem>
        );
      }),
    [pathname, projectId],
  );

  const currentForm = useMemo(() => {
    const form = data?.find(({ id }) => id === projectId);

    return form?.text ?? "";
  }, [projectId, data]);

  const truncateFormName = (str: string) => {
    return str.length <= 18 ? str : str.slice(0, 18) + "...";
  };

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
            {!!currentForm && (
              <ListItem>
                <Text size="medium">{truncateFormName(currentForm)}</Text>
              </ListItem>
            )}
          </>
        )}
        {isDesktop && (
          <>
            <ListItem>
              <LogoContainer onClick={onLogoClick}>
                <Logo size={36} />
              </LogoContainer>
            </ListItem>
            <Selector
              onClickCreateProject={onCreateProject}
              currentProject={currentForm}
              projects={data ?? []}
            />
            {!!projectId && (
              <>
                {onRenderItems(internalLinks, "left")}
                <ListItem ml={theme.spacing.s3}>
                  <Button onClick={() => {}} variant={ButtonVariant.Primary}>
                    {createProjectText}
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
          <ListItem ml={theme.spacing.s3}>{rightSideComponent}</ListItem>
        </List>
      )}
    </Container>
  );
};

export default Navigation;
