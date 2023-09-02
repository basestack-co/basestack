import React from "react";
import { useTheme } from "styled-components";
// Locales
import useTranslation from "next-translate/useTranslation";
// Components
import { Text } from "@basestack/design-system";
import ModalCard from "./ModalCard";
import AvatarCard from "./AvatarCard";
import ThemeCard from "./ThemeCard";
import FlagsCard from "./FlagsCard";
import { Container, List, ListItem } from "./styles";

const UserSettings = () => {
  const { t } = useTranslation("profile");
  const theme = useTheme();

  return (
    <Container>
      <Text size="xLarge" mb={theme.spacing.s5}>
        {t("settings.title")}
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
