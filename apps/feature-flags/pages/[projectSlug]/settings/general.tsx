import React from "react";
// SEO
import Head from "next/head";
// Layout
import SettingsLayout from "layouts/Settings";
// Libs
import { RouterOutput } from "libs/trpc";
// Modules
import GeneralModule from "modules/Settings/General";

interface Props {
  project: RouterOutput["project"]["bySlug"]["project"];
}

const GeneralPage = ({ project }: Props) => {
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
