import { IconBox, Text } from "@basestack/design-system";
import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useRef } from "react";
import { useTheme } from "styled-components";
import SectionHeader from "../SectionHeader";
import { Card } from "../styles";
import {
  Container,
  ContentContainer,
  Embla,
  EmblaContainer,
  EmblaSlide,
  EmblaViewport,
  HeaderContainer,
} from "./styles";

export interface AutoSlidingCardsProps {
  id?: string;
  title: string;
  caption?: string;
  text?: string;
  cards: Array<{
    text: string;
    icon: string;
  }>;
}

const Cards = ({ title, text, cards, id, caption }: AutoSlidingCardsProps) => {
  const { spacing, colors, isDarkMode } = useTheme();
  const autoScrollPlugin = useRef<ReturnType<typeof AutoScroll> | null>(null);

  const iconBoxProps = isDarkMode
    ? {
        iconColor: colors.gray300,
        outlinedBg: colors.gray800,
        gradient: [
          colors.gray800,
          colors.gray600,
          colors.gray500,
          colors.gray800,
        ],
      }
    : {};

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: true,
      dragFree: true,
    },
    [
      AutoScroll({
        playOnInit: true,
        speed: 0.5,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ],
  );

  useEffect(() => {
    if (emblaApi) {
      const autoScroll = emblaApi?.plugins()?.autoScroll;
      autoScrollPlugin.current = autoScroll || null;
    }
  }, [emblaApi]);

  return (
    <Container id={id}>
      <ContentContainer>
        <HeaderContainer>
          <SectionHeader title={title} text={text} caption={caption} />
        </HeaderContainer>
        <Embla>
          <EmblaViewport ref={emblaRef}>
            <EmblaContainer>
              {cards?.map(({ icon, text }, index) => (
                <EmblaSlide key={index}>
                  <Card>
                    <IconBox icon={icon} mb={spacing.s5} {...iconBoxProps} />
                    <Text size="medium" fontWeight={400}>
                      {text}
                    </Text>
                  </Card>
                </EmblaSlide>
              ))}
            </EmblaContainer>
          </EmblaViewport>
        </Embla>
      </ContentContainer>
    </Container>
  );
};

export default Cards;
