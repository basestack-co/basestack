import { memo } from "react";
import { useTheme } from "styled-components";
import { SpaceProps } from "styled-system";
import Input, { InputProps } from "../Input";
import Text from "../Text";
import Textarea, { TextareaProps } from "../Textarea";
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
  const hasError = textarea ? textareaProps?.hasError : inputProps?.hasError;

  return (
    <Container data-testid="input-group-container" {...props}>
      {(!!title || !!label) && (
        <Header>
          {!!title && (
            <Text fontWeight={500} data-testid="input-group-title" size="small">
              {title}
            </Text>
          )}
          {!!label && (
            <Text data-testid="input-group-label" muted size="small">
              {label}
            </Text>
          )}
        </Header>
      )}
      {textarea ? (
        <Textarea {...(textareaProps as TextareaProps)} />
      ) : (
        <Input {...(inputProps as InputProps)} />
      )}
      {!!hint && (
        <Text
          data-testid="input-group-hint"
          size="xSmall"
          mt={theme.spacing.s2}
          color={
            hasError
              ? theme.inputGroup.hint.error.color
              : theme.inputGroup.hint.color
          }
        >
          {hint}
        </Text>
      )}
    </Container>
  );
};

export default memo(InputGroup);
