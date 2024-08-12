import React, { memo } from "react";
import { useTheme } from "styled-components";
import Icon from "../Icon";
import Text from "../Text";
import { Container, HiddenCheckbox, StyledCheckbox } from "./styles";
import { CheckboxProps } from "./types";

const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  label,
  variant = "default",
  disabled = false,
}) => {
  const theme = useTheme();

  return (
    <Container variant={variant} disabled={disabled}>
      <HiddenCheckbox
        type="checkbox"
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />
      <StyledCheckbox variant={variant} checked={checked}>
        {checked && (
          <Icon icon="check" size="small" color={theme.checkbox.checked.icon} />
        )}
      </StyledCheckbox>
      {label && (
        <Text
          ml={theme.spacing.s2}
          color={theme.checkbox.label.color}
          fontWeight={500}
        >
          {label}
        </Text>
      )}
    </Container>
  );
};

export default memo(Checkbox);
