import React, { memo, useCallback, useState } from "react";
import { useFloating, autoUpdate, offset } from "@floating-ui/react-dom";
import { useTheme } from "styled-components";
import { useTransition, animated, config } from "react-spring";
import { Button, Avatar } from "../../atoms";
import { PopupActions } from "../../molecules";
import {
  Container,
  List,
  ListItem,
  LogoContainer,
  ButtonContainer,
} from "./styles";
import { ButtonLinkProps, NavigationProps } from "./types";
import { scaleInTopLeft } from "../../animations/springs";

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

const AnimatedPopup = animated(PopupActions);

const Navigation = ({ onCreateFlag }: NavigationProps) => {
  const theme = useTheme();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { x, y, reference, floating, strategy } = useFloating({
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
    middleware: [offset(4)],
  });

  const onClickMore = useCallback(() => {
    setIsPopupOpen((prevState) => !prevState);
  }, []);

  const transitionPopup = useTransition(isPopupOpen, {
    config: { ...config.default, duration: 150 },
    ...scaleInTopLeft,
  });

  return (
    <Container data-testid="navigation">
      <List data-testid="navigation-left-ul">
        <ListItem>
          <LogoContainer>
            <Avatar round={false} alt="user image" userName="Logo" />
          </LogoContainer>
        </ListItem>
        <ListItem>
          <Button
            ref={reference}
            iconPlacement="right"
            icon="expand_more"
            variant="primaryNeutral"
            onClick={onClickMore}
          >
            Project Name
          </Button>
          {transitionPopup(
            (styles, item) =>
              item && (
                <AnimatedPopup
                  style={styles}
                  ref={floating}
                  position={strategy}
                  top={y}
                  left={x}
                  title="Projects"
                  items={[
                    {
                      text: "Moon flags",
                      onClick: () => console.log("clicked"),
                      logo: "",
                    },
                    {
                      text: "Teams kids",
                      onClick: () => console.log("clicked"),
                      logo: "",
                    },
                  ]}
                  button={{
                    text: "Create Project",
                    onClick: () => console.log("clicked"),
                  }}
                />
              )
          )}
        </ListItem>
        <ListItem>
          <ButtonLink isActive>Features</ButtonLink>
        </ListItem>
        <ListItem>
          <ButtonLink isActive={false}>Settings</ButtonLink>
        </ListItem>
        <ListItem ml={theme.spacing.s3}>
          <Button onClick={onCreateFlag} variant="primary">
            Create flag
          </Button>
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
