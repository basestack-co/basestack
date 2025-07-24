import {
  Avatar,
  Button,
  ButtonVariant,
  HorizontalRule,
  Icon,
  Switch,
  slideBottom,
  slideTop,
  Text,
} from "@basestack/design-system";
// Components
import { autoUpdate, offset, useFloating } from "@floating-ui/react";
import React, { Fragment, memo, useCallback, useRef, useState } from "react";
import { animated, config, useTransition } from "react-spring";
import { useClickAway } from "react-use";
// Styles
import { useTheme } from "styled-components";
import {
  AvatarButton,
  AvatarDetailedButton,
  Container,
  Dropdown,
  Header,
  HeaderWrapper,
  HrContainer,
  List,
  ListItem,
  ThemeContainer,
} from "./styles";

const AnimatedAvatarDropdown: any = animated(Dropdown);

export interface ListItem {
  text: string;
  icon: string;
  onClick?: () => void;
  separator?: boolean;
  isDisabled?: boolean;
}

export interface AvatarDropdownProps {
  name: string;
  email: string;
  src: string;
  showFullButton?: boolean;
  popupPlacement?: "bottom-end" | "top";
  isDarkMode: boolean;
  darkModeText: string;
  onSetDarkMode: (isDarkMode: boolean) => void;
  list: ListItem[];
}

const AvatarDropdown = ({
  name,
  email,
  src,
  showFullButton,
  popupPlacement = "bottom-end",
  isDarkMode,
  onSetDarkMode,
  darkModeText = "Dark Mode",
  list,
}: AvatarDropdownProps) => {
  const theme = useTheme();

  const menuWrapperRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { x, y, refs, strategy } = useFloating({
    placement: popupPlacement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(5)],
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
          <Icon
            icon={isMenuOpen ? "arrow_drop_up" : "arrow_drop_down"}
            ml="auto"
          />
        </AvatarDetailedButton>
      ) : (
        <AvatarButton ref={refs.setReference} onClick={onClickMenu}>
          <Avatar size="small" userName={name} alt="User Image" src={src} />
        </AvatarButton>
      )}
      {transitionMorePopup(
        (styles, item) =>
          item && (
            <AnimatedAvatarDropdown
              style={styles}
              ref={refs.setFloating}
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
                  <Icon icon="dark_mode" mr={theme.spacing.s2} />
                  <Text size="small" fontWeight={500} mr={theme.spacing.s2}>
                    {darkModeText}
                  </Text>
                  <Switch
                    onChange={(event) => {
                      onSetDarkMode(event.target.checked);
                    }}
                    checked={isDarkMode}
                    ml="auto"
                  />
                </ThemeContainer>
                <HorizontalRule />
              </Header>
              <List>
                {list?.map((item, index) => {
                  return (
                    <Fragment key={`list-item-${index}`}>
                      <ListItem>
                        <Button
                          icon={item.icon}
                          iconPlacement="left"
                          variant={ButtonVariant.Neutral}
                          isDisabled={item.isDisabled}
                          fullWidth
                          onClick={() => {
                            setIsMenuOpen(false);
                            if (item.onClick) {
                              item.onClick();
                            }
                          }}
                        >
                          {item.text}
                        </Button>
                      </ListItem>
                      {item.separator && (
                        <HrContainer>
                          <HorizontalRule />
                        </HrContainer>
                      )}
                    </Fragment>
                  );
                })}
              </List>
            </AnimatedAvatarDropdown>
          ),
      )}
    </Container>
  );
};

export default memo(AvatarDropdown);
