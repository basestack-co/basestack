import React, { memo } from "react";
import { useTheme } from "styled-components";
// Components
import Icon from "../Icon";
import Text from "../Text";
import { Button } from "../Button";
import { Container, IconContainer } from "./styles";

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
      <IconContainer>
        <Icon icon={iconName} size="medium" color={theme.empty.icon.color} />
      </IconContainer>
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
