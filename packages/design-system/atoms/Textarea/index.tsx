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
   * Textarea Max Length
   */
  maxlength?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  placeholder,
  isDarker = false,
  onChange,
  ...props
}) => {
  return (
    <StyledTextarea
      data-testid="textarea"
      onChange={onChange}
      placeholder={placeholder}
      isDarker={isDarker}
      {...props}
    />
  );
};

export default memo(Textarea);
