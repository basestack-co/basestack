import React from "react";
// SEO
import Head from "next/head";
// Layout
import SettingsLayout from "layouts/Settings";
// Modules
import { CardList, CardListItem } from "modules/Settings/styles";
import Endpoints from "modules/Settings/Cards/Endpoints";
import Keys from "modules/Settings/Cards/Keys";
// Types
import { ProjectSettings } from "types";
import { Loader, Skeleton } from "@basestack/design-system";

type Props = ProjectSettings;
const ApiKeysPage = ({ project }: Props) => {
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
        <title>API Keys for {project?.name}</title>
      </Head>
      <CardList>
        <CardListItem>
          <Endpoints project={project} />
        </CardListItem>
        <CardListItem>
          <Keys project={project} />
        </CardListItem>
      </CardList>
    </>
  );
};

ApiKeysPage.Layout = SettingsLayout;

export default ApiKeysPage;
