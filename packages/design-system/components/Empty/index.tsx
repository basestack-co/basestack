import React, { memo } from "react";
import { useTheme } from "styled-components";
import { SpaceProps } from "styled-system";
// Components
import Text from "../Text";
import { Button } from "../Button";
import IconBox from "../IconBox";
import { Container } from "./styles";

export interface EmptyProps extends SpaceProps {
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
  ...props
}: EmptyProps) => {
  const theme = useTheme();

  return (
    <Container {...props}>
      <IconBox
        backgroundColor={theme.empty.icon.backgroundColor}
        icon={iconName}
        mb={theme.spacing.s5}
      />
      <Text size="large" textAlign="center" mb={theme.spacing.s1}>
        {title}
      </Text>
      <Text size="small" textAlign="center" muted>
        {description}
      </Text>
      {button && (
        <Button mt={theme.spacing.s5} onClick={button.onClick}>
          {button.text}
        </Button>
      )}
    </Container>
  );
};

export default memo(Empty);
