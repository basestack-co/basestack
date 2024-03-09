import React, { useState } from "react";
import { useTheme } from "styled-components";
import { Card } from "@basestack/design-system";
import Header from "./Header";
import Body from "./Body";
import { FormSubmissionProps } from "./types";

const FormSubmission = ({ data, date }: FormSubmissionProps) => {
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
      />
      <Body isOpen={isOpen} data={data} />
    </Card>
  );
};

export default FormSubmission;
