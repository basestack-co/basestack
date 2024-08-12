import { memo, ReactNode } from "react";
import { SpaceProps, FlexboxProps, LayoutProps } from "styled-system";
import { LabelDot, LabelDotContainer, StyledLabel } from "./styles";
import { LabelVariant, LabelSize } from "./types";

export interface LabelProps extends SpaceProps, FlexboxProps, LayoutProps {
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
  /**
   * Adds react component for ex icon button to clear label
   */
  children?: ReactNode;
  /**
   * Changes text to uppercase
   */
  isUppercase?: boolean;
}

const Label = ({
  text,
  size = "normal",
  type = "default",
  variant = "default",
  isUppercase = false,
  isTranslucent = false,
  testId = "label-container",
  children,
  ...props
}: LabelProps) => {
  if (type === "dot") {
    return (
      <LabelDotContainer
        isUppercase={isUppercase}
        variant={variant}
        size={size}
        {...props}
      >
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
      isUppercase={isUppercase}
      hasChildren={!!children}
      {...props}
    >
      <span>{text}</span>
      {children}
    </StyledLabel>
  );
};

export default memo(Label);
