import React, { useCallback, Fragment } from "react";
import { useRouter } from "next/router";
// Server
import { trpc } from "libs/trpc";
// Components
import {
  ButtonVariant,
  Empty,
  Loader,
  Pagination,
} from "@basestack/design-system";
import { FlagCard, FlagRow } from "components";
// Store
import { useStore } from "store";
// Types
import { SelectedView, TabType } from "types";
// Utils
import { getValue } from "@basestack/utils";
import dayjs from "dayjs";
// Styles
import {
  FlagsCardGrid,
  FlagsTableGrid,
  Container,
  LoadMoreContainer,
} from "./styles";
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
    (state) => state.setCreateFlagModalOpen,
  );
  const setUpdateFlagModalOpen = useStore(
    (state) => state.setUpdateFlagModalOpen,
  );
  const numberOfFlagsPerPage = useStore((state) => state.numberOfFlagsPerPage);
  const deleteFlag = trpc.flag.delete.useMutation();

  const { data: count } = trpc.flag.total.useQuery(
    {
      projectId,
    },
    {
      enabled: !!projectId,
    },
  );

  const { data, isLoading, fetchNextPage } = trpc.flag.all.useInfiniteQuery(
    {
      projectId,
      limit: numberOfFlagsPerPage,
      search: searchValue,
    },
    {
      enabled: !!projectId,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const initialDataLength = getValue(data, "pages[0].flags.length", 0)!;
  const currentPage = getValue(data, "pages.length", 0)! * numberOfFlagsPerPage;
  const totalPages = count?.total ?? 0;

  const onUpdateOrHistory = useCallback(
    (
      flagId: string,
      flagSlug: string,
      environmentId: string,
      selectedTab: TabType,
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
    [setUpdateFlagModalOpen],
  );

  const onDelete = useCallback(
    (flagSlug: string) => {
      deleteFlag.mutate(
        { projectId, flagSlug },
        {
          onSuccess: async () => {
            await trpcContext.flag.all.invalidate({ projectId });
          },
        },
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [projectId, deleteFlag],
  );

  if (isLoading)
    return (
      <Loader hasDelay={false}>
        <Loading selectedView={selectedView} />
      </Loader>
    );

  if (initialDataLength <= 0)
    return (
      <Empty
        iconName="flag"
        title="This project has no Feature Flags"
        description="No Feature Flags are currently available for this project."
        button={{
          text: "Create Feature Flag",
          onClick: () => setCreateFlagModalOpen({ isOpen: true }),
        }}
      />
    );

  const Grid = selectedView === "cards" ? FlagsCardGrid : FlagsTableGrid;

  return (
    <Container>
      <Grid>
        {data?.pages.map(({ flags }, index) => {
          return (
            <Fragment key={index}>
              {flags.map((flag) => {
                const FlagComponent =
                  selectedView === "cards" ? FlagCard : FlagRow;
                const hasPayload =
                  !!flag.payload &&
                  typeof flag.payload === "object" &&
                  Object.keys(flag.payload).length !== 0;

                return (
                  <FlagComponent
                    projectId={projectId}
                    isExpired={dayjs().isAfter(dayjs(flag.expiredAt))}
                    hasPayload={hasPayload}
                    key={flag.id}
                    title={flag.slug}
                    slug={flag.slug}
                    description={flag.description ?? ""}
                    date={`Created ${dayjs(flag.createdAt).fromNow()}`}
                    popupItems={[
                      {
                        icon: "edit",
                        text: "Edit",
                        onClick: () =>
                          onUpdateOrHistory(
                            flag.id,
                            flag.slug,
                            "",
                            TabType.CORE,
                          ),
                      },
                      {
                        icon: "history",
                        text: "Activity",
                        onClick: () =>
                          onUpdateOrHistory(
                            flag.id,
                            flag.slug,
                            "",
                            TabType.HISTORY,
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
                              title: "Are you sure you want to proceed?",
                              description: `This action is irreversible. Deleting the <b>${flag.slug}</b> flag will permanently remove associated comments, activity, and collaborator associations. Please proceed with caution.`,
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
            </Fragment>
          );
        })}
      </Grid>

      {!searchValue && (
        <LoadMoreContainer>
          <Pagination
            onClick={fetchNextPage}
            currentPage={currentPage >= totalPages ? totalPages : currentPage}
            totalPages={totalPages}
            isLoading={isLoading}
          />
        </LoadMoreContainer>
      )}
    </Container>
  );
};

export default FlagCards;
