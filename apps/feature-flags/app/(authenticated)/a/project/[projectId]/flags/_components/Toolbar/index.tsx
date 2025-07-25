import {
  Button,
  ButtonVariant,
  Input,
  Segment,
} from "@basestack/design-system";
// Locales
import { useTranslations } from "next-intl";
import type React from "react";
import { memo, useState } from "react";
// Hooks
import { useDebounce } from "react-use";
import { useTheme } from "styled-components";
// Components
import type { SpaceProps } from "styled-system";
// Types
import type { SelectedView } from "types";
import { Container, RightContent, SegmentContainer } from "./styles";

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
