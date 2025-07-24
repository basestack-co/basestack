import {
  Box,
  Button,
  ButtonSize,
  Flex,
  HorizontalRule,
  Icon,
  RangeSelector,
  Text,
} from "@basestack/design-system";
import { rem } from "polished";
import React from "react";
import { useTheme } from "styled-components";
import SectionHeader from "../SectionHeader";
import { Card } from "../styles";
import {
  Amount,
  Container,
  ContentContainer,
  Grid,
  HeaderContainer,
  LeftContent,
} from "./styles";

interface Slider {
  id: string;
  title: string;
  description: string;
  min: string;
  max: string;
  initialValue: number;
  costUnit: string;
  onChange: (id: string, value: number) => void;
}

interface Card {
  title: string;
  label: string;
  amount: string;
  items: Array<string>;
  button: {
    onClick: () => void;
    text: string;
  };
  footer: string;
}

interface PricingUsageProps {
  id?: string;
  title: string;
  caption?: string;
  text: string;
  card: Card;
  sliders: Slider[];
}

const PricingUsage = ({
  title,
  caption,
  text,
  id,
  card,
  sliders,
}: PricingUsageProps) => {
  const { isDarkMode, spacing, colors } = useTheme();

  return (
    <Container id={id}>
      <ContentContainer>
        <HeaderContainer>
          <SectionHeader
            title={title}
            text={text}
            caption={caption}
            textMaxWidth={60}
          />
        </HeaderContainer>
        <Grid>
          <LeftContent>
            <Flex flexDirection="column" gap={spacing.s8}>
              {sliders.map((slider) => (
                <Box key={slider.id}>
                  <Text size="large" fontWeight={500} mb={spacing.s3}>
                    {slider.title}
                  </Text>
                  <RangeSelector
                    id={slider.id}
                    name={slider.id}
                    min={slider.min}
                    max={slider.max}
                    initialValue={slider.initialValue}
                    onChange={slider.onChange}
                    label={slider.costUnit}
                  />
                </Box>
              ))}
            </Flex>
          </LeftContent>

          <Card>
            <Text size="large">{card.title}</Text>

            <Box mt={spacing.s6}>
              <Amount fontSize={rem("38px")} lineHeight="1.2" fontWeight={500}>
                {card.amount}
              </Amount>
              <Text muted mt={spacing.s1}>
                {card.label}
              </Text>
            </Box>

            <HorizontalRule my={spacing.s6} />
            <Box mb={spacing.s6}>
              <Flex flexDirection="column" as="ul" gap={spacing.s4}>
                {card.items?.map((item, index) => (
                  <Flex
                    key={index}
                    alignItems="center"
                    as="li"
                    gap={spacing.s3}
                  >
                    <Icon
                      icon="check"
                      size="medium"
                      color={isDarkMode ? colors.blue300 : colors.primary}
                    />
                    <Text size="medium" fontWeight={400}>
                      {item}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            </Box>

            <Box mt="auto">
              <Flex flexDirection="column" alignItems="center" gap={spacing.s3}>
                <Button
                  onClick={card.button.onClick}
                  fullWidth
                  justifyContent="center"
                  size={ButtonSize.Medium}
                >
                  {card.button.text}
                </Button>
                <Text size="xSmall" lineHeight={rem("16px")} muted>
                  {card.footer}
                </Text>
              </Flex>
            </Box>
          </Card>
        </Grid>
      </ContentContainer>
    </Container>
  );
};

export default PricingUsage;
