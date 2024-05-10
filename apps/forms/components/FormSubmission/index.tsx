import React, { useState, useEffect } from "react";
// Components
import { useTheme } from "styled-components";
import { Card } from "@basestack/design-system";
import Header from "./Header";
import Body from "./Body";
// Types
import { FormSubmissionProps } from "./types";

const FormSubmission = ({
  data,
  date,
  viewed,
  isSpam,
  onDelete,
  onMarkSpam,
  onReadSubmission,
  onSelect,
  isSelected = false,
  isActionsDisabled,
  metadata,
  blockIpAddresses,
  formId,
}: FormSubmissionProps) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => setChecked(isSelected), [isSelected]);

  return (
    <Card pl={theme.spacing.s5}>
      <Header
        onClick={() => setIsOpen((prevState) => !prevState)}
        checkbox={{
          checked,
          onChange: () => {
            setChecked((prevState) => !prevState);
            onSelect(!checked);
          },
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
