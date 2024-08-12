import React from "react";
// Layout
import ProfileLayout from "layouts/Profile";
// Auth
import { useSession } from "next-auth/react";
// Locales
import useTranslation from "next-translate/useTranslation";
// Components
import { ProfileAvatarCard, SwitchSettingCard } from "@basestack/ui";
import ThemeCard from "components/UserSettings/ThemeCard";
import FlagsCard from "components/UserSettings/FlagsCard";
// Styles
import {
  CardList,
  ProfileCardContainer,
  CardListItem,
} from "components/ProfileSettings/styles";
import { useTheme } from "styled-components";

// Store
import { useStore } from "store";

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
    <CardList>
      <CardListItem>
        <ProfileCardContainer>
          <ProfileAvatarCard
            name={session?.user.name ?? t("general.card.avatar.title")}
            image={session?.user.image ?? ""}
            email={session?.user.email ?? ""}
          />
        </ProfileCardContainer>
      </CardListItem>
      <CardListItem>
        <ProfileCardContainer>
          <SwitchSettingCard
            title={t("general.card.modals.title")}
            description={t("general.card.modals.description")}
            checked={closeModalsOnClickOutside}
            onChange={(event) => {
              setCloseModalsOnClickOutside(event.target.checked);
            }}
          />
        </ProfileCardContainer>
      </CardListItem>
      <CardListItem>
        <ProfileCardContainer>
          <ThemeCard />
        </ProfileCardContainer>
      </CardListItem>
      <CardListItem>
        <ProfileCardContainer>
          <FlagsCard />
        </ProfileCardContainer>
      </CardListItem>
    </CardList>
  );
};

UserProfileSettingsPage.Layout = ProfileLayout;

export default UserProfileSettingsPage;
