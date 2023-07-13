import React, { memo, useCallback, useRef, useState } from "react";
import { autoUpdate, offset, useFloating } from "@floating-ui/react";
import { animated, config, useTransition } from "react-spring";
import { useClickAway } from "@basestack/hooks";
import {
  Avatar,
  Text,
  Button,
  ButtonVariant,
  HorizontalRule,
  Icon,
  Switch,
} from "@basestack/design-system";
import {
  slideTop,
  slideBottom,
} from "@basestack/design-system/animations/springs";
import {
  ListItem,
  AvatarButton,
  Dropdown,
  Header,
  HeaderWrapper,
  ThemeContainer,
  List,
  HrContainer,
  Container,
  AvatarDetailedButton,
} from "./styles";
import theme from "@basestack/design-system/theme";

const AnimatedAvatarDropdown = animated(Dropdown);

interface AvatarMenuProps {
  name: string;
  email: string;
  src: string;
  showFullButton?: boolean;
  popupPlacement?: "bottom-end" | "top";
}

const AvatarDropdown = ({
  name,
  email,
  src,
  showFullButton,
  popupPlacement = "bottom-end",
}: AvatarMenuProps) => {
  const menuWrapperRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { x, y, refs, strategy } = useFloating({
    placement: popupPlacement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(4)],
  });

  const onClickMenu = useCallback(() => {
    setIsMenuOpen((prevState) => !prevState);
  }, []);

  const animationDirection =
    popupPlacement === "bottom-end" ? slideBottom : slideTop;

  const transitionMorePopup = useTransition(isMenuOpen, {
    config: { ...config.default, duration: 150 },
    ...animationDirection,
  });

  useClickAway(menuWrapperRef, () => {
    setIsMenuOpen(false);
  });

  return (
    <Container ref={menuWrapperRef}>
      {showFullButton ? (
        <AvatarDetailedButton ref={refs.setReference} onClick={onClickMenu}>
          <Avatar
            round
            alt="user image"
            src={src}
            userName={name}
            mr={theme.spacing.s3}
          />
          <div>
            <Text size="medium">{name}</Text>
            <Text size="small" muted lineHeight="1.2">
              {email}
            </Text>
          </div>
          <Icon icon={isMenuOpen ? "expand_less" : "expand_more"} ml="auto" />
        </AvatarDetailedButton>
      ) : (
        <AvatarButton ref={refs.setReference} onClick={onClickMenu}>
          <Avatar userName={name} alt="User Image" src={src} />
        </AvatarButton>
      )}
      {transitionMorePopup(
        (styles, item) =>
          item && (
            <AnimatedAvatarDropdown
              style={styles}
              ref={refs.setFloating}
              // @ts-ignore
              position={strategy}
              top={y}
              left={x}
            >
              <Header>
                {!showFullButton && (
                  <HeaderWrapper>
                    <Avatar
                      size="large"
                      userName={name}
                      alt="User Image"
                      src={src}
                      mr={theme.spacing.s3}
                    />
                    <div>
                      <Text size="medium">{name}</Text>
                      <Text size="small" muted lineHeight="1.2">
                        {email}
                      </Text>
                    </div>
                  </HeaderWrapper>
                )}
                <ThemeContainer showFullButton={showFullButton}>
                  <Icon
                    icon={isDarkMode ? "dark_mode" : "light_mode"}
                    color={theme.colors.black}
                    mr={theme.spacing.s2}
                  />
                  <Text size="small" fontWeight={500} mr={theme.spacing.s2}>
                    {isDarkMode ? "Dark Mode" : "Light Mode"}
                  </Text>
                  <Switch
                    onChange={(event) => setIsDarkMode(event.target.checked)}
                    checked={isDarkMode}
                    ml="auto"
                  />
                </ThemeContainer>
                <HorizontalRule />
              </Header>
              <List>
                <ListItem mb={theme.spacing.s1}>
                  <Button
                    icon="add_circle"
                    iconPlacement="left"
                    variant={ButtonVariant.Neutral}
                    fullWidth
                    onClick={() => console.log("damm")}
                  >
                    Create Project
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    icon="group_add"
                    iconPlacement="left"
                    variant={ButtonVariant.Neutral}
                    fullWidth
                    onClick={() => console.log("damm")}
                  >
                    Invite Team
                  </Button>
                </ListItem>
                <HrContainer>
                  <HorizontalRule />
                </HrContainer>
                <ListItem mb={theme.spacing.s1}>
                  <Button
                    icon="settings"
                    iconPlacement="left"
                    variant={ButtonVariant.Neutral}
                    fullWidth
                    onClick={() => console.log("damm")}
                  >
                    Settings
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    icon="logout"
                    iconPlacement="left"
                    variant={ButtonVariant.Neutral}
                    fullWidth
                    onClick={() => console.log("damm")}
                  >
                    Logout
                  </Button>
                </ListItem>
              </List>
            </AnimatedAvatarDropdown>
          ),
      )}
    </Container>
  );
};

export default memo(AvatarDropdown);
