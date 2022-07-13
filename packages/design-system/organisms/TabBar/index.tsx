import { memo } from "react";
import { useTheme } from "styled-components";
import { IconButton, Icon } from "../../atoms";
import { Container, List, ListItem, StyledButton } from "./styles";
import { useMediaQuery } from "@basestack/hooks";

export interface ButtonProps {
  icon: string;
  text: string;
  isActive: boolean;
  href: string;
}

export interface TabBarProps {
  /**
   * create flag callback
   */
  onCreateFlag: () => void;
  pathname: string;
}

const ButtonLink = ({ icon, text, isActive, href }: ButtonProps) => {
  const theme = useTheme();
  const isMediumDevice = useMediaQuery(theme.device.min.md);

  return (
    <StyledButton href={href} isActive={isActive}>
      <Icon
        icon={icon}
        size="medium"
        mr={isMediumDevice ? theme.spacing.s2 : 0}
        color={isActive ? theme.colors.primary : theme.colors.black}
      />
      {isMediumDevice && <span>{text}</span>}
    </StyledButton>
  );
};

const TabBar = ({ onCreateFlag, pathname }: TabBarProps) => {
  const theme = useTheme();

  return (
    <Container data-testid="tab-bar">
      <List>
        <ListItem>
          <ButtonLink
            href="/flags"
            isActive={pathname === "/flags"}
            icon="flag"
            text="Features"
          />
        </ListItem>
        <ListItem>
          <ButtonLink
            href="/settings/general"
            isActive={pathname ? pathname.includes("settings") : false}
            icon="settings"
            text="Settings"
          />
        </ListItem>
        <ListItem>
          <IconButton
            mx={theme.spacing.s3}
            variant="primary"
            size="large"
            icon="add"
            onClick={onCreateFlag}
          />
        </ListItem>
        <ListItem>
          <ButtonLink href="/" isActive={false} icon="flag" text="Features" />
        </ListItem>
        <ListItem>
          <ButtonLink
            href="/"
            isActive={false}
            icon="settings"
            text="Settings"
          />
        </ListItem>
      </List>
    </Container>
  );
};

export default memo(TabBar);
