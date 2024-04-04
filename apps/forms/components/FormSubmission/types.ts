import { CheckboxProps } from "@basestack/design-system";

export type Data = Array<{
  title: string;
  description: string;
}>;

export interface FormSubmissionProps {
  date: string;
  data: Data;
  viewed?: boolean;
  isSpam?: boolean;
  onDelete: () => void;
  onMarkSpam: () => void;
  onReadSubmission: () => void;
}

export interface FormSubmissionHeaderProps extends FormSubmissionProps {
  isOpen: boolean;
  checkbox: CheckboxProps;
  onClick: () => void;
}

export interface FormSubmissionBodyProps {
  isOpen: boolean;
  data: Data;
}
