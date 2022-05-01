import React, { memo, useState } from "react";
import { useTheme } from "styled-components";
import { SpaceProps } from "styled-system";
import { Input, Pill } from "../../atoms";
import { Container, PillsUl, PillLi } from "./styles";

export interface ToolbarProps extends SpaceProps {
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect: (environment: string) => void;
  environments: Array<string>;
}

const Toolbar = ({
  environments,
  onSearch,
  onSelect,
  ...props
}: ToolbarProps) => {
  const [selectedEnv, setSelectedEnv] = useState("all");
  const theme = useTheme();

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
      />
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
        {environments.map((environment, index) => {
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

      <Pill
        text="..."
        isSelected={false}
        onClick={() => console.log("clicked")}
      />
    </Container>
  );
};

export default memo(Toolbar);
