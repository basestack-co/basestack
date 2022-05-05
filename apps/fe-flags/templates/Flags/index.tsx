import React, { useState, useEffect } from "react";
import { FlagCard, Text, Toolbar } from "design-system";
import { Container, FlagsCardContainer, FlagsTableContainer } from "./styles";
import { useTheme } from "styled-components";
import { mockFlags } from "./mockData";

import {
  useTransition,
  animated,
  config,
  useChain,
  useSpringRef,
} from "react-spring";

const AnimatedFlagCard = animated(FlagCard);

const Flags = () => {
  const theme = useTheme();
  const [data, setData] = useState(mockFlags);
  const [selectedEnvironment, setSelectedEnvironment] = useState("all");
  const [selectedView, setSelectedView] = useState("cards");

  console.log("data = ", data);

  useEffect(() => {
    if (selectedEnvironment !== "all") {
    }
  }, [selectedEnvironment]);

  const showCards = selectedView === "cards";
  const showTable = selectedView === "table";

  const transitionsProps = {
    from: { opacity: 0, transform: `translate3d(0px, 10px, 0px)` },
    enter: { opacity: 1, transform: `translate3d(0px, 0px, 0px)` },
    leave: { opacity: 0, transform: `translate3d(0px, 10px, 0px)` },
  };

  const transitionCardsRef = useSpringRef();
  const transitionCards = useTransition(showCards ? mockFlags : [], {
    ref: transitionCardsRef,
    config: showCards ? { ...config.stiff, duration: 300 } : { duration: 300 },
    trail: 400 / mockFlags.length,
    ...transitionsProps,
  });

  const transitionTableRef = useSpringRef();
  const transitionTable = useTransition(showTable ? mockFlags : [], {
    ref: transitionTableRef,
    config: showTable ? { ...config.stiff, duration: 300 } : { duration: 300 },
    trail: 400 / mockFlags.length,
    ...transitionsProps,
  });

  useChain([transitionCardsRef, transitionTableRef]);

  return (
    <Container>
      <Text size="xLarge">Flags</Text>
      <Toolbar
        onChangeView={(selected) => setSelectedView(selected)}
        my={theme.spacing.s5}
        onSearch={(event) => console.log(event.target.value)}
        environments={["Development", "Staging", "Production"]}
        onSelect={(environment) => setSelectedEnvironment(environment)}
      />
      <FlagsCardContainer>
        {transitionCards(
          (styles, flag) =>
            flag && (
              <AnimatedFlagCard
                style={styles}
                title={flag.title}
                description={flag.description}
                environments={flag.environments}
                date={flag.date}
              />
            )
        )}
      </FlagsCardContainer>
      <FlagsTableContainer>
        {transitionTable(
          (styles, flag) =>
            flag &&
            showTable && (
              <animated.div style={styles}>
                <h1>Animated</h1>
              </animated.div>
            )
        )}
      </FlagsTableContainer>
    </Container>
  );
};

export default Flags;
