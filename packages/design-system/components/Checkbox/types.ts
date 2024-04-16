import { ChangeEvent } from "react";

export type Variant = "button" | "default";

export interface CheckboxProps {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  variant?: Variant;
  disabled?: boolean;
}
