import React from "react";
// Layout
import SettingsLayout from "layouts/Settings";
// Components
import {
  CardList,
  CardListItem,
  SettingCardContainer,
} from "components/FormSettings/styles";
import FormName from "components/FormSettings/FormName";
// Types
import { Role } from "@prisma/client";

const GeneralSettingsPage = () => {
  return (
    <CardList>
      <CardListItem>
        <SettingCardContainer>
          <FormName />
        </SettingCardContainer>
      </CardListItem>
    </CardList>
  );
};

GeneralSettingsPage.Layout = SettingsLayout;

export default GeneralSettingsPage;
