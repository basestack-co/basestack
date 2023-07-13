import React, { useCallback } from "react";
import { useTheme } from "styled-components";
import { animated, config, useTransition } from "react-spring";
import {
  fadeIn,
  slideInLeft,
} from "@basestack/design-system/animations/springs";
import { useStore } from "store";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {
  IconButton,
  Text,
  Button,
  ButtonVariant,
  Avatar,
} from "@basestack/design-system";
import {
  BackDropCover,
  Container,
  Divider,
  Footer,
  Header,
  List,
  ListItem,
  TitleContainer,
  ContentContainer,
  GlobalStyle,
} from "./styles";
import AvatarDropdown from "../Navigation/AvatarDropdown";
import { RouterOutput } from "../../../libs/trpc";

const AnimatedBackDropCover = animated(BackDropCover);
const AnimatedNavigation = animated(Container);

interface NavigationDrawerProps {
  isDrawerOpen: boolean;
  onClose: () => void;
  data?: RouterOutput["project"]["all"];
}

const NavigationDrawer = ({
  isDrawerOpen,
  onClose,
  data,
}: NavigationDrawerProps) => {
  const theme = useTheme();
  const { data: session } = useSession();
  const router = useRouter();

  const setCreateProjectModalOpen = useStore(
    (state) => state.setCreateProjectModalOpen,
  );

  const setCreateFlagModalOpen = useStore(
    (state) => state.setCreateFlagModalOpen,
  );

  const onSelectProject = useCallback(
    (projectSlug: string) => {
      router.push({
        pathname: "/[projectSlug]/flags",
        query: { projectSlug },
      });
    },
    [router],
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
                <Avatar round={false} alt="user image" userName="Logo" />
                <IconButton
                  icon="chevron_left"
                  onClick={onClose}
                  variant="neutral"
                />
              </Header>
              <ContentContainer>
                <List>
                  <ListItem>
                    <Button
                      iconPlacement="left"
                      icon="flag"
                      variant={ButtonVariant.Neutral}
                      fullWidth
                    >
                      Features
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Button
                      iconPlacement="left"
                      icon="settings"
                      variant={ButtonVariant.Neutral}
                      fullWidth
                    >
                      Settings
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Button
                      iconPlacement="left"
                      icon="add"
                      variant={ButtonVariant.Neutral}
                      fullWidth
                      onClick={() => setCreateFlagModalOpen({ isOpen: true })}
                    >
                      Create Flag
                    </Button>
                  </ListItem>
                </List>
                <Divider m={theme.spacing.s5} />
                <TitleContainer>
                  <Text muted fontWeight={500}>
                    Projects
                  </Text>
                </TitleContainer>
                <List enableScroll>
                  {data?.projects.map((item) => (
                    <ListItem key={item.id}>
                      <Button
                        iconPlacement="left"
                        icon="tag"
                        variant={ButtonVariant.Neutral}
                        onClick={() => onSelectProject(item.slug)}
                        fullWidth
                      >
                        {item.name}
                      </Button>
                    </ListItem>
                  ))}
                  <ListItem>
                    <Button
                      iconPlacement="left"
                      icon="add"
                      variant={ButtonVariant.Neutral}
                      fullWidth
                      onClick={() =>
                        setCreateProjectModalOpen({ isOpen: true })
                      }
                    >
                      Create Project
                    </Button>
                  </ListItem>
                </List>
              </ContentContainer>
              <Divider mx={theme.spacing.s5} my={0} />
              <Footer>
                <AvatarDropdown
                  name={session?.user.name || "User Name"}
                  email={session?.user.email || ""}
                  src={session?.user.image || ""}
                  showFullButton
                  popupPlacement="top"
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
