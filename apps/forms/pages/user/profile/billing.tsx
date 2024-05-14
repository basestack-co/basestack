import React from "react";
// Layout
import ProfileLayout from "layouts/Profile";
// Components
import Plans from "components/Plans";
// Styles
import {
  CardListItem,
  CardList,
  ProfileCardContainer,
} from "components/ProfileSettings/styles";

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

UserProfileBillingPage.Layout = ProfileLayout;

export default UserProfileBillingPage;
