"use client";

// Components
import { ProfileAvatarCard, SwitchSettingCard } from "@basestack/ui";
// Vendors
import { auth } from "@basestack/vendors";
// Locales
import { useTranslations } from "next-intl";
import React from "react";
// Store
import { useStore } from "store";
// Styles
import { CardList, CardListItem, ProfileCardContainer } from "../styles";
import FlagsCard from "./_components/FlagsCard";
import ThemeCard from "./_components/ThemeCard";

const UserProfileSettingsPage = () => {
  const t = useTranslations("profile");
  const { data: session } = auth.client.useSession();

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
