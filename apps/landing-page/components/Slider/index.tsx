import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMedia } from "react-use";
import { useTheme } from "styled-components";
import Image from "../Image";
import SectionHeader from "../SectionHeader";
import SlideCard from "../SlideCard";
// Components
import {
  Container,
  ContentContainer,
  Embla,
  EmblaContainer,
  EmblaSlide,
  EmblaViewport,
  HeaderContainer,
} from "./styles";

export interface SliderProps {
  id?: string;
  title: string;
  caption?: string;
  text: string;
  data: Array<{
    icon: string;
    title: string;
    text: string;
    image: { src: string; alt: string };
  }>;
}

const ANIMATION_TIME = 20000;

const Slider = ({ title, text, data, id, caption }: SliderProps) => {
  const { device } = useTheme();
  const isDesktop = useMedia(device.min.lg, true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    active: !isDesktop,
    align: "start",
    slidesToScroll: 1,
  });

  const [emblaImagesRef, emblaImagesApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
  });

  // Scroll to the selected slide when clicking on a card
  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
      if (emblaImagesApi) emblaImagesApi.scrollTo(index);
      setCurrentIndex(index);
    },
    [emblaApi, emblaImagesApi],
  );

  // Update the active index when dragging
  useEffect(() => {
    if (!emblaImagesApi) return;

    const onSelect = () => {
      setCurrentIndex(emblaImagesApi.selectedScrollSnap());
      if (emblaApi) emblaApi.scrollTo(emblaImagesApi.selectedScrollSnap());
    };

    emblaImagesApi?.on("select", onSelect);
    onSelect();

    return () => {
      emblaImagesApi?.off("select", onSelect);
    };
  }, [emblaImagesApi, emblaApi]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (emblaApi) {
        const nextIndex = (currentIndex + 1) % data.length;
        scrollTo(nextIndex);
      }
    }, ANIMATION_TIME);

    return () => clearInterval(interval);
  }, [emblaApi, currentIndex, data.length, scrollTo]);

  return (
    <Container ref={containerRef} id={id}>
      <ContentContainer>
        <HeaderContainer>
          <SectionHeader title={title} text={text} caption={caption} />
        </HeaderContainer>
        <Embla isImageSlider={false}>
          <EmblaViewport ref={emblaRef} isImageSlider={false}>
            <EmblaContainer>
              {data?.map((item, index) => (
                <EmblaSlide key={`card-${index}`} isImageSlider={false}>
                  <SlideCard
                    isActive={index === currentIndex}
                    icon={item.icon}
                    title={item.title}
                    text={item.text}
                    animationTime={ANIMATION_TIME}
                    onClick={() => {
                      scrollTo(index);
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
                <EmblaSlide key={`image-${index}`} isImageSlider>
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
