import type { CheckboxProps } from "@basestack/design-system";

export type Data = Array<{
  title: string;
  description: string;
}>;

export interface Metadata {
  acceptLanguage: string;
  ip: string;
  referer: string;
  userAgent: string;
}

export interface Props {
  date: string;
  data: Data;
  viewed?: boolean;
  isSpam?: boolean;
  onDelete: () => void;
  onMarkSpam: () => void;
  onReadSubmission: () => void;
  isActionsDisabled?: boolean;
  isMarkSpamLoading?: boolean;
  isReadSubmissionLoading?: boolean;
  isDeleteSubmissionLoading?: boolean;
}

export interface FormSubmissionProps extends Props {
  onSelect: (value: boolean) => void;
  isSelected: boolean;
  metadata: Metadata;
  blockIpAddresses?: string;
  formId: string;
  onOpenCallback: (isOpen: boolean) => void;
}

export interface FormSubmissionHeaderProps extends Props {
  isOpen: boolean;
  checkbox: CheckboxProps;
  onClick: () => void;
}

export interface FormSubmissionBodyProps {
  isOpen: boolean;
  data: Data;
  metadata: Metadata;
  blockIpAddresses?: string;
  formId: string;
}
