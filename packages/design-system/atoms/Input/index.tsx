import React, { memo } from "react";
import { useTheme } from "styled-components";
import { SpaceProps } from "styled-system";
import { Container, StyledInput, LeftIcon, RightIcon } from "./styles";

export interface InputProps extends SpaceProps {
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
}

const Input: React.FC<InputProps> = ({
  icon,
  iconPlacement = "left",
  type = "text",
  placeholder,
  isDarker = false,
  size = "normal",
  ...props
}) => {
  const theme = useTheme();
  const hasLeftIcon = !!icon && iconPlacement === "left";
  const hasRightIcon = !!icon && iconPlacement === "right";

  return (
    <Container data-testid="input-container">
      {hasLeftIcon && (
        <LeftIcon icon={icon} size="medium" color={theme.colors.gray500} />
      )}
      <StyledInput
        data-testid="input"
        placeholder={placeholder}
        type={type}
        isDarker={isDarker}
        size={size}
        hasLeftIcon={hasLeftIcon}
        hasRightIcon={hasRightIcon}
        {...props}
      />
      {hasRightIcon && (
        <RightIcon icon={icon} size="medium" color={theme.colors.gray500} />
      )}
    </Container>
  );
};

export default memo(Input);
