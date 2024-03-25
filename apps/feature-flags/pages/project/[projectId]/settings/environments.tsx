import React from "react";
// Layout
import SettingsLayout from "layouts/Settings";
// Components
import {
  CardList,
  CardListItem,
  SettingCardContainer,
} from "components/ProjectSettings/styles";
import Environments from "components/ProjectSettings/Environments";

const EnvironmentsPage = () => {
  return (
    <CardList>
      <CardListItem>
        <SettingCardContainer>
          <Environments />
        </SettingCardContainer>
      </CardListItem>
    </CardList>
  );
};

EnvironmentsPage.Layout = SettingsLayout;

export default EnvironmentsPage;
