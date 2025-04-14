"use client";

import React from "react";
// Components
import GetStarted from "./_components/GetStarted";
import RecentProjects from "./_components/RecentProjects";
import Teams from "./_components/Teams";
// Styles
import { Container } from "./_components/styles";

const MainPage = () => {
  return (
    <Container>
      <RecentProjects />
      <Teams />
      <GetStarted />
    </Container>
  );
};

export default MainPage;
