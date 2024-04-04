import { CheckboxProps } from "@basestack/design-system";

export type Data = Array<{
  title: string;
  description: string;
}>;

export interface Props {
  date: string;
  data: Data;
  viewed?: boolean;
  isSpam?: boolean;
  onDelete: () => void;
  onMarkSpam: () => void;
  onReadSubmission: () => void;
}

export interface FormSubmissionProps extends Props {
  onSelect: (value: boolean) => void;
  isSelected: boolean;
}

export interface FormSubmissionHeaderProps extends Props {
  isOpen: boolean;
  checkbox: CheckboxProps;
  onClick: () => void;
}

export interface FormSubmissionBodyProps {
  isOpen: boolean;
  data: Data;
}
