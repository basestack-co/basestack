import React from "react";
import { useTheme } from "styled-components";
// Components
import { Text } from "@basestack/design-system";
import ModalCard from "./ModalCard";
import AvatarCard from "./AvatarCard";
import ThemeCard from "./ThemeCard";
import FlagsCard from "./FlagsCard";
import { Container, List, ListItem } from "./styles";

const UserSettings = () => {
  const theme = useTheme();

  return (
    <Container>
      <Text size="xLarge" mb={theme.spacing.s5}>
        Profile settings
      </Text>
      <List>
        <ListItem>
          <AvatarCard />
        </ListItem>
        <ListItem>
          <ModalCard />
        </ListItem>
        <ListItem>
          <ThemeCard />
        </ListItem>
        <ListItem>
          <FlagsCard />
        </ListItem>
      </List>
    </Container>
  );
};

export default UserSettings;
