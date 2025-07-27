import type { Role } from ".prisma/client";
// Components
import {
  ButtonVariant,
  Empty,
  Loader,
  Pagination,
} from "@basestack/design-system";
// Utils
import { config } from "@basestack/utils";
// Utils
import dayjs from "dayjs";
// Locales
import { useTranslations } from "next-intl";
import { Fragment, useCallback, useMemo } from "react";
// Toast
import { toast } from "sonner";
// Store
import { useStore } from "store";
// Types
import { type SelectedView, TabType } from "types";
// Server
import { api } from "utils/trpc/react";
import FlagCard from "./FlagCard";
import FlagRow from "./FlagRow";
import Loading from "./Loading";
// Styles
import {
  Container,
  FlagsCardGrid,
  FlagsTableGrid,
  LoadMoreContainer,
} from "./styles";

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
  const deleteFlag = api.projectFlags.delete.useMutation();

  const { data, isLoading, fetchNextPage } =
    api.projectFlags.list.useInfiniteQuery(
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
            await trpcUtils.projectFlags.list.invalidate({ projectId });
          },
          onError: (error) => {
            toast.error(error.message);
          },
        },
      );
    },
    [projectId, deleteFlag, trpcUtils],
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
        {...(hasFlagsPermission(projectRole, "add_project_flags")
          ? {
              button: {
                text: t("list.empty.action"),
                onClick: () => setCreateFlagModalOpen({ isOpen: true }),
              },
            }
          : {})}
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
