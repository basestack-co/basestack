import { ButtonProps, PopupProps } from "@basestack/design-system";

export enum SelectedFilter {
  RECENT = "recent",
  LASTMONTH = "last_month",
  DELETED = "deleted",
}

export enum SelectedSort {
  SPAM = "Recent",
  READ = "Last month",
  UNREAD = "Deleted",
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
