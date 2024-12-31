"use client";

import React from "react";
// Components
import Environments from "./Environments";
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
