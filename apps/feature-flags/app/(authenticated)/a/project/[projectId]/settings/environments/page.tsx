"use client";

import React from "react";
// Components
import Environments from "./_components/Environments";
// Styles
import { CardList, CardListItem, SettingCardContainer } from "../styles";

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
