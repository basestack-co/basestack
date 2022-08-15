import React from "react";
import { useTheme } from "styled-components";
import { InputGroup, Text } from "@basestack/design-system";

const Advanced = () => {
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

export default Advanced;
