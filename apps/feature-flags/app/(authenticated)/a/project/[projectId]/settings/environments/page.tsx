"use client";

import React from "react";
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

export default EnvironmentsPage;
