import React, { memo } from "react";
import { SpaceProps } from "styled-system";
import { useTheme } from "styled-components";
import { Input, Textarea, Text } from "../../atoms";
import { InputProps } from "../../atoms/Input";
import { TextareaProps } from "../../atoms/Textarea";
import { Container, Header } from "./styles";

export interface InputGroupProps extends SpaceProps {
  /**
   * Input Group title
   */
  title?: string;
  /**
   * Input Group hint
   */
  hint?: string;
  /**
   * Input component props
   */
  inputProps?: InputProps;
  /**
   * Textarea component props
   */
  textareaProps?: TextareaProps;
  /**
   * Render textArea
   */
  textarea?: boolean;
  /**
   * Input group label
   */
  label?: string;
}

const InputGroup = ({
  textarea = false,
  inputProps,
  textareaProps,
  title,
  hint,
  label,
  ...props
}: InputGroupProps) => {
  const theme = useTheme();

  return (
    <Container data-testid="input-group-container" {...props}>
      <Header>
        {!!title && (
          <Text fontWeight={500} data-testid="input-group-title" size="small">
            {title}
          </Text>
        )}
        <Text data-testid="input-group-label" muted size="small">
          {label}
        </Text>
      </Header>
      {textarea ? (
        <Textarea {...(textareaProps as TextareaProps)} />
      ) : (
        <Input {...(inputProps as InputProps)} />
      )}
      {!!hint && (
        <Text
          data-testid="input-group-hint"
          muted
          size="xSmall"
          mt={theme.spacing.s2}
        >
          {hint}
        </Text>
      )}
    </Container>
  );
};

export default memo(InputGroup);
