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
import { ReactIcon, JavascriptIcon, JsonIcon } from "./icons";
import { Card } from "../styles";

export interface Props {
  id?: string;
}

const data = [
  {
    icon: ReactIcon,
    title: "React",
    description: "Lorem ipsum dolor sit amet",
    button: "Install now",
  },
  {
    icon: JavascriptIcon,
    title: "Javascript",
    description: "Lorem ipsum dolor sit amet",
    button: "Install now",
  },
  {
    icon: JsonIcon,
    title: "Rest API",
    description: "Lorem ipsum dolor sit amet",
    button: "Install now",
  },
];

export interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  button: string;
  onClick: () => void;
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

const Code = ({ id = "code" }: Props) => {
  const { device } = useTheme();
  const isDesktop = useMedia(device.min.lg, true);

  const [emblaRef] = useEmblaCarousel({
    active: !isDesktop,
    align: "start",
    slidesToScroll: 1,
  });

  return (
    <Container id={id}>
      <ContentContainer>
        <HeaderContainer>
          <SectionHeader
            title="Explore our SDK Options"
            text="Discover our supported SDKs tailored to meet your development needs, enabling faster releases. Explore our comprehensive documentation for more in-depth information and guidance."
          />
        </HeaderContainer>
        <Embla>
          <EmblaViewport ref={emblaRef}>
            <EmblaContainer>
              {data.map((item, index) => {
                const LanguageIcon = item.icon;
                return (
                  <EmblaSlide key={index}>
                    <CardComp
                      title={item.title}
                      description={item.description}
                      button={item.button}
                      icon={<LanguageIcon />}
                      onClick={() => console.log("")}
                    />
                  </EmblaSlide>
                );
              })}
            </EmblaContainer>
          </EmblaViewport>
        </Embla>
      </ContentContainer>
    </Container>
  );
};

export default Code;
