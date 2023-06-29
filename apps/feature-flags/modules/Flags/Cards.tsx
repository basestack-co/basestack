import React, { useCallback } from "react";
import { useRouter } from "next/router";
// Server
import { trpc } from "libs/trpc";
// Components
import {
  FlagCard,
  FlagRow,
  ButtonVariant,
  Empty,
  Loader,
  Input,
} from "@basestack/design-system";
// Store
import { useStore } from "store";
// Types
import { SelectedView, TabType } from "types";
// Utils
import { getValue } from "@basestack/utils";
import dayjs from "dayjs";
// Styles
import { FlagsCardContainer, FlagsTableContainer } from "./styles";
import Loading from "./Loading";

interface FlagCardsProps {
  selectedView: SelectedView;
  projectId: string;
  searchValue: string;
}

const FlagCards = ({
  selectedView,
  projectId,
  searchValue,
}: FlagCardsProps) => {
  const trpcContext = trpc.useContext();
  const router = useRouter();
  const setConfirmModalOpen = useStore((state) => state.setConfirmModalOpen);
  const setCreateFlagModalOpen = useStore(
    (state) => state.setCreateFlagModalOpen
  );
  const setUpdateFlagModalOpen = useStore(
    (state) => state.setUpdateFlagModalOpen
  );
  const deleteFlag = trpc.flag.delete.useMutation();

  const { data, isLoading } = trpc.flag.all.useQuery(
    {
      projectId,
      pagination: { skip: 0, take: 10 },
      search: searchValue,
    },
    { enabled: !!projectId }
  );

  const projectSlug = router.query.projectSlug as string;

  const flags = !isLoading && data ? data.flags : [];

  const onUpdateOrHistory = useCallback(
    (
      flagId: string,
      flagSlug: string,
      environmentId: string,
      selectedTab: TabType
    ) => {
      setUpdateFlagModalOpen({
        isOpen: true,
        data: {
          flag: { id: flagId, slug: flagSlug },
          environment: { id: environmentId },
          selectedTab: selectedTab,
        },
      });
    },
    [setUpdateFlagModalOpen]
  );

  const onDelete = useCallback(
    (flagSlug: string) => {
      deleteFlag.mutate(
        { projectId: projectId, flagSlug },
        {
          onSuccess: async () => {
            // TODO: migrate this to use cache from useQuery
            await trpcContext.flag.all.invalidate();
          },
        }
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [projectId, deleteFlag]
  );

  if (isLoading)
    return (
      <Loader>
        <Loading selectedView={selectedView} />
      </Loader>
    );

  if (!flags.length)
    return (
      <Empty
        iconName="flag"
        title="No flags available"
        description={`There is no flags available for ${projectSlug}`}
        button={{
          text: "Create flag",
          onClick: () => setCreateFlagModalOpen({ isOpen: true }),
        }}
      />
    );

  const Container =
    selectedView === "cards" ? FlagsCardContainer : FlagsTableContainer;

  return (
    <Container>
      {flags.map((flag, index) => {
        const FlagComponent = selectedView === "cards" ? FlagCard : FlagRow;
        const environmentId = getValue(flag, "environments[0].id", "");

        return (
          <FlagComponent
            isExpired={false}
            hasPayload={false}
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
                  onUpdateOrHistory(
                    flag.id,
                    flag.slug,
                    environmentId,
                    TabType.CORE
                  ),
              },
              {
                icon: "history",
                text: "History",
                onClick: () =>
                  onUpdateOrHistory(
                    flag.id,
                    flag.slug,
                    environmentId,
                    TabType.HISTORY
                  ),
              },
              {
                icon: "delete",
                text: "Delete",
                variant: ButtonVariant.Danger,
                onClick: () =>
                  setConfirmModalOpen({
                    isOpen: true,
                    data: {
                      title: "Are you sure?",
                      description: `This action cannot be undone. This will permanently delete the <b>${flag.slug}</b> flag, comments, history and remove all collaborator associations. `,
                      type: "delete",
                      buttonText: "Delete Flag",
                      onClick: () => {
                        onDelete(flag.slug);
                        setConfirmModalOpen({
                          isOpen: false,
                        });
                      },
                    },
                  }),
              },
            ]}
          />
        );
      })}
    </Container>
  );
};

export default FlagCards;
