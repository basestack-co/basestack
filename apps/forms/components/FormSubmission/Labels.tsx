import React from "react";
import { useTheme } from "styled-components";
import { Label, Text } from "@basestack/design-system";
import { Box } from "./styles";

interface LabelsProps {
  date: string;
}

const Labels = ({ date }: LabelsProps) => {
  const theme = useTheme();

  return (
    <Box display="flex" alignItems="center">
      <Label text="New" variant="info" isTranslucent />
      <Box ml={theme.spacing.s3 ?? 0} minWidth={0}>
        <Text fontWeight={400} muted lineTruncate>
          {date}
        </Text>
      </Box>
    </Box>
  );
};

export default Labels;
