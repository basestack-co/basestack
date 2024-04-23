import React from "react";
// Locales
import useTranslation from "next-translate/useTranslation";
// Components
import { useTheme } from "styled-components";
import { Label, Text } from "@basestack/design-system";
import { Box } from "./styles";

interface LabelsProps {
  date: string;
  viewed?: boolean;
  isSpam?: boolean;
}

const Labels = ({ date, viewed, isSpam }: LabelsProps) => {
  const { t } = useTranslation("forms");
  const theme = useTheme();

  return (
    <Box overflow="hidden" display="flex" alignItems="center">
      {!viewed && (
        <Label
          text={t("submission.label.new")}
          variant="info"
          size="small"
          isUppercase
          isTranslucent
        />
      )}
      {isSpam && (
        <Label
          text={t("submission.label.spam")}
          variant="warning"
          ml={!viewed ? theme.spacing.s2 : 0}
          size="small"
          isUppercase
          isTranslucent
        />
      )}
      <Box ml={theme.spacing.s4 ?? 0} minWidth={0}>
        <Text fontWeight={400} muted lineTruncate>
          {date}
        </Text>
      </Box>
    </Box>
  );
};

export default Labels;
