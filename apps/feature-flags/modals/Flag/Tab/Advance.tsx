import React from "react";
// Components
import { useTheme } from "styled-components";
import { InputGroup, Text } from "@basestack/design-system";
// Types
import { FlagFormInputs } from "../schema";
import { UseFormSetValue } from "react-hook-form";

export interface Props {
  setValue: UseFormSetValue<FlagFormInputs>;
}

const AdvanceTab = ({ setValue }: Props) => {
  const theme = useTheme();

  return (
    <>
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
