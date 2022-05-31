import React, { memo } from "react";
import { useTheme } from "styled-components";
import { SpaceProps, LayoutProps } from "styled-system";
import { Container, StyledInput, LeftIcon, RightIcon } from "./styles";

export interface InputProps extends SpaceProps, LayoutProps {
  /**
   * Optional Icon
   */
  icon?: string;
  /**
   * Input type
   */
  type?: string;
  /**
   * Set input to darker
   */
  isDarker?: boolean;
  /**
   * Input size
   */
  size?: "small" | "normal";
  /**
   * Icon Placement
   */
  iconPlacement?: "left" | "right";
  /**
   * Input placeholder
   */
  placeholder: string;
  /**
   * Input onChange
   */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Input optional testID
   */
  testId?: string;
}

const Input: React.FC<InputProps> = ({
  icon,
  iconPlacement = "left",
  type = "text",
  placeholder,
  isDarker = false,
  size = "normal",
  testId = "input-container",
  onChange,
  ...props
}) => {
  const theme = useTheme();
  const hasLeftIcon = !!icon && iconPlacement === "left";
  const hasRightIcon = !!icon && iconPlacement === "right";

  return (
    <Container data-testid={testId} {...props}>
      {hasLeftIcon && (
        <LeftIcon icon={icon} size="medium" color={theme.colors.gray500} />
      )}
      <StyledInput
        data-test-id="input"
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        isDarker={isDarker}
        size={size}
        hasLeftIcon={hasLeftIcon}
        hasRightIcon={hasRightIcon}
      />
      {hasRightIcon && (
        <RightIcon icon={icon} size="medium" color={theme.colors.gray500} />
      )}
    </Container>
  );
};

export default memo(Input);
