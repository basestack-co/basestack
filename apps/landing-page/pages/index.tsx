import React from "react";
// Components
import { WaitingList } from "../components";
// Content
import { waitingList } from "../content/landing-page";

const MainPage = () => <WaitingList data={waitingList} />;

export default MainPage;
