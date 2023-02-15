import React from "react";
// Layout
import MainLayout from "../layouts/Main";
// Components
import { WaitingList } from "../components";

const MainPage = () => <WaitingList />;

MainPage.Layout = MainLayout;

export default MainPage;
