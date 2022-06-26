import React, { useState } from "react";
import {
  FlagCard,
  FlagRow,
  Text,
  Toolbar,
  slideTop,
} from "@basestack/design-system";
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
const AnimatedFlagRow = animated(FlagRow);

const Flags = () => {
  const theme = useTheme();
  const [data, setData] = useState(mockFlags);
  const [selectedEnvironment, setSelectedEnvironment] = useState("all");

  const [selectedView, setSelectedView] = useState("cards");
  const [cardsDestroyed, setCardsAnimationEnd] = useState(false);
  const [tableDestroyed, setTableAnimationEnd] = useState(true);

  const showCards = selectedView === "cards";
  const showTable = selectedView === "table";

  const transitionCardsRef = useSpringRef();
  const transitionCards = useTransition(
    showCards && tableDestroyed ? data : [],
    {
      ref: transitionCardsRef,
      config: showCards
        ? { ...config.stiff, duration: 300 }
        : { duration: 300 },
      trail: 400 / data.length,
      ...slideTop,
      onDestroyed: () => {
        setCardsAnimationEnd(true);
        setTableAnimationEnd(false);
      },
    }
  );

  const transitionTableRef = useSpringRef();
  const transitionTable = useTransition(
    showTable && cardsDestroyed ? data : [],
    {
      ref: transitionTableRef,
      config: showTable
        ? { ...config.stiff, duration: 300 }
        : { duration: 300 },
      trail: 400 / data.length,
      ...slideTop,
      onDestroyed: () => {
        setTableAnimationEnd(true);
        setCardsAnimationEnd(false);
      },
    }
  );

  useChain(
    cardsDestroyed
      ? [transitionTableRef, transitionCardsRef]
      : [transitionCardsRef, transitionTableRef]
  );

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
          (styles, flag, _, index) =>
            flag && (
              <AnimatedFlagCard
                style={styles}
                zIndex={data.length - index}
                title={flag.title}
                description={flag.description}
                environments={flag.environments}
                date={flag.date}
                popupItems={[
                  { text: "Edit", onClick: () => console.log("") },
                  { text: "History", onClick: () => console.log("") },
                  { text: "Delete", onClick: () => console.log("") },
                ]}
              />
            )
        )}
      </FlagsCardContainer>
      <FlagsTableContainer>
        {transitionTable(
          (styles, flag, _, index) =>
            flag && (
              <AnimatedFlagRow
                style={styles}
                zIndex={data.length - index}
                title={flag.title}
                description={flag.description}
                environments={flag.environments}
                date={flag.date}
                popupItems={[
                  { text: "Edit", onClick: () => console.log("") },
                  { text: "History", onClick: () => console.log("") },
                  { text: "Delete", onClick: () => console.log("") },
                ]}
              />
            )
        )}
      </FlagsTableContainer>
    </Container>
  );
};

export default Flags;
