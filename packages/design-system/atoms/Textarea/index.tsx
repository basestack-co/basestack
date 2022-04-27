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
}

const Textarea: React.FC<TextareaProps> = ({
  placeholder,
  isDarker = false,
  ...props
}) => {
  return (
    <StyledTextarea
      data-testid="textarea"
      placeholder={placeholder}
      isDarker={isDarker}
      {...props}
    />
  );
};

export default memo(Textarea);
