import React, { useMemo } from "react";
// Components
import { ButtonVariant, SettingCard, Table } from "@basestack/design-system";
// Server
import { trpc, inferQueryOutput } from "libs/trpc";
// Context
import useModals from "hooks/useModals";
import { setIsCreateEnvironmentModalOpen } from "contexts/modals/actions";
// Styles
import { CardList, CardListItem } from "../styles";
// Types
import { Row } from "@basestack/design-system/organisms/Table/types";
import { Environment } from "@prisma/client";

export const headers = ["Environment", "Slug", "Description"];

export interface Props {
  project: inferQueryOutput<"project.bySlug">["project"];
}

const EnvironmentsModule = ({ project }: Props) => {
  const { dispatch } = useModals();

  const { data, isLoading } = trpc.useQuery(
    ["environment.all", { projectSlug: project?.slug! }],
    { enabled: !!project?.slug }
  );

  const onHandleEdit = (id: string) => {
    console.log("edita", id);
  };

  const onHandleDelete = (id: string) => {
    console.log("edita", id);
  };

  const getTable = useMemo(() => {
    if (!isLoading && !!data) {
      const rows = data.environments.reduce(
        (acc: Row[], { name, slug, description, id }: Environment) => {
          return [
            ...acc,
            {
              cols: [
                {
                  title: name,
                },
                {
                  title: slug,
                },
                {
                  title: description,
                },
              ],
              more: [
                { icon: "edit", text: "Edit", onClick: () => onHandleEdit(id) },
                {
                  icon: "delete",
                  text: "Delete",
                  variant: ButtonVariant.Danger,
                  onClick: () => onHandleDelete(id),
                },
              ],
            },
          ] as Row[];
        },
        [] as Row[]
      );

      return { headers, rows };
    }

    return { headers, rows: [] };
  }, [isLoading, data]);

  if (isLoading || !data) {
    return <div>isLoading...</div>;
  }

  return (
    <CardList>
      <CardListItem>
        <SettingCard
          title="Environments"
          description="Create and edit environments for feature flags and their rules."
          button="Create New Environment"
          onClick={() => dispatch(setIsCreateEnvironmentModalOpen(true))}
        >
          <Table data={getTable} />
        </SettingCard>
      </CardListItem>
    </CardList>
  );
};

export default EnvironmentsModule;
