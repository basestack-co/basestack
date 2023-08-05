import { memo } from "react";
import { SpaceProps } from "styled-system";
import { LabelDot, LabelDotContainer, StyledLabel } from "./styles";
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
  /**
   * Changes the styles of the label
   */
  type?: "dot" | "default";
}

const Label = ({
  text,
  size = "normal",
  type = "default",
  variant = "default",
  isTranslucent = false,
  testId = "label-container",
  ...props
}: LabelProps) => {
  if (type === "dot") {
    return (
      <LabelDotContainer variant={variant} size={size} {...props}>
        <LabelDot variant={variant} isTranslucent={isTranslucent} />
        <span>{text}</span>
      </LabelDotContainer>
    );
  }

  return (
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
};

export default memo(Label);
