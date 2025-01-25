import React, { useCallback } from "react";
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

interface CardProps {
  title: string;
  price: string;
  button: string;
  description: string;
  listDescription?: string;
  list: Array<string>;
  isCustom?: boolean;
  isPopular?: boolean;
  onClick: () => void;
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
          {price}
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
  const onClick = useCallback(() => {
    // Do something
  }, []);

  return (
    <Container>
      <ContentContainer>
        <SectionHeader title={title} text={text} />
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
            />
          ))}
        </Cards>
      </ContentContainer>
    </Container>
  );
};

export default Pricing;
