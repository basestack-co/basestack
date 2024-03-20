import React from "react";
import { useTheme } from "styled-components";
// Store
import { useStore } from "store";
// Locales
import useTranslation from "next-translate/useTranslation";
// UI
import { ProfileAvatarCard, SwitchSettingCard } from "@basestack/ui";
// Auth
import { useUser } from "@clerk/nextjs";
// Components
import { Text } from "@basestack/design-system";
import { Container, List, ListItem } from "./styles";

const UserSettings = () => {
  const { user } = useUser();
  const { t } = useTranslation("profile");
  const theme = useTheme();

  const closeModalsOnClickOutside = useStore(
    (state) => state.closeModalsOnClickOutside,
  );
  const setCloseModalsOnClickOutside = useStore(
    (state) => state.setCloseModalsOnClickOutside,
  );

  return (
    <Container>
      <Text size="xLarge" mb={theme.spacing.s5}>
        {t("settings.title")}
      </Text>
      <List>
        <ListItem>
          <ProfileAvatarCard
            name={user?.firstName ?? t("settings.card.avatar.title")}
            email={user?.primaryEmailAddress?.emailAddress ?? ""}
            image={user?.imageUrl ?? ""}
            description={t("settings.card.avatar.description")}
          />
        </ListItem>
        <ListItem>
          <SwitchSettingCard
            title={t("settings.card.modals.title")}
            description={t("settings.card.modals.description")}
            checked={closeModalsOnClickOutside}
            onChange={(event) => {
              setCloseModalsOnClickOutside(event.target.checked);
            }}
          />
        </ListItem>
      </List>
    </Container>
  );
};

export default UserSettings;
