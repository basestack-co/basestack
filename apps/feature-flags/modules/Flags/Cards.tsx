import React from "react";
import dayjs from "dayjs";
// Server
import { trpc } from "libs/trpc";
// Components
import { FlagCard, FlagRow, ButtonVariant } from "@basestack/design-system";
// Store
import { setIsUpdateFlagModalOpen } from "contexts/modals/actions";
// Hooks
import useModals from "hooks/useModals";
// Types
import { SelectedView } from "types/flags";
// Styles
import { FlagsCardContainer, FlagsTableContainer } from "./styles";

interface FlagCardsProps {
  selectedView: SelectedView;
  projectSlug: string;
}

const FlagCards = ({ selectedView, projectSlug }: FlagCardsProps) => {
  const { dispatch } = useModals();

  const { data, isLoading } = trpc.flag.byProjectSlug.useQuery({
    projectSlug,
    pagination: null,
  });

  const flags = !isLoading && data ? data.flags : [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!flags.length) {
    return <div>No Flags</div>;
  }

  const Container =
    selectedView === "cards" ? FlagsCardContainer : FlagsTableContainer;

  return (
    <Container>
      {flags.map((flag, index) => {
        const Flag = selectedView === "cards" ? FlagCard : FlagRow;

        return (
          <Flag
            key={index.toString()}
            zIndex={flags.length - index}
            title={flag.slug}
            description={flag.description ?? ""}
            environments={flag.environments}
            date={`Created ${dayjs(flag.createdAt).fromNow()}`}
            popupItems={[
              {
                icon: "edit",
                text: "Edit",
                onClick: () =>
                  dispatch(
                    setIsUpdateFlagModalOpen({
                      isOpen: true,
                      data: {
                        flagId: "",
                        environment: { id: "" },
                        selectedTab: "core",
                      },
                    })
                  ),
              },
              {
                icon: "history",
                text: "History",
                onClick: () =>
                  dispatch(
                    setIsUpdateFlagModalOpen({
                      isOpen: true,
                      data: {
                        flagId: "",
                        environment: { id: "" },
                        selectedTab: "history",
                      },
                    })
                  ),
              },
              {
                icon: "delete",
                text: "Delete",
                variant: ButtonVariant.Danger,
                onClick: () => console.log(""),
              },
            ]}
          />
        );
      })}
    </Container>
  );
};

export default FlagCards;
