import React from "react";
import { useTheme } from "styled-components";
import {
  Text,
  Button,
  Card,
  ButtonVariant,
  IconBox,
} from "@basestack/design-system";

const GetStartedCard = () => {
  const theme = useTheme();

  return (
    <Card hasHoverAnimation p={theme.spacing.s5}>
      <IconBox icon="downloading" mb={theme.spacing.s5} />
      <Text size="large" mb={theme.spacing.s2}>
        Set Up the SDK
      </Text>
      <Text muted size="small" mb={theme.spacing.s6}>
        Integrate Feature Flags into your Product using the official SDKs.
        Discover the available libraries.
      </Text>
      <Button mt="auto" variant={ButtonVariant.Outlined} onClick={() => null}>
        View Instructions
      </Button>
    </Card>
  );
};

export default GetStartedCard;
