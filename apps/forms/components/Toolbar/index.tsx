import React, { useState } from "react";
import { Button, ButtonVariant, Input } from "@basestack/design-system";
import { LeftContent, RightContent, Container } from "./styles";

interface ToolbarProps {}

const Toolbar = ({}: ToolbarProps) => {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <Container>
      <LeftContent>
        <Input
          testId="search-input"
          size="small"
          width="100%"
          isDarker
          icon="search"
          iconPlacement="left"
          placeholder="Search submissions"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setSearchValue(event.target.value)
          }
          name="search"
          value={searchValue}
        />
      </LeftContent>
      <RightContent>
        <Button
          icon="filter_list"
          iconPlacement="left"
          variant={ButtonVariant.Tertiary}
          onClick={() => console.log("")}
        >
          Filters
        </Button>
        <Button
          icon="swap_vert"
          iconPlacement="left"
          variant={ButtonVariant.Tertiary}
          onClick={() => console.log("")}
        >
          Sort
        </Button>
        <Button
          icon="download"
          iconPlacement="left"
          variant={ButtonVariant.Tertiary}
          onClick={() => console.log("")}
        >
          Export
        </Button>
      </RightContent>
    </Container>
  );
};

export default Toolbar;
