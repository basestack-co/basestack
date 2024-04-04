import { ButtonProps, PopupProps } from "@basestack/design-system";

export enum SelectedFilter {
  IS_SPAM = "is_spam",
  IS_NOT_SPAM = "is_not_spam",
}

export enum SelectedSort {
  NEWEST = "Newest",
  OLDEST = "Oldest",
}

export interface ToolbarProps {
  onSelectAll: () => void;
  onDeleteAll: () => void;
  onMarkSpamAll: () => void;
  onUnMarkSpamAll: () => void;
  onReadSubmissions: () => void;
  onUnReadSubmissions: () => void;
  onExport: () => void;
  onSelectFilter: (value: SelectedFilter) => void;
  onSelectSort: (value: SelectedSort) => void;
  onSearchCallback: (value: string) => void;
  isSubmitting?: boolean;
  isLoading?: boolean;
  isActionDisabled?: boolean;
}

export type ButtonSharedProps = Pick<ButtonProps, "variant" | "iconPlacement">;

export interface PopupMenuProps {
  icon: string;
  text: string;
  items: PopupProps["items"];
  width?: number;
  onClear?: () => void;
  openIcon?: string;
}
