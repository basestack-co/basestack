import React, { useCallback, useRef, useEffect } from "react";
import { useTheme } from "styled-components";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  Avatar,
  Card,
  HorizontalRule,
  Icon,
  Text,
} from "@basestack/design-system";
import {
  Container,
  Embla,
  EmblaContainer,
  EmblaSlide,
  EmblaViewport,
  Box,
  Row,
  ProjectCardContainer,
} from "./styles";

const ProjectCard = ({ text, flags = 0 }: { text: string; flags: number }) => {
  const theme = useTheme();
  return (
    <ProjectCardContainer>
      <Card height="100%" width="100%">
        <Box mb="auto" p={theme.spacing.s5}>
          <Avatar
            size="xSmall"
            userName={text}
            alt={`${text} project`}
            round={false}
          />
          <Text size="small" textAlign="left" mt={theme.spacing.s3}>
            {text}
          </Text>
        </Box>
        <HorizontalRule />
        <Box p={`${theme.spacing.s3} ${theme.spacing.s5}`}>
          <Row>
            <Icon icon="flag" size="small" />
            <Text size="small" textAlign="left" ml={theme.spacing.s1}>
              {flags}
            </Text>
          </Row>
        </Box>
      </Card>
    </ProjectCardContainer>
  );
};

const data = [
  { title: "Mobile App", flags: 12 },
  { title: "Desktop App", flags: 4 },
  { title: "Web App", flags: 134 },
  { title: "Backend Services", flags: 6 },
  { title: "APIs", flags: 3 },
  { title: "CLI Tools", flags: 1 },
];

const FlagsCardSlider = () => {
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

  const handleMouseEnter = useCallback(() => {
    autoScrollPlugin.current?.stop();
  }, []);

  const handleMouseLeave = useCallback(() => {
    autoScrollPlugin.current?.play();
  }, []);

  return (
    <Container>
      <Embla onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <EmblaViewport ref={emblaRef}>
          <EmblaContainer>
            {data.map((item, index) => (
              <EmblaSlide key={index}>
                <ProjectCard text={item.title} flags={item.flags} />
              </EmblaSlide>
            ))}
          </EmblaContainer>
        </EmblaViewport>
      </Embla>
    </Container>
  );
};

export default FlagsCardSlider;
