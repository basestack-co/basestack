import React from "react";
// SEO
import Head from "next/head";
// Design System
import { Loader, Skeleton } from "@basestack/design-system";
// Layout
import SettingsLayout from "layouts/Settings";
// Modules
import { CardList, CardListItem } from "modules/Settings/styles";
import ProjectName from "modules/Settings/Cards/ProjectName";
import DeleteProject from "modules/Settings/Cards/DeleteProject";
// Types
import { ProjectSettings } from "types";

type Props = ProjectSettings;

const GeneralPage = ({ project }: Props) => {
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
        <title>Settings for {project?.name}</title>
      </Head>
      <CardList>
        <CardListItem>
          <ProjectName project={project} />
        </CardListItem>

        {project?.role === "ADMIN" && (
          <CardListItem>
            <DeleteProject project={project} />
          </CardListItem>
        )}
      </CardList>
    </>
  );
};

GeneralPage.Layout = SettingsLayout;

export default GeneralPage;
