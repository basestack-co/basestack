import React, { useState, memo, useMemo } from "react";
// Components
import { SpaceProps } from "styled-system";
import { useTheme } from "styled-components";
import {
  Segment,
  Input,
  Button,
  ButtonVariant,
} from "@basestack/design-system";
import { RightContent, Container, SegmentContainer } from "./styles";
// Hooks
import { useDebounce } from "react-use";
// Types
import { SelectedView } from "types";
// Locales
import { useTranslations } from "next-intl";

export interface ToolbarProps extends SpaceProps {
  onSearchCallback: (value: string) => void;
  onChangeView: (selected: string) => void;
  onClickActivity: () => void;
  isDesktop?: boolean;
  selectedView: SelectedView;
}

const Toolbar = ({
  isDesktop = true,
  onChangeView,
  onSearchCallback,
  selectedView,
  onClickActivity,
}: ToolbarProps) => {
  const t = useTranslations("flag");
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
      <RightContent>
        <Button
          onClick={onClickActivity}
          icon="history"
          iconPlacement="left"
          variant={ButtonVariant.Tertiary}
        >
          {t("toolbar.activity.button")}
        </Button>
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
      </RightContent>
    </Container>
  );
};

export default memo(Toolbar);
