import React from "react";
// SEO
import Head from "next/head";
// Layout
import SettingsLayout from "layouts/Settings";
// Libs
import { inferQueryOutput } from "libs/trpc";
// Modules
import MembersModule from "modules/Settings/Members";

interface Props {
  project: inferQueryOutput<"project.bySlug">["project"];
}

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
