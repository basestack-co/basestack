import React, { memo } from "react";
import { useTheme } from "styled-components";
// Components
import Text from "../Text";
import { Button } from "../Button";
import IconBox, { IconBoxColor } from "../IconBox";
import { Container } from "./styles";

export interface EmptyProps {
  title: string;
  description: string;
  button?: {
    text: string;
    onClick: () => void;
  };
  iconName?: string;
  iconColor?: IconBoxColor;
}

const Empty = ({
  title,
  description,
  button,
  iconName = "info",
  iconColor = "blue",
}: EmptyProps) => {
  const theme = useTheme();

  return (
    <Container>
      <IconBox icon={iconName} color={iconColor} />
      <Text size="large" mb={theme.spacing.s1}>
        {title}
      </Text>
      <Text size="small" muted mb={theme.spacing.s5}>
        {description}
      </Text>
      {button && <Button onClick={button.onClick}>{button.text}</Button>}
    </Container>
  );
};

export default memo(Empty);
