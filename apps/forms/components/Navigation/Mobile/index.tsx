import React from "react";
// Store
import { useStore } from "store";
// Router
import { useRouter } from "next/router";
import Link from "next/link";
// UI
import { AvatarDropdown } from "@basestack/ui";
// Auth
import { signOut, useSession } from "next-auth/react";
// Components
import {
  fadeIn,
  slideInLeft,
  IconButton,
  Text,
  Button,
  ButtonVariant,
  HorizontalRule,
  PopupActionProps,
  Logo,
} from "@basestack/design-system";
import { animated, config, useTransition } from "react-spring";

// Styles
import { useTheme } from "styled-components";
import {
  BackDropCover,
  Container,
  Footer,
  Header,
  List,
  ListItem,
  TitleContainer,
  ContentContainer,
  GlobalStyle,
  ScrollableContent,
  StyledLink,
} from "./styles";
// Locales
import useTranslation from "next-translate/useTranslation";
// Data
import { internalLinks, externalLinks } from "../data";

const AnimatedBackDropCover = animated(BackDropCover);
const AnimatedNavigation = animated(Container);

interface NavigationDrawerProps {
  isDrawerOpen: boolean;
  onClose: () => void;
  data?: Array<PopupActionProps>;
}

const NavigationDrawer = ({
  isDrawerOpen,
  onClose,
  data,
}: NavigationDrawerProps) => {
  const { t } = useTranslation("navigation");
  const theme = useTheme();
  const { data: session } = useSession();
  const router = useRouter();
  const formId = router.query.formId as string;

  const setIsDarkMode = useStore((state) => state.setDarkMode);
  const isDarkMode = useStore((state) => state.isDarkMode);

  const setCreateProjectModalOpen = useStore(
    (state) => state.setCreateFormModalOpen,
  );

  const transitionNavigation = useTransition(isDrawerOpen, {
    config: { ...config.default, duration: 200 },
    ...slideInLeft,
  });

  const transitionBackdrop = useTransition(isDrawerOpen, {
    config: { ...config.default, duration: 150 },
    ...fadeIn,
  });

  return (
    <>
      {transitionNavigation(
        (styles, item) =>
          item && (
            <AnimatedNavigation style={styles}>
              <GlobalStyle />
              <Header>
                <Link href="/">
                  <Logo size={40} />
                </Link>
                <IconButton
                  icon="chevron_left"
                  onClick={onClose}
                  variant="neutral"
                />
              </Header>
              <ContentContainer>
                {!!formId && (
                  <>
                    <List>
                      {internalLinks.map((item, index) => (
                        <ListItem key={index}>
                          <Button
                            iconPlacement="left"
                            icon={item.icon}
                            variant={ButtonVariant.Neutral}
                            fullWidth
                            onClick={() => {
                              router.push({
                                pathname: item.to,
                                query: { formId },
                              });
                            }}
                          >
                            {t(item.i18nKey)}
                          </Button>
                        </ListItem>
                      ))}
                    </List>
                    <HorizontalRule m={theme.spacing.s5} mb={0} />
                  </>
                )}
                <ScrollableContent>
                  <TitleContainer>
                    <Text muted fontWeight={500}>
                      {t("forms.title")}
                    </Text>
                  </TitleContainer>
                  <List>
                    {data?.map(({ id, text, onClick }) => (
                      <ListItem key={id}>
                        <Button
                          iconPlacement="left"
                          icon="tag"
                          variant={ButtonVariant.Neutral}
                          onClick={onClick}
                          fullWidth
                        >
                          {text}
                        </Button>
                      </ListItem>
                    ))}
                    <ListItem>
                      <Button
                        iconPlacement="left"
                        icon="add"
                        variant={ButtonVariant.Neutral}
                        fullWidth
                        onClick={() => {
                          onClose();
                          setCreateProjectModalOpen({ isOpen: true });
                        }}
                      >
                        {t("create.form")}
                      </Button>
                    </ListItem>
                  </List>
                  <HorizontalRule m={theme.spacing.s5} />
                  <TitleContainer>
                    <Text muted fontWeight={500}>
                      {t("external.links")}
                    </Text>
                  </TitleContainer>
                  <List>
                    {externalLinks.map((item, index) => (
                      <ListItem key={index}>
                        <StyledLink
                          href={item.to}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            as="div"
                            iconPlacement="left"
                            icon={item.icon}
                            variant={ButtonVariant.Neutral}
                            fullWidth
                          >
                            {t(item.i18nKey)}
                          </Button>
                        </StyledLink>
                      </ListItem>
                    ))}
                  </List>
                </ScrollableContent>
              </ContentContainer>
              <HorizontalRule mx={theme.spacing.s5} my={0} />
              <Footer>
                <AvatarDropdown
                  name={session?.user.name || t("dropdown.username")}
                  email={session?.user.email || ""}
                  src={session?.user.image || ""}
                  darkModeText={t("dropdown.dark-mode")}
                  isDarkMode={isDarkMode}
                  onSetDarkMode={setIsDarkMode}
                  popupPlacement="top"
                  list={[
                    {
                      icon: "add_circle",
                      text: t("create.project"),
                    },
                    {
                      icon: "group_add",
                      text: t("dropdown.invite"),
                      isDisabled: true,
                      separator: true,
                    },
                    {
                      icon: "settings",
                      text: t("dropdown.settings"),
                      onClick: () =>
                        router.push({
                          pathname: "/profile/settings",
                        }),
                    },
                    {
                      icon: "logout",
                      text: t("dropdown.logout"),
                      onClick: signOut,
                    },
                  ]}
                  showFullButton
                />
              </Footer>
            </AnimatedNavigation>
          ),
      )}
      {transitionBackdrop(
        (styles, item) =>
          item && <AnimatedBackDropCover style={styles} onClick={onClose} />,
      )}
    </>
  );
};

export default NavigationDrawer;
