"use client";

import React from "react";
// Auth
import { useSession } from "next-auth/react";
// Locales
import { useTranslations } from "next-intl";
// Components
import { ProfileAvatarCard, SwitchSettingCard } from "@basestack/ui";
import ThemeCard from "./_components/ThemeCard";
import FlagsCard from "./_components/FlagsCard";
// Styles
import { CardList, ProfileCardContainer, CardListItem } from "../styles";

// Store
import { useStore } from "store";

const UserProfileSettingsPage = () => {
  const t = useTranslations("profile");
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

export default UserProfileSettingsPage;
