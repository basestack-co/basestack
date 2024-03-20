import React from "react";
import Head from "next/head";
// Layout
import MainLayout from "../layouts/Main";
import MainPageTemplate from "../components/MainPage";

const MainPage = () => {
  const data = [
    { title: "Restaurant", spam: 2, submissions: { unread: 10, read: 2 } },
    { title: "Games", spam: 120, submissions: { unread: 120, read: 120 } },
    { title: "Fun and Games", spam: 0, submissions: { unread: 200, read: 0 } },
    { title: "Food and Drinks", spam: 3, submissions: { unread: 0, read: 200 } },
    { title: "Games", spam: 0, submissions: { unread: 0, read: 0 } },
    { title: "News and TV", spam: 0, submissions: { unread: 10, read: 2 } },
    { title: "Sports Division", spam: 0, submissions: { unread: 10, read: 2 } },
    { title: "Forms", spam: 0, submissions: { unread: 10, read: 2 } },
    { title: "Time Magazine", spam: 1, submissions: { unread: 10, read: 2 } },
  ];

  return (
    <MainPageTemplate data={data} onCreateForm={() => null} isLoading={false} />
  );
};

MainPage.Layout = MainLayout;

export default MainPage;
