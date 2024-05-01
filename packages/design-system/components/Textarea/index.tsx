import React, { memo } from "react";
import { SpaceProps } from "styled-system";
import { StyledTextarea } from "./styles";

export interface TextareaProps extends SpaceProps {
  /**
   * Set textarea to darker
   */
  isDarker?: boolean;
  /**
   * Textarea placeholder
   */
  placeholder: string;
  /**
   * Textarea onChange
   */
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /**
   * Input onBlur
   */
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  /**
   * Textarea Max Length
   */
  maxlength?: string;
  /**
   * Textarea name
   */
  name: string;
  /**
   * Input value
   */
  value: string;
  /**
   * Input error styles
   */
  hasError?: boolean;
  /**
   * Input disabled state
   */
  isDisabled?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  placeholder,
  isDarker = false,
  onChange,
  onBlur,
  hasError = false,
  ...props
}) => {
  return (
    <StyledTextarea
      data-testid="textarea"
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      isDarker={isDarker}
      hasError={hasError}
      {...props}
    />
  );
};

export default memo(Textarea);
