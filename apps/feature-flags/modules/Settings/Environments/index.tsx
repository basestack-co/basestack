import React from "react";
// Components
import { SettingCard, Table } from "@basestack/design-system";
// Libs
import { inferQueryOutput } from "libs/trpc";
// Context
import useModals from "hooks/useModals";
import { setIsCreateEnvironmentModalOpen } from "contexts/modals/actions";
// Styles
import { CardList, CardListItem } from "../styles";
// Mocks
import { environmentsTableMock } from "mocks/settings";

interface Props {
  project: inferQueryOutput<"project.bySlug">["project"];
}

const EnvironmentsModule = ({ project }: Props) => {
  const { dispatch } = useModals();
  return (
    <CardList>
      <CardListItem>
        <SettingCard
          title="Environments"
          description="Create and edit environments for feature flags and their rules."
          button="Create New Environment"
          onClick={() => dispatch(setIsCreateEnvironmentModalOpen(true))}
        >
          <Table data={environmentsTableMock} />
        </SettingCard>
      </CardListItem>
    </CardList>
  );
};

export default EnvironmentsModule;
