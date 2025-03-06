"use client";

import React from "react";
// Components
import Plans from "./_components/Plans";
// Styles
import { CardListItem, CardList, ProfileCardContainer } from "../styles";

const UserProfileBillingPage = () => {
  return (
    <CardList>
      <CardListItem>
        <ProfileCardContainer>
          <Plans />
        </ProfileCardContainer>
      </CardListItem>
    </CardList>
  );
};

export default UserProfileBillingPage;
