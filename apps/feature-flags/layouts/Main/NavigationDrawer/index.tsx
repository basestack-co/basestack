import React, { useCallback } from "react";
import { useTheme } from "styled-components";
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
  Header,
  List,
  ListItem,
  TitleContainer,
} from "./styles";
import { RouterOutput } from "../../../libs/trpc";

interface NavigationDrawerProps {
  isDrawerOpen: boolean;
  onClickMenuButton: () => void;
  data?: RouterOutput["project"]["all"];
}

const NavigationDrawer = ({
  isDrawerOpen,
  onClickMenuButton,
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

  const projectSlug = router.query.projectSlug as string;

  const onSelectProject = useCallback(
    (projectSlug: string) => {
      router.push({
        pathname: "/[projectSlug]/flags",
        query: { projectSlug },
      });
    },
    [router],
  );

  if (!isDrawerOpen) {
    return null;
  }

  return (
    <>
      <Container>
        <IconButton
          icon="menu"
          onClick={onClickMenuButton}
          position="absolute"
          right={-16}
          top={20}
          variant="primary"
        />
        <Header>
          <Avatar round={false} alt="user image" userName="Logo" />
        </Header>
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
        <Divider />
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
              onClick={() => setCreateProjectModalOpen({ isOpen: true })}
            >
              Create Project
            </Button>
          </ListItem>
        </List>
      </Container>
      <BackDropCover />
    </>
  );
};

export default NavigationDrawer;
