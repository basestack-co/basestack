import React from "react";
import { useTheme } from "styled-components";
import { Text, Icon, Label } from "@basestack/design-system";
import {
  Container,
  Header,
  HeaderContent,
  Indicator,
  List,
  ListItem,
  StyledButton,
  StyledCard,
} from "./styles";

type Color = "blue" | "green" | "yellow";

export interface CardProps {
  title: string;
  text: string;
  icon?: string;
  color: Color;
  items: Array<string>;
  onClick?: () => void;
}

const CardComp = ({
  title,
  text,
  icon = "help",
  color = "blue",
  items,
  onClick,
}: CardProps) => {
  const { colors, spacing, isDarkMode } = useTheme();

  const indicatorColors = {
    blue: colors[isDarkMode ? "blue500" : "blue400"],
    green: colors[isDarkMode ? "green500" : "green400"],
    yellow: colors[isDarkMode ? "yellow500" : "yellow400"],
  };

  const indicatorColor = indicatorColors[color];

  return (
    <Container>
      <StyledButton onClick={onClick} disabled={typeof onClick !== "function"}>
        <Header>
          <Indicator color={indicatorColor as Color} />
          <HeaderContent>
            <Text size="large">{title}</Text>
            <Icon icon={icon} />
          </HeaderContent>
        </Header>
      </StyledButton>

      <StyledCard height="auto">
        <Text
          size="medium"
          fontWeight={400}
          lineHeight={1.6}
          muted
          mb={spacing.s5}
        >
          {text}
        </Text>
        <List>
          {items.map((item, index) => (
            <ListItem key={index}>
              <Label size="medium" text={item} variant="light" isTranslucent />
            </ListItem>
          ))}
        </List>
      </StyledCard>
    </Container>
  );
};

export default CardComp;
