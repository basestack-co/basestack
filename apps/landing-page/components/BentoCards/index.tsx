import { HistoryCardProps } from "@basestack/ui";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import AccessLabelsAnimation from "../AccessLabelsAnimation";
import ActivityCardsAnimation from "../ActivityCardsAnimation";
import CodeAnimation from "../CodeAnimation";
import EnvironmentToggleAnimation from "../EnvironmentToggleAnimation";
import FlagsCardSliderAnimation from "../FlagsCardSliderAnimation";
import SectionHeader from "../SectionHeader";
import Card from "./Card";
import { Container, ContentContainer, Grid, HeaderContainer } from "./styles";

type Component =
  | "flagsCardSliderAnimation"
  | "environmentToggleAnimation"
  | "activityCardsAnimation"
  | "codeAnimation"
  | "accessLabelsAnimation";

export interface CardsProps {
  id?: string;
  title: string;
  text?: string;
  caption?: string;
  cards: Array<{
    title: string;
    text: string;
    component?: Component;
    image?: {
      src: string;
      alt: string;
    };
  }>;
}

const randomizeEnvironments = () => {
  return [
    { name: "develop", enabled: true },
    { name: "staging", enabled: Math.random() > 0.5 },
    { name: "production", enabled: Math.random() > 0.5 },
  ];
};

const BentoCards = ({ title, text, cards, id, caption }: CardsProps) => {
  const [randomEnvs, setRandomEnvs] = useState<
    HistoryCardProps["environments"]
  >([
    { name: "develop", enabled: true },
    { name: "staging", enabled: false },
    { name: "production", enabled: false },
  ]);

  const onHandleEnvironmentChange = useCallback(
    (updatedEnv: { name: string; enabled: boolean }) => {
      setRandomEnvs((prevEnvs) =>
        prevEnvs.map((env) =>
          env.name === updatedEnv.name
            ? { ...env, enabled: updatedEnv.enabled }
            : env,
        ),
      );
    },
    [],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomEnvs(randomizeEnvironments());
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const componentMap = useMemo(
    () => ({
      flagsCardSliderAnimation: <FlagsCardSliderAnimation />,
      environmentToggleAnimation: (
        <EnvironmentToggleAnimation
          environments={randomEnvs}
          onChange={onHandleEnvironmentChange}
        />
      ),
      activityCardsAnimation: (
        <ActivityCardsAnimation environments={randomEnvs} />
      ),
      codeAnimation: <CodeAnimation />,
      accessLabelsAnimation: <AccessLabelsAnimation />,
    }),
    [randomEnvs, onHandleEnvironmentChange],
  );

  return (
    <Container id={id}>
      <ContentContainer>
        <HeaderContainer>
          <SectionHeader title={title} text={text} caption={caption} />
        </HeaderContainer>
        <Grid>
          {cards?.map((item, index) => {
            const component = item.component
              ? componentMap[item.component]
              : null;

            return <Card key={index} {...item} component={component} />;
          })}
        </Grid>
      </ContentContainer>
    </Container>
  );
};

export default BentoCards;
