import React from "react";
import { useTheme } from "styled-components";
import { rem } from "polished";
// Components
import { Text, Button, Icon } from "@basestack/design-system";
import SectionHeader from "../SectionHeader";
import {
  CardContainer,
  Cards,
  Container,
  ContentContainer,
  List,
  ListItem,
  PriceContainer,
  StyledButton,
} from "./styles";

interface CardProps {
  title: string;
  price: string;
  buttonText: string;
  onClick: () => void;
  isDark?: boolean;
  list: Array<{ text: string; enabled: boolean }>;
}

const Card = ({
  title,
  price,
  buttonText,
  onClick,
  list,
  isDark = false,
}: CardProps) => {
  const theme = useTheme();
  const ButtonComponent = isDark ? StyledButton : Button;
  const iconColor = isDark ? theme.colors.blue300 : theme.colors.primary;
  const listTextColor = isDark ? theme.colors.gray50 : theme.colors.black;

  return (
    <CardContainer isDark={isDark}>
      <Text
        color={isDark ? theme.colors.gray50 : theme.colors.black}
        size="large"
        mb={theme.spacing.s5}
        textAlign="center"
      >
        {title}
      </Text>
      <PriceContainer>
        <Text
          fontSize={rem("42px")}
          lineHeight="1.2"
          fontWeight={500}
          textAlign="center"
          color={isDark ? theme.colors.gray50 : theme.colors.black}
        >
          ${price}
        </Text>
        <Text
          size="small"
          ml={theme.spacing.s1}
          color={isDark ? theme.colors.gray300 : theme.colors.gray500}
        >
          /MO
        </Text>
      </PriceContainer>
      <List>
        {list?.map((item, index) => (
          <ListItem key={index}>
            <Icon
              icon={item.enabled ? "check_circle" : "cancel"}
              size="medium"
              color={item.enabled ? iconColor : theme.colors.gray500}
            />
            <Text
              size="medium"
              fontWeight={400}
              ml={theme.spacing.s3}
              color={item.enabled ? listTextColor : theme.colors.gray500}
            >
              {item.text}
            </Text>
          </ListItem>
        ))}
      </List>
      <ButtonComponent onClick={onClick} mt="auto" mx="auto">
        {buttonText}
      </ButtonComponent>
    </CardContainer>
  );
};

const Pricing = () => (
  <Container>
    <ContentContainer>
      <SectionHeader
        title="Pricing"
        text="MoonFlags provides an all-in-one platform for developing, implementing, and managing your feature flags."
      />
      <Cards>
        <Card
          title="Basic Plan"
          price="0"
          list={[
            { text: "10 000 flags per project", enabled: true },
            { text: "5 environments per team", enabled: true },
            { text: "10 project per organization", enabled: true },
            { text: "Enterprise use", enabled: false },
          ]}
          buttonText="Get Started"
          onClick={() => console.log("log")}
        />
        <Card
          isDark
          title="Enterprise"
          price="100"
          list={[
            { text: "50 000 flags per project", enabled: true },
            { text: "5 environments per team", enabled: true },
            { text: "10 project per organization", enabled: true },
            { text: "Enterprise use", enabled: true },
          ]}
          buttonText="Contact Sales"
          onClick={() => console.log("log")}
        />
      </Cards>
    </ContentContainer>
  </Container>
);
export default Pricing;
