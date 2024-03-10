import React, { useState } from "react";
import {
  Button,
  ButtonVariant,
  Input,
  IconButton,
} from "@basestack/design-system";
import { LeftContent, RightContent, Container, Wrapper } from "./styles";
import { ButtonSharedProps, ToolbarProps } from "./types";
import SubMenu from "./SubMenu";

const Toolbar = ({
  onSelectAll,
  onDeleteAll,
  onMarkSpamAll,
  onUnMarkSpamAll,
  onReadSubmissions,
  onUnReadSubmissions,
  onExport,
}: ToolbarProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(true);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const buttonProps = {
    variant: ButtonVariant.Tertiary,
    iconPlacement: "left",
  } as ButtonSharedProps;

  return (
    <Container>
      <Wrapper>
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
            {...buttonProps}
            icon="check_box_outline_blank"
            onClick={onSelectAll}
          >
            Select all
          </Button>
          <Button
            {...buttonProps}
            icon="filter_list"
            onClick={() => setIsFiltersOpen((prevState) => !prevState)}
          >
            Filters
          </Button>
          <Button
            {...buttonProps}
            icon="swap_vert"
            onClick={() => setIsSortOpen((prevState) => !prevState)}
          >
            Sort
          </Button>
          <Button {...buttonProps} icon="download" onClick={onExport}>
            Export
          </Button>
          <IconButton
            icon={isSubMenuOpen ? "arrow_drop_up" : "arrow_drop_down"}
            onClick={() => setIsSubMenuOpen((prevState) => !prevState)}
            variant="secondary"
            size="mediumLarge"
          />
        </RightContent>
      </Wrapper>
      <SubMenu
        onDeleteAll={onDeleteAll}
        onMarkSpamAll={onMarkSpamAll}
        onUnMarkSpamAll={onUnMarkSpamAll}
        onReadSubmissions={onReadSubmissions}
        onUnReadSubmissions={onUnReadSubmissions}
        isOpen={isSubMenuOpen}
      />
    </Container>
  );
};

export default Toolbar;
