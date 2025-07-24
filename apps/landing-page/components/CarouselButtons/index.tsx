import { IconButton } from "@basestack/design-system";
import { EmblaCarouselType } from "embla-carousel";
import React, { useCallback, useEffect, useState } from "react";
import {
  ButtonsContainer,
  Container,
  Placeholder,
  Progress,
  ProgressBar,
} from "./styles";

interface CarouselButtonsProps {
  emblaApi?: EmblaCarouselType;
  hasMarginTop?: boolean;
}

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void,
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

const CarouselButtons = ({
  emblaApi,
  hasMarginTop = false,
}: CarouselButtonsProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress * 100);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onScroll(emblaApi);
    emblaApi
      .on("reInit", onScroll)
      .on("scroll", onScroll)
      .on("slideFocus", onScroll);
  }, [emblaApi, onScroll]);

  if (prevBtnDisabled && nextBtnDisabled) {
    return null;
  }

  return (
    <Container hasMarginTop={hasMarginTop}>
      <Placeholder />
      <Progress>
        <ProgressBar
          style={{ transform: `translate3d(${scrollProgress}%,0px,0px)` }}
        />
      </Progress>
      <ButtonsContainer>
        <IconButton
          icon="arrow_back"
          onClick={onPrevButtonClick}
          isDisabled={prevBtnDisabled}
          variant="secondary"
        />
        <IconButton
          icon="arrow_forward"
          onClick={onNextButtonClick}
          isDisabled={nextBtnDisabled}
          variant="secondary"
        />
      </ButtonsContainer>
    </Container>
  );
};

export default CarouselButtons;
