import React, { useState, useEffect } from "react";
// Components
import { CardsContainer, Container, ContentContainer } from "./styles";
import SlideCard from "../SlideCard";
import Image from "../Image";
import SectionHeader from "../SectionHeader";

export interface SliderProps {
  title: string;
  text: string;
  data: Array<{
    icon: string;
    title: string;
    text: string;
    image: { src: string; alt: string };
  }>;
}

const Slider = ({ title, text, data }: SliderProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  const image = {
    src: data[currentImage].image.src,
    alt: data[currentImage].image.alt,
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (currentImage + 1) % data.length;
      setCurrentImage(nextIndex);
    }, 10000);
    return () => clearInterval(intervalId);
  }, [currentImage, data]);

  return (
    <Container>
      <ContentContainer>
        <SectionHeader title={title} text={text} />
        <CardsContainer>
          {data?.map((item, index) => (
            <SlideCard
              key={index}
              isActive={index === currentImage}
              icon={item.icon}
              title={item.title}
              text={item.text}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </CardsContainer>
        <Image src={image.src} alt={image.alt} />
      </ContentContainer>
    </Container>
  );
};

export default Slider;
