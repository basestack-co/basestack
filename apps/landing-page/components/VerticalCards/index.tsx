import React from "react";
import { useTheme } from "styled-components";
import useEmblaCarousel from "embla-carousel-react";
import { Button, ButtonSize, ButtonVariant } from "@basestack/design-system";
import { events } from "@basestack/utils";
import { useMedia } from "react-use";
import Card, { CardProps } from "./Card";
import {
  Container,
  ContentContainer,
  Embla,
  EmblaViewport,
  EmblaSlide,
  EmblaContainer,
  HeaderContainer,
  ButtonsContainer,
  Indicator,
  Indicators,
} from "./styles";
import SectionHeader, { SectionHeaderProps } from "../SectionHeader";

export interface VerticalCardsProps {
  id?: string;
  cards: Array<CardProps>;
  header: Omit<SectionHeaderProps, "hasMarginBottom">;
  actions?: Array<{
    id: string;
    text: string;
    href: string;
    isTertiary?: boolean;
  }>;
}

const VerticalCards = ({ cards, id, actions, header }: VerticalCardsProps) => {
  const { device, isDarkMode, colors } = useTheme();
  const isDesktop = useMedia(device.min.lg, true);
  const isMobile = useMedia(device.max.sm, false);

  const [emblaRef] = useEmblaCarousel({
    active: !isDesktop,
    align: "start",
    slidesToScroll: 1,
  });

  return (
    <Container id={id}>
      <ContentContainer>
        <HeaderContainer>
          <SectionHeader {...header} hasMarginBottom={false} />
          <ButtonsContainer>
            {actions?.map(({ id, text, href, isTertiary }) => {
              return (
                <Button
                  key={id}
                  justifyContent="center"
                  fullWidth={isMobile}
                  onClick={() => {
                    events.landing.deploy(`Click on ${text}`);
                    if (typeof window !== "undefined") {
                      window.open(href, "_blank");
                    }
                  }}
                  size={ButtonSize.Medium}
                  {...(isTertiary
                    ? {
                        variant: isDarkMode
                          ? ButtonVariant.Tertiary
                          : ButtonVariant.Secondary,
                      }
                    : {})}
                >
                  {text}
                </Button>
              );
            })}
          </ButtonsContainer>
        </HeaderContainer>
        <Embla>
          <Indicators>
            <Indicator color={colors.blue400} />
            <Indicator color={colors.yellow400} />
            <Indicator color={colors.green400} />
          </Indicators>
          <EmblaViewport ref={emblaRef}>
            <EmblaContainer>
              {cards?.map((card, index) => (
                <EmblaSlide key={index}>
                  <Card {...card} />
                </EmblaSlide>
              ))}
            </EmblaContainer>
          </EmblaViewport>
        </Embla>
      </ContentContainer>
    </Container>
  );
};

export default VerticalCards;
