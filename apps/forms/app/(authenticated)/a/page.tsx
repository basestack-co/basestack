"use client";

import React, { Fragment } from "react";
// Components
import AccountUsage from "./_components/AccountUsage";
import RecentForms from "./_components/RecentForms";
import QuickLinks from "./_components/QuickLinks";
import Teams from "./_components/Teams";
// Styles
import { Container } from "./styles";

const MainPage = () => {
  return (
    <Fragment>
      <Container>
        <AccountUsage />
        <RecentForms />
        <Teams />
        <QuickLinks />
      </Container>
    </Fragment>
  );
};

export default MainPage;
