import React, { useState } from "react";
import { useTheme } from "styled-components";
import { Text, Icon, Label } from "@basestack/design-system";
import { useSpring, animated } from "react-spring";
import {
  Container,
  HeaderContent,
  IconContainer,
  List,
  ListItem,
  HeaderContainer,
  StyledButton,
  ContentContainer,
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

const AnimatedIconContainer = animated(IconContainer);

const CardComp = ({
  title,
  text,
  icon = "help",
  color = "blue",
  items,
  onClick,
}: CardProps) => {
  const { colors, spacing } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const indicatorColors = {
    blue: colors.blue400,
    green: colors.green400,
    yellow: colors.yellow400,
  };

  const indicatorColor = indicatorColors[color];

  const animatedStyle = useSpring({
    transform: isHovered ? "rotate(90deg)" : "rotate(0deg)",
    config: { tension: 300, friction: 20 },
  });

  return (
    <Container>
      <StyledButton
        color={indicatorColor as Color}
        onClick={onClick}
        disabled={typeof onClick !== "function"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <HeaderContainer>
          <HeaderContent>
            <Text size="large">{title}</Text>
            <AnimatedIconContainer style={animatedStyle}>
              <Icon icon={isHovered ? "arrow_upward" : icon} />
            </AnimatedIconContainer>
          </HeaderContent>
        </HeaderContainer>
        <ContentContainer>
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
                <Label
                  size="medium"
                  text={item}
                  variant="light"
                  isTranslucent
                />
              </ListItem>
            ))}
          </List>
        </ContentContainer>
      </StyledButton>
    </Container>
  );
};

export default CardComp;
