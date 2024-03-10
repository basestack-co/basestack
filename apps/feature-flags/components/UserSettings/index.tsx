import React from "react";
import { useTheme } from "styled-components";
// Auth
import { useSession } from "next-auth/react";
// Locales
import useTranslation from "next-translate/useTranslation";
// UI
import { ProfileAvatarCard } from "@basestack/ui";
// Components
import { Text } from "@basestack/design-system";
import ModalCard from "./ModalCard";
import ThemeCard from "./ThemeCard";
import FlagsCard from "./FlagsCard";
import { Container, List, ListItem } from "./styles";

const UserSettings = () => {
  const { t } = useTranslation("profile");
  const theme = useTheme();
  const { data: session } = useSession();

  return (
    <Container>
      <Text size="xLarge" mb={theme.spacing.s5}>
        {t("settings.title")}
      </Text>
      <List>
        <ListItem>
          <ProfileAvatarCard
            name={session?.user.name ?? t("settings.card.avatar.title")}
            image={session?.user.image ?? ""}
            email={session?.user.email ?? ""}
            description={t("settings.card.avatar.description")}
          />
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
