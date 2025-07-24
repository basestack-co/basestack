import { Card } from "@basestack/design-system";
import React, { useEffect, useState } from "react";
// Components
import { useTheme } from "styled-components";
import Body from "./Body";
import Header from "./Header";
// Types
import type { FormSubmissionProps } from "./types";

const FormSubmission = ({
  data,
  date,
  viewed,
  isSpam,
  onDelete,
  onMarkSpam,
  onReadSubmission,
  onSelect,
  onOpenCallback,
  isSelected = false,
  isActionsDisabled,
  metadata,
  blockIpAddresses,
  formId,
  isMarkSpamLoading,
  isReadSubmissionLoading,
  isDeleteSubmissionLoading,
}: FormSubmissionProps) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => setChecked(isSelected), [isSelected]);

  return (
    <Card pl={theme.spacing.s5}>
      <Header
        onClick={() => {
          setIsOpen((prevState) => !prevState);
          onOpenCallback(!isOpen);
        }}
        checkbox={{
          checked,
          onChange: () => {
            setChecked((prevState) => !prevState);
            onSelect(!checked);
          },
          disabled: isActionsDisabled,
        }}
        data={data}
        date={date}
        isOpen={isOpen}
        isSpam={isSpam}
        viewed={viewed}
        onDelete={onDelete}
        onMarkSpam={onMarkSpam}
        onReadSubmission={onReadSubmission}
        isActionsDisabled={isActionsDisabled}
        isMarkSpamLoading={isMarkSpamLoading}
        isReadSubmissionLoading={isReadSubmissionLoading}
        isDeleteSubmissionLoading={isDeleteSubmissionLoading}
      />
      <Body
        formId={formId}
        isOpen={isOpen}
        data={data}
        metadata={metadata}
        blockIpAddresses={blockIpAddresses}
      />
    </Card>
  );
};

export default FormSubmission;
