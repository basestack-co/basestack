import React, { Fragment, ReactNode } from "react";
import { Icon, Text } from "@basestack/design-system";
import { useTheme } from "styled-components";
import { StepContainer, TextHighlight } from "./styles";
import { Box } from "../styles";

interface StepProps {
  icon: string;
  title: string;
  description: Array<{ text: string; highlight?: boolean }>;
  children?: ReactNode;
}

const Step = ({
  icon = "counter_1",
  title,
  description,
  children,
}: StepProps) => {
  const theme = useTheme();

  return (
    <StepContainer>
      <Icon icon={icon} muted mt="1px" />
      <Box width="100%" ml={theme.spacing.s4}>
        <Text mb={theme.spacing.s1} size="large">
          {title}
        </Text>
        <Text data-testid="setting-title" size="small" muted lineHeight="26px">
          {description.map((item, index) =>
            item.highlight ? (
              <Fragment key={index}>
                <TextHighlight>{item.text}</TextHighlight>&nbsp;
              </Fragment>
            ) : (
              <Fragment key={index}>{item.text}&nbsp;</Fragment>
            ),
          )}
        </Text>
        {children}
      </Box>
    </StepContainer>
  );
};

export default Step;
