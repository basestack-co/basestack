import React, { useState } from "react";
import dayjs from "dayjs";
// Server
import { trpc } from "libs/trpc";
// Components
import {
  useTransition,
  animated,
  config,
  useChain,
  useSpringRef,
} from "react-spring";
import {
  FlagCard,
  FlagRow,
  slideTop,
  ButtonVariant,
} from "@basestack/design-system";
// Store
import { setIstEditFlagModalOpen } from "contexts/modals/actions";
// Hooks
import useModals from "hooks/useModals";
// Types
import { SelectedView } from "types/flags";
// Styles
import { FlagsCardContainer, FlagsTableContainer } from "./styles";

const AnimatedFlagCard = animated(FlagCard);
const AnimatedFlagRow = animated(FlagRow);

interface FlagCardsProps {
  selectedView: SelectedView;
  projectSlug: string;
}

const transitionConfig = (show: boolean, length: number) => ({
  config: show ? { ...config.stiff, duration: 300 } : { duration: 300 },
  trail: length > 0 ? 400 / length : 0,
});

const FlagCards = ({ selectedView, projectSlug }: FlagCardsProps) => {
  const { dispatch } = useModals();

  const { data, isLoading } = trpc.useQuery([
    "flag.byProjectSlug",
    { projectSlug, pagination: null },
  ]);

  const [cardsDestroyed, setCardsAnimationEnd] = useState(false);
  const [tableDestroyed, setTableAnimationEnd] = useState(true);

  const showCards = selectedView === "cards";
  const showTable = selectedView === "table";

  const flags = !isLoading && data ? data.flags : [];

  const transitionCardsRef = useSpringRef();
  const transitionCards = useTransition(
    showCards && tableDestroyed ? flags : [],
    {
      ref: transitionCardsRef,
      ...transitionConfig(showCards, flags.length),
      ...slideTop,
      onDestroyed: () => {
        setCardsAnimationEnd(true);
        setTableAnimationEnd(false);
      },
    }
  );

  const transitionTableRef = useSpringRef();
  const transitionTable = useTransition(
    showTable && cardsDestroyed ? flags : [],
    {
      ref: transitionTableRef,
      ...transitionConfig(showTable, flags.length),
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!flags.length) {
    return <div>No Flags</div>;
  }

  return (
    <>
      <FlagsCardContainer>
        {transitionCards(
          (styles, flag, _, index) =>
            flag && (
              <AnimatedFlagCard
                style={styles}
                zIndex={flags.length - index}
                title={flag.slug}
                description={flag.description}
                environments={flag.environments}
                date={`Created ${dayjs(flag.createdAt).format("DD/MM/YYYY")}`}
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
                zIndex={flags.length - index}
                title={flag.slug}
                description={flag.description}
                environments={flag.environments}
                date={`Created ${dayjs(flag.createdAt).format("DD/MM/YYYY")}`}
                popupItems={popupItems}
              />
            )
        )}
      </FlagsTableContainer>
    </>
  );
};

export default FlagCards;
