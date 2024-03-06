import { CheckboxProps } from "@basestack/design-system";

export type Data = Array<{
  title: string;
  description: string;
}>;

export interface FormSubmissionProps {
  date: string;
  data: Data;
}

export interface FormSubmissionHeaderProps {
  isOpen: boolean;
  checkbox: CheckboxProps;
  onClick: () => void;
  date: string;
  data: Data;
}

export interface FormSubmissionBodyProps {
  isOpen: boolean;
  data: Data;
}
