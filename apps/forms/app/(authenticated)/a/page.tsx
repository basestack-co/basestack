"use client";

import React, { Fragment } from "react";
// Components
import AccountUsage from "./_components/AccountUsage";
import RecentForms from "./_components/RecentForms";
import QuickLinks from "./_components/QuickLinks";
// Styles
import { Container } from "./styles";

const MainPage = () => {
  return (
    <Fragment>
      <Container>
        <AccountUsage />
        <RecentForms />
        <QuickLinks />
      </Container>
    </Fragment>
  );
};

export default MainPage;
