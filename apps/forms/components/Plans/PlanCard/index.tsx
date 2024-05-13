import React from "react";
import { useTheme } from "styled-components";
import { rem } from "polished";
// Components
import { Button, ButtonVariant, Card, Text } from "@basestack/design-system";
import {
  LeftContainer,
  List,
  ListItem,
  RightContainer,
  Row,
  TitleContainer,
  ValueContainer,
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
  button?: {
    onClick: () => void;
    text: string;
  };
}
const PlanCard = ({ title, features, amount, button }: PlanCardProps) => {
  const theme = useTheme();

  return (
    <Card p={theme.spacing.s5}>
      <Row>
        <LeftContainer>
          <TitleContainer>
            <Text size="large" mb={theme.spacing.s1}>
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
        <RightContainer>
          <ValueContainer>
            <Text size="large" lineHeight={rem("26px")}>
              {amount.value}
            </Text>
            <Text size="large" mx={theme.spacing.s1} lineHeight={rem("26px")}>
              {amount.abbr}
            </Text>
            <Text muted>/{amount.cycle}</Text>
          </ValueContainer>
          <Text muted>{amount.description}</Text>
        </RightContainer>
      </Row>
      {button && (
        <Button
          onClick={button.onClick}
          variant={ButtonVariant.Secondary}
          mt={theme.spacing.s5}
        >
          {button.text}
        </Button>
      )}
    </Card>
  );
};

export default PlanCard;
