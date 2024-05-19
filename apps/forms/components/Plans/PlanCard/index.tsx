import React, { useEffect, useRef } from "react";
import { useTheme } from "styled-components";
import { rem } from "polished";
import { useSpring, animated } from "@react-spring/web";
// Components
import { Card, Icon, Text } from "@basestack/design-system";
import {
  Button,
  LeftContainer,
  List,
  ListItem,
  Row,
  TitleContainer,
  ValueContainer,
  AmountContainer,
  ArrowContainer,
} from "./styles";

interface PlanCardProps {
  title: string;
  features: Array<string>;
  amount: {
    symbol: string;
    abbr: string;
    cycle: string;
    value: number;
    description?: string;
  };
  onClick?: () => void;
  isActive?: boolean;
}
const PlanCard = ({ title, features, amount, onClick }: PlanCardProps) => {
  const { colors, isDarkMode, spacing } = useTheme();

  const valueColor = {
    dark: isDarkMode ? colors.gray300 : colors.black,
    red: colors.red300,
    green: colors.green300,
  };

  const prevAmountRef = useRef(amount.value);

  const [spring, setSpring] = useSpring(() => ({
    number: amount.value,
    color: valueColor.dark,
    config: { duration: 1000 },
  }));

  useEffect(() => {
    const prevAmount = prevAmountRef.current;
    const newColor =
      amount.value > prevAmount ? valueColor.red : valueColor.green;

    setSpring({
      number: amount.value,
      color: amount.value === prevAmount ? valueColor.dark : newColor,
      onRest: () => {
        setSpring({ color: valueColor.dark });
      },
    });

    prevAmountRef.current = amount.value;
  }, [
    amount.value,
    setSpring,
    valueColor.dark,
    valueColor.green,
    valueColor.red,
  ]);

  return (
    <Button
      as={onClick ? "button" : "div"}
      isButton={typeof onClick === "function"}
      onClick={onClick}
    >
      <Card
        hasHoverAnimation={typeof onClick === "function"}
        p={spacing.s5}
        width="100%"
      >
        <Row>
          <LeftContainer>
            <TitleContainer>
              <Text size="medium" mb={spacing.s1}>
                {title}
              </Text>
            </TitleContainer>
            <List>
              {features.map((item, index) => (
                <ListItem key={index}>
                  <Text muted>{item}</Text>
                </ListItem>
              ))}
            </List>
          </LeftContainer>
          <AmountContainer className="amount-container">
            <ValueContainer>
              <Text size="medium" lineHeight={rem("26px")}>
                <animated.span style={{ color: spring.color }}>
                  {amount.symbol}
                </animated.span>
              </Text>
              <Text size="medium" mr={spacing.s1} lineHeight={rem("26px")}>
                <animated.span style={{ color: spring.color }}>
                  {spring.number.to((val) => Math.floor(val))}
                </animated.span>
              </Text>
              <Text size="medium" mr={spacing.s1} lineHeight={rem("26px")}>
                {amount.abbr}
              </Text>
              <Text muted>/{amount.cycle}</Text>
            </ValueContainer>
            <Text muted>{amount.description}</Text>
          </AmountContainer>
          {onClick && (
            <ArrowContainer className="arrow-icon">
              <Icon
                icon="arrow_forward"
                size="medium"
                color={colors[isDarkMode ? "gray300" : "primary"]}
              />
            </ArrowContainer>
          )}
        </Row>
      </Card>
    </Button>
  );
};

export default PlanCard;
