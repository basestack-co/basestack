import React, { useState } from "react";
// Locales
import useTranslation from "next-translate/useTranslation";
// Hooks
import { useDebounce } from "react-use";
// Components
import { Button, ButtonVariant, Input } from "@basestack/design-system";
import PopupMenu from "./PopupMenu";
// Styles
import { LeftContent, Container, Wrapper, RightList, ListItem } from "./styles";
// Types
import {
  ButtonSharedProps,
  ToolbarProps,
  SelectedFilter,
  SelectedSort,
} from "./types";

const Toolbar = ({
  onSelectAll,
  onDeleteAll,
  onMarkSpamAll,
  onUnMarkSpamAll,
  onReadSubmissions,
  onUnReadSubmissions,
  onExport,
  onSelectFilter,
  onSelectSort,
  onSearchCallback,
  isSubmitting,
}: ToolbarProps) => {
  const { t } = useTranslation("forms");
  const [searchValue, setSearchValue] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);

  const buttonProps = {
    variant: ButtonVariant.Tertiary,
    iconPlacement: "left",
  } as ButtonSharedProps;

  useDebounce(() => onSearchCallback(searchValue), 500, [searchValue]);

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
            placeholder={t("toolbar.search.placeholder")}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSearchValue(event.target.value)
            }
            name="search"
            value={searchValue}
          />
        </LeftContent>
        <RightList>
          <ListItem>
            <Button
              {...buttonProps}
              icon="check_box_outline_blank"
              onClick={onSelectAll}
              flexShrink={0}
            >
              {t("toolbar.action.select-all")}
            </Button>
          </ListItem>
          <PopupMenu
            width={200}
            icon="arrow_drop_down"
            openIcon="arrow_drop_up"
            text="Actions"
            items={[
              {
                icon: "report",
                text: t("toolbar.action.mark-spam"),
                onClick: onMarkSpamAll,
                isDisabled: isSubmitting,
              },
              {
                icon: "report_off",
                text: t("toolbar.action.unmark-spam"),
                onClick: onUnMarkSpamAll,
                isDisabled: isSubmitting,
              },
              {
                icon: "mark_email_read",
                text: t("toolbar.action.read-submissions"),
                onClick: onReadSubmissions,
                isDisabled: isSubmitting,
              },
              {
                icon: "mark_email_unread",
                text: t("toolbar.action.un-read-submissions"),
                onClick: onUnReadSubmissions,
                isDisabled: isSubmitting,
              },
              {
                icon: "delete",
                variant: ButtonVariant.Danger,
                text: t("toolbar.action.delete-all"),
                onClick: onDeleteAll,
                isDisabled: isSubmitting,
              },
            ]}
          />
          <PopupMenu
            icon="filter_list"
            text={selectedFilter || t("toolbar.filter.placeholder")}
            items={[
              {
                text: t("toolbar.filter.is-spam"),
                onClick: () => {
                  onSelectFilter(SelectedFilter.IS_SPAM);
                  setSelectedFilter(t("toolbar.filter.is-spam"));
                },
                isDisabled: isSubmitting,
              },
              {
                text: t("toolbar.filter.is-not-spam"),
                onClick: () => {
                  onSelectFilter(SelectedFilter.IS_NOT_SPAM);
                  setSelectedFilter(t("toolbar.filter.is-not-spam"));
                },
                isDisabled: isSubmitting,
              },
            ]}
            {...(selectedFilter
              ? { onClear: () => setSelectedFilter(null) }
              : {})}
          />
          <PopupMenu
            icon="swap_vert"
            text={selectedSort || t("toolbar.sort.placeholder")}
            items={[
              {
                text: t("toolbar.sort.newest"),
                onClick: () => {
                  onSelectSort(SelectedSort.NEWEST);
                  setSelectedSort(t("toolbar.sort.newest"));
                },
                isDisabled: isSubmitting,
              },
              {
                text: t("toolbar.sort.oldest"),
                onClick: () => {
                  onSelectSort(SelectedSort.OLDEST);
                  setSelectedSort(t("toolbar.sort.oldest"));
                },
                isDisabled: isSubmitting,
              },
            ]}
            {...(selectedSort ? { onClear: () => setSelectedSort(null) } : {})}
          />
          <ListItem>
            <Button
              {...buttonProps}
              icon="download"
              onClick={onExport}
              isDisabled={isSubmitting}
            >
              {t("toolbar.action.export")}
            </Button>
          </ListItem>
        </RightList>
      </Wrapper>
    </Container>
  );
};

export default Toolbar;
