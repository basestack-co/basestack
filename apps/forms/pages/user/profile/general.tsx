import React from "react";
// Auth
import { useSession } from "next-auth/react";
// Store
import { useStore } from "store";
// Locales
import useTranslation from "next-translate/useTranslation";
// Layout
import ProfileLayout from "layouts/Profile";
// UI
import { ProfileAvatarCard, SwitchSettingCard } from "@basestack/ui";
// Styles
import {
  CardList,
  ProfileCardContainer,
  CardListItem,
} from "components/ProfileSettings/styles";

const UserProfileSettingsPage = () => {
  const { t } = useTranslation("profile");
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
    </CardList>
  );
};

UserProfileSettingsPage.Layout = ProfileLayout;

export default UserProfileSettingsPage;
