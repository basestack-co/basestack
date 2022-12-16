import React, { useState } from "react";
// Components
import { useTheme } from "styled-components";
import { InputGroup, Text } from "@basestack/design-system";
// Types
import { FlagFormInputs } from "../types";
import { UseFormSetValue } from "react-hook-form";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export interface Props {
  setValue: UseFormSetValue<FlagFormInputs>;
}

const AdvanceTab = ({ setValue }: Props) => {
  const theme = useTheme();
  const [value, onChange] = useState(new Date());

  return (
    <>
      <Calendar
        onChange={onChange}
        value={value}
        locale="en-US"
        minDate={new Date()}
      />
      <InputGroup
        title="Expiration Date"
        inputProps={{
          onChange: (text) => console.log("text = ", text),
          placeholder: "mm/dd/yyyy",
          name: "date",
          value: "",
        }}
        mb={theme.spacing.s6}
      />
      <Text fontWeight={500} size="small">
        Payload
      </Text>
    </>
  );
};

export default AdvanceTab;
