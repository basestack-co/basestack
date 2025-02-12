import React, { useState, useRef } from "react";
import { useTheme } from "styled-components";
import useEmblaCarousel from "embla-carousel-react";
import { useMedia } from "react-use";
// Utils
import { events } from "@basestack/utils";
// Components
import {
  Container,
  ContentContainer,
  HeaderContainer,
  Embla,
  EmblaViewport,
  EmblaContainer,
  EmblaSlide,
} from "./styles";
import SlideCard from "../SlideCard";
import Image from "../Image";
import SectionHeader from "../SectionHeader";

export interface SliderProps {
  id?: string;
  title: string;
  text: string;
  data: Array<{
    icon: string;
    title: string;
    text: string;
    image: { src: string; alt: string };
  }>;
}

const Slider = ({
  title,
  text,
  data,
  id = "features-section",
}: SliderProps) => {
  const { device } = useTheme();
  const isDesktop = useMedia(device.min.lg, true);
  const [currentImage, setCurrentImage] = useState(0);
  const [autoAnimateSlider, setAutoAnimateSlider] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [emblaRef] = useEmblaCarousel({
    active: !isDesktop,
    align: "start",
    slidesToScroll: 1,
  });

  const [emblaImagesRef] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
  });

  return (
    <Container ref={containerRef} id={id}>
      <ContentContainer>
        <HeaderContainer>
          <SectionHeader title={title} text={text} />
        </HeaderContainer>
        <Embla isImageSlider={false}>
          <EmblaViewport ref={emblaRef} isImageSlider={false}>
            <EmblaContainer>
              {data?.map((item, index) => (
                <EmblaSlide key={`card-${index}`} isImageSlider>
                  <SlideCard
                    isActive={index === currentImage && autoAnimateSlider}
                    icon={item.icon}
                    title={item.title}
                    text={item.text}
                    onClick={() => {
                      events.landing.slider(item.title, item.text);
                      setCurrentImage(index);
                    }}
                  />
                </EmblaSlide>
              ))}
            </EmblaContainer>
          </EmblaViewport>
        </Embla>

        <Embla isImageSlider>
          <EmblaViewport ref={emblaImagesRef} isImageSlider>
            <EmblaContainer>
              {data?.map((item, index) => (
                <EmblaSlide key={`image-${index}`} isImageSlider={false}>
                  <Image src={item.image.src} alt={item.image.alt} />
                </EmblaSlide>
              ))}
            </EmblaContainer>
          </EmblaViewport>
        </Embla>
      </ContentContainer>
    </Container>
  );
};

export default Slider;
