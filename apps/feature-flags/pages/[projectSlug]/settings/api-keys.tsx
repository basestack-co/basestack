import React from "react";
// SEO
import Head from "next/head";
// Layout
import SettingsLayout from "layouts/Settings";
// Libs
import { inferQueryOutput } from "libs/trpc";
// Modules
import ApiKeysModule from "modules/Settings/ApiKeys";

interface Props {
  project: inferQueryOutput<"project.bySlug">["project"];
}

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
