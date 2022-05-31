import React, { memo } from "react";
import { SpaceProps } from "styled-system";
import { StyledLabel } from "./styles";

interface LabelProps extends SpaceProps {
  /**
   * Label variants
   */
  variant?: "success" | "default";
  /**
   * Label text
   */
  text: string;
  /**
   * Test id
   */
  testId?: string;
}

const Label = ({
  variant = "default",
  text,
  testId = "label-container",
  ...props
}: LabelProps) => (
  <StyledLabel data-testid={testId} variant={variant} {...props}>
    {text}
  </StyledLabel>
);

export default memo(Label);
