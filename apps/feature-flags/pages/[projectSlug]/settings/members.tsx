import React from "react";
// SEO
import Head from "next/head";
// Layout
import SettingsLayout from "layouts/Settings";
// Modules
import MembersModule from "modules/Settings/Members";
// Types
import { ProjectSettings } from "types";

type Props = ProjectSettings;

const MembersPage = ({ project }: Props) => {
  return (
    <>
      <Head>
        <title>Members for {project?.name}</title>
      </Head>
      <MembersModule project={project} />
    </>
  );
};

MembersPage.Layout = SettingsLayout;

export default MembersPage;
