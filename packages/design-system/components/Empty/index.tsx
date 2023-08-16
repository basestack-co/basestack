import React, { memo } from "react";
import { useTheme } from "styled-components";
// Components
import Text from "../Text";
import { Button } from "../Button";
import IconBox from "../IconBox";
import { Container } from "./styles";

export interface EmptyProps {
  title: string;
  description: string;
  button?: {
    text: string;
    onClick: () => void;
  };
  iconName?: string;
}

const Empty = ({
  title,
  description,
  button,
  iconName = "info",
}: EmptyProps) => {
  const theme = useTheme();

  return (
    <Container>
      <IconBox
        backgroundColor={theme.empty.icon.backgroundColor}
        icon={iconName}
        mb={theme.spacing.s5}
      />
      <Text size="large" textAlign="center" mb={theme.spacing.s1}>
        {title}
      </Text>
      <Text size="small" textAlign="center" muted mb={theme.spacing.s5}>
        {description}
      </Text>
      {button && <Button onClick={button.onClick}>{button.text}</Button>}
    </Container>
  );
};

export default memo(Empty);
