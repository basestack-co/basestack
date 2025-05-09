import React, { useCallback, Fragment, useMemo } from "react";
// Server
import { api } from "utils/trpc/react";
// Components
import {
  ButtonVariant,
  Empty,
  Loader,
  Pagination,
} from "@basestack/design-system";
import FlagCard from "./FlagCard";
import FlagRow from "./FlagRow";
// Store
import { useStore } from "store";
// Types
import { SelectedView, TabType } from "types";
import { Role } from ".prisma/client";
// Utils
import dayjs from "dayjs";
// Utils
import { config } from "@basestack/utils";
// Locales
import { useTranslations } from "next-intl";
// Toast
import { toast } from "sonner";
// Styles
import {
  FlagsCardGrid,
  FlagsTableGrid,
  Container,
  LoadMoreContainer,
} from "./styles";
import Loading from "./Loading";

const { hasFlagsPermission } = config.plans;

interface FlagCardsProps {
  selectedView: SelectedView;
  projectId: string;
  searchValue: string;
  projectRole?: Role;
}

const FlagCards = ({
  selectedView,
  projectId,
  searchValue,
  projectRole,
}: FlagCardsProps) => {
  const trpcUtils = api.useUtils();
  const t = useTranslations("flag");
  const setConfirmModalOpen = useStore((state) => state.setConfirmModalOpen);
  const setCreateFlagModalOpen = useStore(
    (state) => state.setCreateFlagModalOpen,
  );
  const setUpdateFlagModalOpen = useStore(
    (state) => state.setUpdateFlagModalOpen,
  );
  const numberOfFlagsPerPage = useStore((state) => state.numberOfFlagsPerPage);
  const deleteFlag = api.flag.delete.useMutation();

  const { data, isLoading, fetchNextPage } = api.flag.all.useInfiniteQuery(
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

  const [currentPage, totalPages] = useMemo(() => {
    return [
      (data?.pages.length ?? 0) * numberOfFlagsPerPage,
      data?.pages?.[0]?.total ?? 0,
    ];
  }, [data, numberOfFlagsPerPage]);

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
            await trpcUtils.flag.all.invalidate({ projectId });
            await trpcUtils.project.recent.invalidate();
            // Reset the usage cache
            await trpcUtils.subscription.usage.invalidate();
          },
          onError: (error) => {
            toast.error(error.message);
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

  if (totalPages <= 0)
    return (
      <Empty
        iconName="flag"
        title={t("list.empty.title")}
        description={t("list.empty.description")}
        button={{
          text: t("list.empty.action"),
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
                    date={t("list.card.date", {
                      date: dayjs(flag.createdAt).fromNow(),
                    })}
                    {...(hasFlagsPermission(projectRole, "edit_project_flags")
                      ? {
                          popupItems: [
                            {
                              icon: "edit",
                              text: t("list.card.actions.edit"),
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
                              text: t("list.card.actions.activity"),
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
                              text: t("list.card.actions.delete"),
                              variant: ButtonVariant.Danger,
                              onClick: () =>
                                setConfirmModalOpen({
                                  isOpen: true,
                                  data: {
                                    title: t("list.card.delete.title"),
                                    description: t(
                                      "list.card.delete.description",
                                      {
                                        slug: `<b>${flag.slug}</b>`,
                                      },
                                    ),
                                    type: "delete",
                                    buttonText: t("list.card.delete.action"),
                                    onClick: () => {
                                      onDelete(flag.slug);
                                      setConfirmModalOpen({
                                        isOpen: false,
                                      });
                                    },
                                  },
                                }),
                            },
                          ],
                        }
                      : {})}
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
