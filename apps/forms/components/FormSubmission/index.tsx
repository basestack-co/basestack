import React, { useState } from "react";
import { useTheme } from "styled-components";
import { Card } from "@basestack/design-system";
import Header from "./Header";
import Body from "./Body";
import { FormSubmissionProps } from "./types";

const FormSubmission = ({
  data,
  date,
  viewed,
  isSpam,
  onDelete,
  onMarkSpam,
  onReadSubmission,
}: FormSubmissionProps) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  return (
    <Card pl={theme.spacing.s5}>
      <Header
        onClick={() => setIsOpen((prevState) => !prevState)}
        checkbox={{
          checked: checked,
          onChange: () => setChecked((prevState) => !prevState),
        }}
        data={data}
        date={date}
        isOpen={isOpen}
        isSpam={isSpam}
        viewed={viewed}
        onDelete={onDelete}
        onMarkSpam={onMarkSpam}
        onReadSubmission={onReadSubmission}
      />
      <Body isOpen={isOpen} data={data} />
    </Card>
  );
};

export default FormSubmission;
