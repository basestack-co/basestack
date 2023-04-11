import React, { useMemo, useCallback } from "react";
// Components
import { ButtonVariant, SettingCard, Table } from "@basestack/design-system";
// Libs
import { RouterOutput } from "libs/trpc";
// Styles
import { CardList, CardListItem } from "../styles";
// Types
import { Row } from "@basestack/design-system/organisms/Table/types";

interface Props {
  project: RouterOutput["project"]["bySlug"]["project"];
}

export const headers = ["Name", "Project Key", "Environment Key", "Created At"];

const Keys = ({ project }: Props) => {
  const getTable = useMemo(() => {
    // if (!isLoading && !!data) {
    /* const rows = data.users.map(({ userId, user, role }) => {
        const row: Row = {
          cols: [
            {
              image: {
                userName: user.name!,
                src: user.image!,
              },
              title: user.name!,
            },
            { title: user.email! },
            { title: role === "ADMIN" ? "Admin" : "User" },
          ],
        };
        return row;
      }); */

    // return { headers, rows };
    // }

    return { headers, rows: [] };
  }, []);

  return (
    <CardListItem>
      <SettingCard
        title="API Keys"
        description="API keys can be used with our SDK’s (Javascript, React)."
        button="Create New API Key"
        onClick={() => console.log("save")}
      >
        <Table data={getTable} />
      </SettingCard>
    </CardListItem>
  );
};

export default Keys;
