import React from "react";
// SEO
import Head from "next/head";
// Layout
import SettingsLayout from "layouts/Settings";
// Modules
import EnvironmentsModule from "modules/Settings/Environments";
// Types
import { ProjectSettings } from "types";

type Props = ProjectSettings;
const EnvironmentsPage = ({ project }: Props) => {
  return (
    <>
      <Head>
        <title>Environments for {project?.name}</title>
      </Head>
      <EnvironmentsModule project={project} />
    </>
  );
};

EnvironmentsPage.Layout = SettingsLayout;

export default EnvironmentsPage;
