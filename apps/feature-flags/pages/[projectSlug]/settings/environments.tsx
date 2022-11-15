import React from "react";
// SEO
import Head from "next/head";
// Layout
import SettingsLayout from "layouts/Settings";
// Libs
import { inferQueryOutput } from "libs/trpc";
// Modules
import EnvironmentsModule from "modules/Settings/Environments";

interface Props {
  project: inferQueryOutput<"project.bySlug">["project"];
}

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
