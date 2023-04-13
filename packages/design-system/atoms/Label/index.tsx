import { memo } from "react";
import { SpaceProps } from "styled-system";
import { StyledLabel } from "./styles";
import { LabelVariant, LabelSize } from "./types";

export interface LabelProps extends SpaceProps {
  /**
   * Label variants
   */
  variant?: LabelVariant;
  /**
   * Label text
   */
  text: string;
  /**
   * Test id
   */
  testId?: string;
  /**
   * Label size
   */
  size?: LabelSize;
  /**
   * Changes from solid colors to transparent if true
   */
  isTranslucent?: boolean;
}

const Label = ({
  text,
  size = "normal",
  variant = "default",
  isTranslucent = false,
  testId = "label-container",
  ...props
}: LabelProps) => (
  <StyledLabel
    data-testid={testId}
    variant={variant}
    size={size}
    isTranslucent={isTranslucent}
    {...props}
  >
    {text}
  </StyledLabel>
);

export default memo(Label);
