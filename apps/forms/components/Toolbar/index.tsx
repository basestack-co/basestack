import React, { useState, useEffect } from "react";
// Locales
import useTranslation from "next-translate/useTranslation";
// Hooks
import { useDebounce } from "react-use";
// Components
import {
  Button,
  ButtonVariant,
  Search,
  Checkbox,
} from "@basestack/design-system";
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

const buttonProps = {
  variant: ButtonVariant.Tertiary,
  iconPlacement: "left",
} as ButtonSharedProps;

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
  isLoading,
  isActionDisabled,
  isSelectAllEnabled = false,
  isExportDisabled,
  isDisabled = false,
  formId,
}: ToolbarProps) => {
  const { t } = useTranslation("forms");
  const [searchValue, setSearchValue] = useState("");
  const [selectedSearchKey, setSelectedSearchKey] = useState<string | null>(
    null,
  );
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);

  useDebounce(() => onSearchCallback(searchValue), 500, [searchValue]);

  useEffect(() => {
    if (formId) {
      setSelectedFilter(null);
      setSelectedSort(null);
    }
  }, [formId]);

  return (
    <Container>
      <Wrapper>
        <LeftContent>
          <Search
            placeholder={t("toolbar.search.placeholder")}
            isDisabled={isDisabled}
            value={searchValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSearchValue(event.target.value)
            }
            onClear={() => setSearchValue("")}
            filter={{
              selected: selectedSearchKey ?? "name",
              isDisabled: isDisabled,
              options: [
                {
                  text: "name",
                  onClick: () => setSelectedSearchKey("name"),
                },
                {
                  text: "email",
                  onClick: () => setSelectedSearchKey("email"),
                },
                {
                  text: "message",
                  onClick: () => setSelectedSearchKey("message"),
                },
              ],
            }}
          />
        </LeftContent>
        <RightList>
          <ListItem>
            <Checkbox
              onChange={onSelectAll}
              checked={isSelectAllEnabled}
              label={t(
                isSelectAllEnabled
                  ? "toolbar.action.un-select-all"
                  : "toolbar.action.select-all",
              )}
              variant="button"
              disabled={isDisabled}
            />
          </ListItem>
          <PopupMenu
            width={200}
            icon="arrow_drop_down"
            openIcon="arrow_drop_up"
            text="Actions"
            isDisabled={isDisabled}
            items={[
              {
                icon: "report",
                text: t("toolbar.action.mark-spam"),
                onClick: onMarkSpamAll,
                isDisabled: isSubmitting || isLoading || isActionDisabled,
              },
              {
                icon: "report_off",
                text: t("toolbar.action.unmark-spam"),
                onClick: onUnMarkSpamAll,
                isDisabled: isSubmitting || isLoading || isActionDisabled,
              },
              {
                icon: "mark_email_read",
                text: t("toolbar.action.read-submissions"),
                onClick: onReadSubmissions,
                isDisabled: isSubmitting || isLoading || isActionDisabled,
              },
              {
                icon: "mark_email_unread",
                text: t("toolbar.action.un-read-submissions"),
                onClick: onUnReadSubmissions,
                isDisabled: isSubmitting || isLoading || isActionDisabled,
              },
              {
                icon: "delete",
                variant: ButtonVariant.Danger,
                text: t("toolbar.action.delete-all"),
                onClick: onDeleteAll,
                isDisabled: isSubmitting || isLoading || isActionDisabled,
              },
            ]}
          />
          <PopupMenu
            icon="filter_list"
            text={selectedFilter || t("toolbar.filter.placeholder")}
            isDisabled={isDisabled}
            items={[
              {
                text: t("toolbar.filter.is-spam"),
                onClick: () => {
                  onSelectFilter(SelectedFilter.IS_SPAM);
                  setSelectedFilter(t("toolbar.filter.is-spam"));
                },
                isDisabled: isSubmitting || isLoading,
              },
              {
                text: t("toolbar.filter.is-not-spam"),
                onClick: () => {
                  onSelectFilter(SelectedFilter.IS_NOT_SPAM);
                  setSelectedFilter(t("toolbar.filter.is-not-spam"));
                },
                isDisabled: isSubmitting || isLoading,
              },
            ]}
            {...(selectedFilter
              ? {
                  onClear: () => {
                    onSelectFilter(null);
                    setSelectedFilter(null);
                  },
                }
              : {})}
          />
          <PopupMenu
            icon="swap_vert"
            text={selectedSort || t("toolbar.sort.placeholder")}
            isDisabled={isDisabled}
            items={[
              {
                text: t("toolbar.sort.newest"),
                onClick: () => {
                  onSelectSort(SelectedSort.NEWEST);
                  setSelectedSort(t("toolbar.sort.newest"));
                },
                isDisabled: isSubmitting || isLoading,
              },
              {
                text: t("toolbar.sort.oldest"),
                onClick: () => {
                  onSelectSort(SelectedSort.OLDEST);
                  setSelectedSort(t("toolbar.sort.oldest"));
                },
                isDisabled: isSubmitting || isLoading,
              },
            ]}
            {...(selectedSort
              ? {
                  onClear: () => {
                    onSelectSort(null);
                    setSelectedSort(null);
                  },
                }
              : {})}
          />
          <ListItem>
            <Button
              {...buttonProps}
              icon="download"
              onClick={onExport}
              isDisabled={isExportDisabled || isDisabled}
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
