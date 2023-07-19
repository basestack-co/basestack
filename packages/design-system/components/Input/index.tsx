import React, { memo } from "react";
import { useTheme } from "styled-components";
import { SpaceProps, LayoutProps } from "styled-system";
import Icon from "../Icon";
import { Container, StyledInput, IconContainer } from "./styles";

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
  format?: "small" | "normal";
  /**
   * Icon Placement
   */
  iconPlacement?: "left" | "right";
  /**
   * Input placeholder
   */
  placeholder: string;
  /**
   * Input value
   */
  value: string;
  /**
   * Input name
   */
  name: string;
  /**
   * Input onChange
   */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Input onBlur
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Input onFocus
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Input optional testID
   */
  testId?: string;
  /**
   * Input error styles
   */
  hasError?: boolean;
  /**
   * Input disabled state
   */
  isDisabled?: boolean;
  /**
   * Input autoComplete on or off
   */
  autoComplete?: string;
}

const Input: React.FC<InputProps> = ({
  icon,
  iconPlacement = "left",
  type = "text",
  placeholder,
  name,
  value,
  isDarker = false,
  format = "normal",
  testId = "input-container",
  onChange,
  onBlur,
  onFocus,
  hasError = false,
  isDisabled = false,
  autoComplete,
  ...props
}) => {
  const theme = useTheme();
  const hasLeftIcon = !!icon && iconPlacement === "left";
  const hasRightIcon = !!icon && iconPlacement === "right";

  return (
    <Container data-testid={testId} {...props}>
      {hasLeftIcon && (
        <IconContainer iconPlacement={iconPlacement}>
          <Icon
            icon={icon}
            size="medium"
            color={hasError ? theme.colors.red400 : theme.colors.gray400}
          />
        </IconContainer>
      )}
      <StyledInput
        data-testid="input"
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        name={name}
        value={value}
        type={type}
        isDarker={isDarker}
        format={format}
        hasLeftIcon={hasLeftIcon}
        hasRightIcon={hasRightIcon}
        hasError={hasError}
        disabled={isDisabled}
        autoComplete={autoComplete}
      />
      {hasRightIcon && (
        <IconContainer iconPlacement={iconPlacement}>
          <Icon
            icon={icon}
            size="medium"
            color={hasError ? theme.colors.red400 : theme.colors.gray400}
          />
        </IconContainer>
      )}
    </Container>
  );
};

export default memo(Input);