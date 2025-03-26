import React from "react";
import { useTheme } from "styled-components";
import { useMedia } from "react-use";
import useEmblaCarousel from "embla-carousel-react";
// Components
import {
  Text,
  ButtonVariant,
  Button,
  ButtonSize,
} from "@basestack/design-system";
import SectionHeader from "../SectionHeader";
import {
  Container,
  ContentContainer,
  Embla,
  EmblaContainer,
  EmblaViewport,
  EmblaSlide,
  HeaderContainer,
  CardContent,
} from "./styles";
import { Card } from "../styles";
import CarouselButtons from "../CarouselButtons";

export interface CardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  button: string;
  onClick: () => void;
}

export interface Props {
  id?: string;
  title: string;
  description: string;
  data: CardProps[];
}

const CardComp = ({ icon, title, description, button, onClick }: CardProps) => {
  const { spacing } = useTheme();

  return (
    <Card>
      <CardContent>
        {icon}
        <Text size="large" mt={spacing.s5}>
          {title}
        </Text>
        <Text size="medium" mt={spacing.s1} fontWeight={400} muted>
          {description}
        </Text>
        <Button
          onClick={onClick}
          mt={spacing.s5}
          variant={ButtonVariant.Outlined}
          fullWidth
          justifyContent="center"
          size={ButtonSize.Medium}
        >
          {button}
        </Button>
      </CardContent>
    </Card>
  );
};

const Code = ({ id, title, description, data }: Props) => {
  const { device } = useTheme();
  const isDesktop = useMedia(device.min.lg, true);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    active: !isDesktop,
    align: "start",
    slidesToScroll: 1,
  });

  return (
    <Container id={id}>
      <ContentContainer>
        <HeaderContainer>
          <SectionHeader title={title} text={description} />
        </HeaderContainer>
        <Embla>
          <EmblaViewport ref={emblaRef}>
            <EmblaContainer>
              {data.map((item, index) => {
                return (
                  <EmblaSlide key={index}>
                    <CardComp
                      title={item.title}
                      description={item.description}
                      button={item.button}
                      icon={item.icon}
                      onClick={item.onClick}
                    />
                  </EmblaSlide>
                );
              })}
            </EmblaContainer>
          </EmblaViewport>
        </Embla>
        <CarouselButtons emblaApi={emblaApi} hasMarginTop />
      </ContentContainer>
    </Container>
  );
};

export default Code;
