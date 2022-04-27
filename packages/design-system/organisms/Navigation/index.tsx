import React, { memo } from "react";
import { useTheme } from "styled-components";
import { Button, Avatar } from "../../atoms";
import {
  Container,
  List,
  ListItem,
  LogoContainer,
  ButtonContainer,
} from "./styles";

interface ButtonLinkProps {
  isActive: boolean;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  isActive = false,
  children,
}) => (
  <ButtonContainer isActive={isActive}>
    <Button as="a" variant="primaryNeutral">
      {children}
    </Button>
  </ButtonContainer>
);

const Navigation = () => {
  const theme = useTheme();

  return (
    <Container data-testid="navigation">
      <List data-testid="navigation-left-ul">
        <ListItem>
          <LogoContainer>
            <Avatar alt="user image" userName="Logo" />
          </LogoContainer>
        </ListItem>
        <ListItem>
          <Button
            as="a"
            iconPlacement="right"
            icon="expand_more"
            variant="primaryNeutral"
          >
            Project Name
          </Button>
        </ListItem>
        <ListItem>
          <ButtonLink isActive>Features</ButtonLink>
        </ListItem>
        <ListItem>
          <ButtonLink isActive={false}>Settings</ButtonLink>
        </ListItem>
        <ListItem ml={theme.spacing.s3}>
          <Button variant="primary">Create flag</Button>
        </ListItem>
      </List>
      <List ml="auto" data-testid="navigation-right-ul">
        <ListItem>
          <ButtonLink isActive={false}>Documentation</ButtonLink>
        </ListItem>
        <ListItem>
          <ButtonLink isActive={false}>Resources</ButtonLink>
        </ListItem>
        <ListItem>
          <Button as="a" variant="primaryNeutral">
            Github
          </Button>
        </ListItem>
        <ListItem ml={theme.spacing.s3}>
          <Avatar alt="user image" userName="Flávio Amaral" />
        </ListItem>
      </List>
    </Container>
  );
};

export default memo(Navigation);
