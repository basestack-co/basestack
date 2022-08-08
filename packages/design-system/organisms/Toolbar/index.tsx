import React, { useState, memo } from "react";
import { SpaceProps } from "styled-system";
import { useTheme } from "styled-components";
import { useMediaQuery } from "@basestack/hooks";
import { Input, Pill } from "../../atoms";
import { Segment } from "../../molecules";
import { Container, PillsUl, PillLi } from "./styles";
import EnvironmentsMenu from "./components/EnvironmentsMenu";

export interface ToolbarProps extends SpaceProps {
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect: (environment: string) => void;
  environments: Array<string>;
  onChangeView: (selected: string) => void;
}

const Toolbar = ({
  environments,
  onSearch,
  onSelect,
  onChangeView,
  ...props
}: ToolbarProps) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.device.min.lg);
  const [selectedEnv, setSelectedEnv] = useState("all");

  return (
    <Container data-testid="toolbar" {...props}>
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
        value=""
      />
      {isDesktop && (
        <PillsUl data-testid="pills">
          <PillLi>
            <Pill
              text="All"
              isSelected={selectedEnv === "all"}
              onClick={() => {
                onSelect("all");
                setSelectedEnv("all");
              }}
            />
          </PillLi>
          {environments &&
            environments.map((environment, index) => {
              return (
                !!environment && (
                  <PillLi key={index.toString()}>
                    <Pill
                      text={environment}
                      isSelected={selectedEnv === environment.toLowerCase()}
                      onClick={() => {
                        onSelect(environment.toLowerCase());
                        setSelectedEnv(environment.toLowerCase());
                      }}
                    />
                  </PillLi>
                )
              );
            })}
        </PillsUl>
      )}
      {!isDesktop && (
        <EnvironmentsMenu
          title={selectedEnv}
          environments={environments}
          onSelect={(environment) => setSelectedEnv(environment.toLowerCase())}
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
