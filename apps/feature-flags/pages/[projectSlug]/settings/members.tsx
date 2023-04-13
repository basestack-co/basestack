import React from "react";
// Design System
import { Loader, Skeleton } from "@basestack/design-system";
// SEO
import Head from "next/head";
// Layout
import SettingsLayout from "layouts/Settings";
// Modules
import { CardList, CardListItem } from "modules/Settings/styles";
import Invite from "modules/Settings/Cards/Invite";
// Types
import { ProjectSettings } from "types";

type Props = ProjectSettings;

const MembersPage = ({ project }: Props) => {

  if (!project) {
    return (
      <Loader>
        <Skeleton
          items={[
            { h: 24, w: "15%", mb: 10 },
            { h: 18, w: "40%", mb: 20 },
            { h: 100, w: "100%", mb: 20 },
            { h: 1, w: "100%", mb: 16 },
            { h: 36, w: 120, mb: 0, ml: "auto" },
          ]}
          padding={20}
        />
      </Loader>
    );
  }

  return (
    <>
      <Head>
        <title>Members for {project?.name}</title>
      </Head>
      <CardList>
        <CardListItem>
          <Invite project={project} />
        </CardListItem>
      </CardList>
    </>
  );
};

MembersPage.Layout = SettingsLayout;

export default MembersPage;
