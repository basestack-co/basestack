import React, { useState, memo, useCallback } from "react";
// Components
import { SpaceProps } from "styled-system";
import { useTheme } from "styled-components";
import { Segment, Input, Pill } from "@basestack/design-system";
import { Container, PillsUl, PillLi } from "./styles";
import EnvironmentsMenu from "./EnvironmentsMenu";
// Hooks
import { useDebounce } from "@basestack/hooks";
// Types
import { SelectedView } from "types/flags";

export interface ToolbarProps extends SpaceProps {
  projectId: string;
  onSearchCallback: (value: string) => void;
  onSelect: (environmentId: string) => void;
  onChangeView: (selected: string) => void;
  isDesktop?: boolean;
  selectedView: SelectedView;
}

const mock = [
  {
    id: "clgdztobh000968rk171q8gzj",
    name: "develop",
    description: "The default develop environment",
    slug: "belligerent-clever-disease",
    key: "clgdztobh000a68rk2z6khtk2",
    isDefault: true,
    createdAt: "2023-04-12T17:56:34.779Z",
    updatedAt: "2023-04-12T17:56:34.779Z",
    projectId: "clgdztobh000768rk6rqpn63x",
  },
  {
    id: "clgdztobh000b68rkvffsdlff",
    name: "staging",
    description: "The default staging environment",
    slug: "rough-flaky-kangaroo",
    key: "clgdztobh000c68rka5ugomm9",
    isDefault: false,
    createdAt: "2023-04-12T17:56:34.779Z",
    updatedAt: "2023-04-12T17:56:34.779Z",
    projectId: "clgdztobh000768rk6rqpn63x",
  },
  {
    id: "clgdztobh000d68rk2zsmix4u",
    name: "production",
    description: "The default production environment",
    slug: "fit-immense-honey",
    key: "clgdztobh000e68rkjtk7cipe",
    isDefault: false,
    createdAt: "2023-04-12T17:56:34.779Z",
    updatedAt: "2023-04-12T17:56:34.779Z",
    projectId: "clgdztobh000768rk6rqpn63x",
  },
];

const Toolbar = ({
  projectId,
  isDesktop = true,
  onSelect,
  onChangeView,
  onSearchCallback,
  selectedView,
}: ToolbarProps) => {
  const theme = useTheme();
  const [selected, setSelected] = useState("all");
  const [searchValue, setSearchValue] = useState<string>("");

  useDebounce(() => onSearchCallback(searchValue), 500, [searchValue]);

  const onRenderDesktopPills = useCallback(() => {
    return (
      <PillsUl data-testid="pills">
        {mock.map(({ name, id }) => {
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
  }, [selected, onSelect]);

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
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setSearchValue(event.target.value)
        }
        name="search"
        value={searchValue}
      />
      {isDesktop && onRenderDesktopPills()}
      {!isDesktop && (
        <EnvironmentsMenu
          title={selected}
          // @ts-ignore
          data={{ environments: mock }}
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
          selectedIndex={selectedView === "table" ? 1 : 0}
        />
      )}
    </Container>
  );
};

export default memo(Toolbar);
