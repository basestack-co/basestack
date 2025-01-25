import React, { useCallback, useState } from "react";
import { useTheme } from "styled-components";
import { rem } from "polished";
// Components
import {
  Text,
  Button,
  Icon,
  ButtonSize,
  ButtonVariant,
  HorizontalRule,
  Segment,
} from "@basestack/design-system";
import SectionHeader from "../SectionHeader";
import {
  Card,
  Cards,
  Container,
  ContentContainer,
  FloatingLabel,
  List,
  ListItem,
  PriceContainer,
} from "./styles";
import { spacing } from "@basestack/design-system/theme/common";

type Interval = "monthly" | "yearly";

interface CardProps {
  title: string;
  price: string | { monthly: string; yearly: string };
  button: string;
  description: string;
  listDescription?: string;
  list: Array<string>;
  isCustom?: boolean;
  isPopular?: boolean;
  onClick: () => void;
  interval: Interval;
}

const CardComp = ({
  title,
  price,
  button,
  description,
  onClick,
  list,
  listDescription,
  isCustom = false,
  isPopular = false,
  interval,
}: CardProps) => {
  const { spacing, colors, isDarkMode } = useTheme();
  const iconColor = isDarkMode ? colors.gray300 : colors.black;
  const popularIconColor = isDarkMode ? colors.blue300 : colors.primary;

  return (
    <Card>
      <Text size="xLarge" fontWeight={500}>
        {title}
      </Text>
      <PriceContainer>
        {!isCustom && (
          <FloatingLabel>
            <Text lineHeight="1" size="small" muted>
              From
            </Text>
          </FloatingLabel>
        )}
        <Text fontSize={rem("42px")} lineHeight="1" fontWeight={500}>
          {typeof price === "string" ? price : price[interval]}
          {!isCustom && (
            <Text as="span" lineHeight="1" size="small" ml="2px" muted>
              /month
            </Text>
          )}
        </Text>
      </PriceContainer>
      <Button
        onClick={onClick}
        fullWidth
        justifyContent="center"
        size={ButtonSize.Medium}
        variant={isPopular ? ButtonVariant.Primary : ButtonVariant.Outlined}
      >
        {button}
      </Button>
      <Text size="medium" fontWeight={400} mt={spacing.s5} muted>
        {description}
      </Text>
      <HorizontalRule my={spacing.s5} />
      {listDescription && (
        <Text size="medium" fontWeight={400} mb={spacing.s3}>
          {listDescription}
        </Text>
      )}
      <List>
        {list?.map((item, index) => (
          <ListItem key={index}>
            <Icon
              icon="check"
              size="medium"
              color={isPopular ? popularIconColor : iconColor}
            />
            <Text size="medium" fontWeight={400} ml={spacing.s3}>
              {item}
            </Text>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

interface PricingProps {
  title: string;
  text: string;
  items: Array<Omit<CardProps, "onClick">>;
}

const Pricing = ({ title, text, items }: PricingProps) => {
  const [selectedInterval, setSelectedInterval] = useState<Interval>("monthly");

  const onClick = useCallback(() => {
    // Do something
  }, []);

  return (
    <Container>
      <ContentContainer>
        <SectionHeader title={title} text={text} />
        <Segment
          selectedIndex={selectedInterval === "monthly" ? 0 : 1}
          onSelect={(interval) => setSelectedInterval(interval as Interval)}
          items={[
            { id: "monthly", text: "Pay monthly" },
            { id: "yearly", text: "Pay yearly", label: "save 20%" },
          ]}
          mb={spacing.s5}
        />
        <Cards>
          {items.map((item, index) => (
            <CardComp
              key={index}
              isCustom={item.isCustom}
              isPopular={item.isPopular}
              title={item.title}
              price={item.price}
              button={item.button}
              description={item.description}
              listDescription={item.listDescription}
              list={item.list}
              onClick={onClick}
              interval={selectedInterval}
            />
          ))}
        </Cards>
      </ContentContainer>
    </Container>
  );
};

export default Pricing;
