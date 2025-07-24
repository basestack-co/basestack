import { Icon, Label, Text } from "@basestack/design-system";
import React, { useState } from "react";
import { animated, useSpring } from "react-spring";
import { useTheme } from "styled-components";
import {
  ContentContainer,
  HeaderContainer,
  HeaderContent,
  IconContainer,
  List,
  ListItem,
  StyledButton,
} from "./styles";

export interface CardProps {
  title: string;
  text: string;
  icon?: string;
  items: Array<string>;
  onClick?: () => void;
}

const AnimatedIconContainer = animated(IconContainer);

const CardComp = ({
  title,
  text,
  icon = "help",
  items,
  onClick,
}: CardProps) => {
  const { spacing } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const animatedStyle = useSpring({
    transform: isHovered ? "rotate(90deg)" : "rotate(0deg)",
    config: { tension: 300, friction: 20 },
  });

  return (
    <StyledButton
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
              <Label size="medium" text={item} variant="light" isTranslucent />
            </ListItem>
          ))}
        </List>
      </ContentContainer>
    </StyledButton>
  );
};

export default CardComp;
