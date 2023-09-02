import React, { useState, memo } from "react";
// Components
import { SpaceProps } from "styled-system";
import { useTheme } from "styled-components";
import { Segment, Input } from "@basestack/design-system";
import { Container, SegmentContainer } from "./styles";
// Hooks
import { useDebounce } from "react-use";
// Types
import { SelectedView } from "types";
// Locales
import useTranslation from "next-translate/useTranslation";

export interface ToolbarProps extends SpaceProps {
  onSearchCallback: (value: string) => void;
  onChangeView: (selected: string) => void;
  isDesktop?: boolean;
  selectedView: SelectedView;
}

const Toolbar = ({
  isDesktop = true,
  onChangeView,
  onSearchCallback,
  selectedView,
}: ToolbarProps) => {
  const { t } = useTranslation("flags");
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState<string>("");

  useDebounce(() => onSearchCallback(searchValue), 500, [searchValue]);

  return (
    <Container data-testid="toolbar" my={theme.spacing.s5}>
      <Input
        testId="search-input"
        size="small"
        width="100%"
        isDarker
        icon="search"
        iconPlacement="left"
        placeholder={t("toolbar.search.placeholder")}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setSearchValue(event.target.value)
        }
        name="search"
        value={searchValue}
      />
      {isDesktop && (
        <SegmentContainer>
          <Segment
            onSelect={onChangeView}
            items={[
              { icon: "view_module", id: "cards" },
              { icon: "view_stream", id: "table" },
            ]}
            selectedIndex={selectedView === "table" ? 1 : 0}
          />
        </SegmentContainer>
      )}
    </Container>
  );
};

export default memo(Toolbar);
