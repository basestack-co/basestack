import React from "react";
import { rem } from "polished";
import {
  Box,
  Button,
  ButtonSize,
  Flex,
  Icon,
  Text,
  RangeSelector,
} from "@basestack/design-system";
import { useTheme } from "styled-components";
import SectionHeader from "../SectionHeader";
import {
  Container,
  ContentContainer,
  Grid,
  HeaderContainer,
  LeftContent,
} from "./styles";
import { Card } from "../styles";

interface PricingUsageProps {
  id?: string;
  title: string;
  caption?: string;
  text: string;
  card: {
    title: string;
    label: string;
    items: Array<string>;
    button: {
      onClick: () => void;
      text: string;
    };
    footer: string;
  };
}

const PricingUsage = ({
  title,
  caption,
  text,
  id,
  card,
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
              <Box>
                <Text size="large" fontWeight={500} mb={spacing.s3}>
                  How many monthly page views do you have?
                </Text>

                <RangeSelector
                  id="requests"
                  name="requests"
                  min="10000"
                  max="30000"
                  initialValue={10000}
                />
              </Box>

              <Box>
                <Text size="large" fontWeight={500} mb={spacing.s3}>
                  How many money do you have?
                </Text>

                <RangeSelector
                  id="requests"
                  name="requests"
                  min="10000"
                  max="30000"
                  initialValue={10000}
                />
              </Box>
            </Flex>
          </LeftContent>

          <Card>
            <Text size="large" mb={spacing.s4}>
              {card.title}
            </Text>
            <Flex alignItems="center" gap={spacing.s2}>
              <Text
                fontSize={rem("32px")}
                lineHeight="1.2"
                fontWeight={500}
                flexShrink={0}
              >
                $5
              </Text>
              <Text muted>{card.label}</Text>
            </Flex>
            <Box mt={spacing.s4} mb={spacing.s6}>
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
              <Flex flexDirection="column" alignItems="center" gap={spacing.s2}>
                <Button
                  onClick={card.button.onClick}
                  fullWidth
                  justifyContent="center"
                  size={ButtonSize.Medium}
                >
                  {card.button.text}
                </Button>
                <Text muted>{card.footer}</Text>
              </Flex>
            </Box>
          </Card>
        </Grid>
      </ContentContainer>
    </Container>
  );
};

export default PricingUsage;
