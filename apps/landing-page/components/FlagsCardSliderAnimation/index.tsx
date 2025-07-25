import { ProjectCard } from "@basestack/ui";
import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useRef } from "react";
import {
  Container,
  Embla,
  EmblaContainer,
  EmblaSlide,
  EmblaViewport,
} from "./styles";

const data = [
  { title: "Mobile App", flags: 12 },
  { title: "Desktop App", flags: 4 },
  { title: "Web App", flags: 134 },
  { title: "Backend Services", flags: 6 },
  { title: "APIs", flags: 3 },
  { title: "CLI Tools", flags: 1 },
];

const FlagsCardSliderAnimation = () => {
  const autoScrollPlugin = useRef<ReturnType<typeof AutoScroll> | null>(null);

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
    <Container>
      <Embla>
        <EmblaViewport ref={emblaRef}>
          <EmblaContainer>
            {data.map((item, index) => (
              <EmblaSlide key={index}>
                {/*@ts-ignore*/}
                <ProjectCard text={item.title} flags={item.flags} />
              </EmblaSlide>
            ))}
          </EmblaContainer>
        </EmblaViewport>
      </Embla>
    </Container>
  );
};

export default FlagsCardSliderAnimation;
