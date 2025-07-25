import { Button, ButtonSize, ButtonVariant } from "@basestack/design-system";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import { useMedia } from "react-use";
import { useTheme } from "styled-components";
import CarouselButtons from "../CarouselButtons";
import SectionHeader, { type SectionHeaderProps } from "../SectionHeader";
import Card, { type CardProps } from "./Card";
import {
  ButtonsContainer,
  Container,
  ContentContainer,
  Embla,
  EmblaContainer,
  EmblaSlide,
  EmblaViewport,
  HeaderContainer,
  Indicator,
  Indicators,
} from "./styles";

export interface VerticalCardsProps {
  id?: string;
  cards: Array<CardProps>;
  header: Omit<SectionHeaderProps, "hasMarginBottom">;
  actions?: Array<{
    id: string;
    text: string;
    onClick: () => void;
    isTertiary?: boolean;
  }>;
}

const VerticalCards = ({ cards, id, actions, header }: VerticalCardsProps) => {
  const { device, isDarkMode, colors } = useTheme();
  const isDesktop = useMedia(device.min.lg, true);
  const isMobile = useMedia(device.max.sm, false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    active: !isDesktop,
    align: "start",
    slidesToScroll: 1,
  });

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => {
        const currentIndex = emblaApi.selectedScrollSnap();
        setActiveSlide(currentIndex);
      };

      emblaApi.on("select", onSelect);

      return () => emblaApi.off("select", onSelect);
    }

    return () => {};
  }, [emblaApi]);

  const indicatorColors = [colors.blue400, colors.yellow400, colors.green400];

  return (
    <Container id={id}>
      <ContentContainer>
        <HeaderContainer>
          <SectionHeader {...header} hasMarginBottom={false} />
          <ButtonsContainer>
            {actions?.map(({ id, text, onClick, isTertiary }) => {
              return (
                <Button
                  key={id}
                  justifyContent="center"
                  onClick={onClick}
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
            <Indicator
              color={isMobile ? indicatorColors[activeSlide] : colors.blue400}
            />
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
        <CarouselButtons emblaApi={emblaApi} />
      </ContentContainer>
    </Container>
  );
};

export default VerticalCards;
