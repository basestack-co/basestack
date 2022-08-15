import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@basestack/hooks";
import {
  FlagCard,
  FlagRow,
  Text,
  Toolbar,
  slideTop,
  ButtonVariant,
} from "@basestack/design-system";
import { setIstEditFlagModalOpen } from "contexts/modals/actions";
import useModals from "hooks/useModals";
import { useTheme } from "styled-components";
import { FlagsCardContainer, FlagsTableContainer } from "./styles";
import { Container } from "../styles";
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
  const { dispatch } = useModals();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.device.min.lg);
  const [data, setData] = useState(mockFlags);
  const [selectedEnvironment, setSelectedEnvironment] = useState("all");

  const [selectedView, setSelectedView] = useState("cards");
  const [cardsDestroyed, setCardsAnimationEnd] = useState(false);
  const [tableDestroyed, setTableAnimationEnd] = useState(true);

  useEffect(() => {
    if (!isDesktop) {
      setSelectedView("cards");
    }
  }, [isDesktop]);

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

  const popupItems = [
    {
      icon: "edit",
      text: "Edit",
      onClick: () => dispatch(setIstEditFlagModalOpen(true)),
    },
    {
      icon: "history",
      text: "History",
      onClick: () => dispatch(setIstEditFlagModalOpen(true)),
    },
    {
      icon: "delete",
      text: "Delete",
      variant: ButtonVariant.Danger,
      onClick: () => console.log(""),
    },
  ];

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
                popupItems={popupItems}
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
                popupItems={popupItems}
              />
            )
        )}
      </FlagsTableContainer>
    </Container>
  );
};

export default Flags;
