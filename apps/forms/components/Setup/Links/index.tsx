import React from "react";
import { useTheme } from "styled-components";
import { Text, Card } from "@basestack/design-system";

const Links = () => {
  const theme = useTheme();

  return (
    <Card mt={theme.spacing.s5} p={theme.spacing.s5}>
      <Text size="large">Create form for demo</Text>
      <Text size="small" muted mb={theme.spacing.s5}>
        Follow our step by step examples to build and collect form submissions
        from your front-end code
      </Text>
    </Card>
  );
};

export default Links;
