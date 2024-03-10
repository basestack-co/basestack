import { ButtonProps } from "@basestack/design-system";

export interface ToolbarProps {
  onSelectAll: () => void;
  onDeleteAll: () => void;
  onMarkSpamAll: () => void;
  onUnMarkSpamAll: () => void;
  onReadSubmissions: () => void;
  onUnReadSubmissions: () => void;
  onExport: () => void;
}

export type ButtonSharedProps = Pick<ButtonProps, "variant" | "iconPlacement">;
