import React, { useState, memo, useCallback } from "react";
// Components
import { SpaceProps } from "styled-system";
import { useTheme } from "styled-components";
import { Segment, Input, Pill } from "@basestack/design-system";
import { Container, PillsUl, PillLi } from "./styles";
import EnvironmentsMenu from "./EnvironmentsMenu";
// Server
import { trpc } from "libs/trpc";

export interface ToolbarProps extends SpaceProps {
  projectId: string;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect: (environmentId: string) => void;
  onChangeView: (selected: string) => void;
  isDesktop?: boolean;
  searchValue: string;
}

const Toolbar = ({
  projectId,
  isDesktop = true,
  onSearch,
  onSelect,
  onChangeView,
  searchValue,
}: ToolbarProps) => {
  const theme = useTheme();
  const [selected, setSelected] = useState("all");

  const { data, isLoading } = trpc.environment.all.useQuery({ projectId });

  const onRenderDesktopPills = useCallback(() => {
    if (isLoading) {
      return <div>...loading envs</div>;
    }

    if (!data || !data.environments) {
      return <div>no Envs</div>;
    }

    return (
      <PillsUl data-testid="pills">
        {data.environments.map(({ name, id }) => {
          return (
            <PillLi key={id}>
              <Pill
                text={name}
                isSelected={selected === name.toLowerCase()}
                onClick={() => {
                  onSelect(id);
                  setSelected(name.toLowerCase());
                }}
              />
            </PillLi>
          );
        })}
      </PillsUl>
    );
  }, [data, isLoading, selected, onSelect]);

  return (
    <Container data-testid="toolbar" my={theme.spacing.s5}>
      <Input
        testId="search-input"
        size="small"
        maxWidth="220px"
        isDarker
        icon="search"
        iconPlacement="left"
        placeholder="Filter by title"
        onChange={onSearch}
        name="search"
        value={searchValue}
      />
      {isDesktop && onRenderDesktopPills()}
      {!isDesktop && !isLoading && (
        <EnvironmentsMenu
          title={selected}
          data={data}
          onSelect={(environment) => setSelected(environment.toLowerCase())}
        />
      )}
      {isDesktop && (
        <Segment
          onSelect={onChangeView}
          items={[
            { icon: "view_module", id: "cards" },
            { icon: "view_stream", id: "table" },
          ]}
        />
      )}
    </Container>
  );
};

export default memo(Toolbar);
