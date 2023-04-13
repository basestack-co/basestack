import React from "react";
// SEO
import Head from "next/head";
// Layout
import SettingsLayout from "layouts/Settings";
// Libs
import { RouterOutput } from "libs/trpc";
// Modules
import GeneralModule from "modules/Settings/General";
// Types
import { ProjectSettings } from "types";

type Props = ProjectSettings;

const GeneralPage = ({ project }: Props) => {
  console.log("project =? ", project?.role);
  return (
    <>
      <Head>
        <title>Settings for {project?.name}</title>
      </Head>
      <GeneralModule project={project} />
    </>
  );
};

GeneralPage.Layout = SettingsLayout;

export default GeneralPage;
