import React from "react";
import { useTheme } from "styled-components";
import { Text, Card } from "@basestack/design-system";

const Form = () => {
  const theme = useTheme();

  return (
    <Card p={theme.spacing.s5}>
      <Text size="large">Create form for demo</Text>
    </Card>
  );
};

export default Form;
