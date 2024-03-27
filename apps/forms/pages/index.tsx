import React, { Fragment } from "react";
import Head from "next/head";
// Server
import { trpc } from "libs/trpc";
// Store
import { useStore } from "store";
// Layout
import MainLayout from "../layouts/Main";
import MainPageTemplate from "../components/MainPage";

const MainPage = () => {
  const setCreateFormModalOpen = useStore(
    (state) => state.setCreateFormModalOpen,
  );

  const { data, isLoading } = trpc.form.recent.useQuery(undefined, {
    select: (res) => {
      return res.map(({ id, name, _count }) => ({
        formId: id,
        title: name,
        spam: _count.isSpam,
        submissions: {
          unread: _count._all - _count.viewed,
          read: _count.viewed,
        },
      }));
    },
  });

  return (
    <Fragment>
      <Head>
        <title>Basestack / Forms</title>
      </Head>
      <MainPageTemplate
        data={data ?? []}
        onCreateForm={() => setCreateFormModalOpen({ isOpen: true })}
        isLoading={isLoading}
      />
    </Fragment>
  );
};

MainPage.Layout = MainLayout;

export default MainPage;
