import React, { memo, ChangeEvent } from "react";
import { useTheme } from "styled-components";
import Icon from "../Icon";
import Text from "../Text";
import { Container, HiddenCheckbox, StyledCheckbox } from "./styles";

export interface CheckboxProps {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  label,
}) => {
  const theme = useTheme();

  return (
    <Container>
      <HiddenCheckbox type="checkbox" checked={checked} onChange={onChange} />
      <StyledCheckbox checked={checked}>
        {checked && (
          <Icon icon="check" size="small" color={theme.checkbox.checked.icon} />
        )}
      </StyledCheckbox>
      {label && (
        <Text ml={theme.spacing.s2} color={theme.checkbox.label.color}>
          Demo
        </Text>
      )}
    </Container>
  );
};

export default memo(Checkbox);
