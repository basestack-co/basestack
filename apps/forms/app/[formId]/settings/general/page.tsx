"use client";

import React from "react";
// Components
import {
  CardList,
  CardListItem,
  SettingCardContainer,
} from "components/FormSettings/styles";
import FormName from "components/FormSettings/FormName";

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

export default GeneralSettingsPage;
