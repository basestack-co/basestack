import React, { memo, useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useTheme } from "styled-components";
import { useStore } from "store";
// Auth
import { signOut } from "next-auth/react";
// Locales
import useTranslation from "next-translate/useTranslation";
// Components
import { autoUpdate, offset, useFloating } from "@floating-ui/react";
import { animated, config, useTransition } from "react-spring";
import { useClickAway } from "react-use";
import {
  Avatar,
  Text,
  Button,
  ButtonVariant,
  HorizontalRule,
  Icon,
  Switch,
  slideTop,
  slideBottom,
} from "@basestack/design-system";
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
  const { t } = useTranslation("navigation");
  const router = useRouter();
  const theme = useTheme();
  const setIsDarkMode = useStore((state) => state.setDarkMode);
  const isDarkMode = useStore((state) => state.isDarkMode);

  const menuWrapperRef = useRef(null);
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

  const setCreateProjectModalOpen = useStore(
    (state) => state.setCreateProjectModalOpen,
  );

  const setInviteMemberModalOpen = useStore(
    (state) => state.setInviteMemberModalOpen,
  );

  const projectSlug = router.query.projectSlug as string;

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
          <Avatar size="small" userName={name} alt="User Image" src={src} />
          <Icon
            ml="2px"
            icon={isMenuOpen ? "arrow_drop_up" : "arrow_drop_down"}
          />
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
                  <Icon icon="dark_mode" mr={theme.spacing.s2} />
                  <Text size="small" fontWeight={500} mr={theme.spacing.s2}>
                    Dark Mode
                  </Text>
                  <Switch
                    onChange={(event) => {
                      setIsDarkMode(event.target.checked);
                    }}
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
                    onClick={() => {
                      setCreateProjectModalOpen({ isOpen: true });
                      setIsMenuOpen(false);
                    }}
                  >
                    {t("create.project")}
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    icon="group_add"
                    iconPlacement="left"
                    variant={ButtonVariant.Neutral}
                    fullWidth
                    isDisabled
                    onClick={() => {
                      setInviteMemberModalOpen({ isOpen: true });
                      setIsMenuOpen(false);
                    }}
                  >
                    {t("dropdown.invite")}
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
                    isDisabled
                    onClick={() => {
                      router.push({
                        pathname: "/[projectSlug]/settings/general",
                        query: { projectSlug },
                      });
                    }}
                  >
                    {t("dropdown.settings")}
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    icon="logout"
                    iconPlacement="left"
                    variant={ButtonVariant.Neutral}
                    fullWidth
                    onClick={signOut}
                  >
                    {t("dropdown.logout")}
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
