import React, { forwardRef } from "react";
import { useTheme } from "styled-components";
import { useMedia } from "react-use";
// Components
import { Embla, EmblaViewport, EmblaContainer, EmblaSlide } from "./styles";
import Card from "../Card";

export interface CardSliderProps {
  data: Array<{
    icon: string;
    title: string;
    text: string;
    image: { src: string; alt: string };
  }>;
  onClick: (index: number) => void;
  currentIndex: number;
}

const CardSlider = forwardRef<HTMLDivElement, CardSliderProps>(
  ({ data, onClick, currentIndex }, ref) => {
    const { device } = useTheme();
    const isMobile = useMedia(device.max.sm, false);

    return (
      <Embla>
        <EmblaViewport ref={ref}>
          <EmblaContainer>
            {data?.map((item, index) => (
              <EmblaSlide key={`card-${index}`}>
                <Card
                  isActive={index === currentIndex}
                  icon={item.icon}
                  title={item.title}
                  description={item.text}
                  onClick={() => onClick(index)}
                />
              </EmblaSlide>
            ))}
          </EmblaContainer>
        </EmblaViewport>
      </Embla>
    );
  },
);

CardSlider.displayName = "CardSlider";

export default CardSlider;
