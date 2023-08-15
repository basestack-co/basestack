import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "styled-components";
import { useMedia } from "react-use";
// Utils
import { events } from "@basestack/utils";
// Components
import {
  CardContainer,
  CardsContainer,
  Container,
  ContentContainer,
  HeaderContainer,
  ImageContainer,
  SlideCardContainer,
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
  const theme = useTheme();
  const isMobile = useMedia(theme.device.max.md, false);
  const [currentImage, setCurrentImage] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const image = {
    src: data[currentImage].image.src,
    alt: data[currentImage].image.alt,
  };

  useEffect(() => {
    if (cardRef.current && isMobile) {
      cardRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest",
      });
    }
  }, [cardRef, currentImage, isMobile]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (currentImage + 1) % data.length;
      setCurrentImage(nextIndex);
    }, 10000);
    return () => clearInterval(intervalId);
  }, [currentImage, data]);

  return (
    <Container id={id}>
      <ContentContainer>
        <HeaderContainer>
          <SectionHeader title={title} text={text} />
        </HeaderContainer>
        <CardsContainer>
          {data?.map((item, index) => (
            <CardContainer
              key={index}
              ref={index === currentImage ? cardRef : null}
            >
              <SlideCardContainer>
                <SlideCard
                  isActive={index === currentImage}
                  icon={item.icon}
                  title={item.title}
                  text={item.text}
                  onClick={() => {
                    events.landing.slider(item.title, item.text);
                    setCurrentImage(index);
                  }}
                />
              </SlideCardContainer>
            </CardContainer>
          ))}
        </CardsContainer>
        <ImageContainer>
          <Image src={image.src} alt={image.alt} />
        </ImageContainer>
      </ContentContainer>
    </Container>
  );
};

export default Slider;
