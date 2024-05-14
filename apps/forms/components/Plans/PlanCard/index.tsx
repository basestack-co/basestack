import React from "react";
import { useTheme } from "styled-components";
import { rem } from "polished";
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
    value: string;
    abbr: string;
    cycle: string;
    description?: string;
  };
  onClick?: () => void;
  isActive?: boolean;
}
const PlanCard = ({ title, features, amount, onClick }: PlanCardProps) => {
  const { colors, isDarkMode, spacing } = useTheme();

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
                {amount.value}
              </Text>
              <Text size="medium" mx={spacing.s1} lineHeight={rem("26px")}>
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
