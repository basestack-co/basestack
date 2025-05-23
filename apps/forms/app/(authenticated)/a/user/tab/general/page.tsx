"use client";

import React from "react";
// Libs
import { authClient } from "libs/auth/client";
// Store
import { useStore } from "store";
// Locales
import { useTranslations } from "next-intl";
// UI
import { ProfileAvatarCard, SwitchSettingCard } from "@basestack/ui";
// Styles
import { CardList, ProfileCardContainer, CardListItem } from "../styles";

const UserProfileSettingsPage = () => {
  const t = useTranslations("profile");
  const { data: session } = authClient.useSession();

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

export default UserProfileSettingsPage;
