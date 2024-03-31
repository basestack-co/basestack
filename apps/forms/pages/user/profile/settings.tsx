import React from "react";
// Layout
import MainLayout from "layouts/Main";
// Auth
import { useSession } from "next-auth/react";
// Store
import { useStore } from "store";
// Locales
import useTranslation from "next-translate/useTranslation";
// UI
import { ProfileAvatarCard, SwitchSettingCard } from "@basestack/ui";
// Components
import { Text } from "@basestack/design-system";
// Styles
import { useTheme } from "styled-components";
import { Container, List, ListItem } from "components/ProfileSettings/styles";

const UserProfileSettingsPage = () => {
  const { t } = useTranslation("profile");
  const theme = useTheme();
  const { data: session } = useSession();

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
            name={session?.user.name ?? t("settings.card.avatar.title")}
            image={session?.user.image ?? ""}
            email={session?.user.email ?? ""}
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

UserProfileSettingsPage.Layout = MainLayout;

export default UserProfileSettingsPage;
