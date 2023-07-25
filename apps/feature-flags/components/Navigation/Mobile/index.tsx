import React, { useCallback } from "react";
import { useTheme } from "styled-components";
import { animated, config, useTransition } from "react-spring";
import { RouterOutput } from "libs/trpc";
import { useStore } from "store";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { internalLinks, externalLinks } from "../data";
// Components
import {
  fadeIn,
  slideInLeft,
  IconButton,
  Text,
  Button,
  ButtonVariant,
  Avatar,
  HorizontalRule,
} from "@basestack/design-system";
import AvatarDropdown from "../../AvatarDropdown";
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

  const projectSlug = router.query.projectSlug as string;

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
                            query: { projectSlug },
                          });
                        }}
                      >
                        {item.text}
                      </Button>
                    </ListItem>
                  ))}
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
                <HorizontalRule m={theme.spacing.s5} mb={0} />
                <ScrollableContent>
                  <TitleContainer>
                    <Text muted fontWeight={500}>
                      Projects
                    </Text>
                  </TitleContainer>
                  <List>
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
                  <HorizontalRule m={theme.spacing.s5} />
                  <TitleContainer>
                    <Text muted fontWeight={500}>
                      Documentation
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
                            {item.text}
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
