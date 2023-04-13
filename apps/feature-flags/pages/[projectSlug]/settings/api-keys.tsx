import React from "react";
// SEO
import Head from "next/head";
// Layout
import SettingsLayout from "layouts/Settings";
// Modules
import ApiKeysModule from "modules/Settings/ApiKeys";
// Types
import { ProjectSettings } from "types";

type Props = ProjectSettings;
const ApiKeysPage = ({ project }: Props) => {
  return (
    <>
      <Head>
        <title>API Keys for {project?.name}</title>
      </Head>
      <ApiKeysModule project={project} />
    </>
  );
};

ApiKeysPage.Layout = SettingsLayout;

export default ApiKeysPage;
