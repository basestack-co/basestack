import { CheckboxProps } from "@basestack/design-system";

export interface FormSubmissionProps {
  date: string;
  data: Array<{
    title: string;
    description: string;
  }>;
}

export interface FormSubmissionHeaderProps {
  isOpen: boolean;
  checkbox: CheckboxProps;
  onClick: () => void;
  date: string;
  data: Array<{
    title: string;
    description: string;
  }>;
}

export interface FormSubmissionBodyProps {
  isOpen: boolean;
  data: Array<{
    title: string;
    description: string;
  }>;
}
