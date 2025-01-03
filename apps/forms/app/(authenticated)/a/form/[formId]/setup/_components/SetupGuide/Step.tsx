import React, { Fragment, ReactNode } from "react";
// Components
import { Icon, Text } from "@basestack/design-system";
// Styles
import { useTheme } from "styled-components";
import {
  IconContainer,
  StepContainer,
  StepWrapper,
  TextHighlight,
} from "./styles";
import { Box } from "../../styles";

interface StepProps {
  step: number;
  title: string;
  description: Array<{ text: string; highlight?: boolean }>;
  children?: ReactNode;
}

const Step = ({ step = 1, title, description, children }: StepProps) => {
  const theme = useTheme();

  return (
    <StepContainer>
      <StepWrapper>
        <IconContainer>
          <Icon icon={`counter_${step}`} muted />
        </IconContainer>
        <Box width="100%">
          <Text mb={theme.spacing.s1} size="large">
            {title}
          </Text>
          <Text size="small" muted lineHeight="26px">
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
        </Box>
      </StepWrapper>
      {children}
    </StepContainer>
  );
};

export default Step;
