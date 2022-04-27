import React, { memo } from "react";
import { SpaceProps } from "styled-system";
import { useTheme } from "styled-components";
import Text from "../Text";
import { Label, Input, Slider, Container } from "./styles";

export interface SwitchProps extends SpaceProps {
  /**
   * check toggle by default
   */
  checked?: boolean;
  /**
   * text color
   */
  color?: string;
  /**
   * optional toggle text
   */
  text?: string;
  /**
   * onChange callback
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Switch = ({ text, checked, color, onChange, ...props }: SwitchProps) => {
  const theme = useTheme();

  return (
    <Container {...props}>
      {!!text && (
        <Text muted mr={theme.spacing.s3} size="small">
          {text}
        </Text>
      )}
      <Label>
        <Input type="checkbox" checked={checked} onChange={onChange} />
        <Slider />
      </Label>
    </Container>
  );
};

export default memo(Switch);
