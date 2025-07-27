import type { Role } from ".prisma/client";
import { Empty, Pagination, Skeleton, Text } from "@basestack/design-system";
// Components
import { Banners } from "@basestack/ui";
// Utils
import { config, downloadCSV } from "@basestack/utils";
import dayjs from "dayjs";
// Router
import { useParams } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
// Toast
import { toast } from "sonner";
import { useTheme } from "styled-components";
// Server
import { api } from "utils/trpc/react";
import FormSubmission from "../FormSubmission";
// Types
import type { Metadata } from "../FormSubmission/types";
import Toolbar from "../Toolbar";
import { SelectedFilter, SelectedSort } from "../Toolbar/types";
import { Container, List, ListItem, PaginationContainer } from "./styles";
import { formatFormSubmissions, getSearchFilterKeys } from "./utils";

const { hasFormsPermission } = config.plans;

const limit = 10;

export interface Props {
  name: string;
  hasRetention: boolean;
  isEnabled: boolean;
  formRole: Role;
  blockIpAddresses?: string;
}

const FormSubmissions = ({
  name,
  hasRetention,
  isEnabled,
  blockIpAddresses,
  formRole,
}: Props) => {
  const theme = useTheme();
  const trpcUtils = api.useUtils();
  const t = useTranslations("form");
  const { formId } = useParams<{ formId: string }>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [searchFilterOptions, setSearchFilterOptions] = useState<
    { text: string }[]
  >([]);
  const [selectIds, setSelectIds] = useState<string[]>([]);
  const [filters, setFilters] = useState({});
  const [orderBy, setOrderBy] = useState("desc");

  const exportSubmissions = api.formSubmissions.export.useMutation();
  const deleteSubmissions = api.formSubmissions.delete.useMutation();
  const updateSubmissions = api.formSubmissions.update.useMutation();

  const { data, isLoading, fetchNextPage } =
    api.formSubmissions.list.useInfiniteQuery(
      {
        formId,
        limit,
        search: searchValue,
        searchFilter,
        orderBy,
        ...filters,
      },
      {
        enabled: !!formId,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  useEffect(() => {
    if (formId) {
      setSearchValue("");
      setSelectIds([]);
      setSearchFilterOptions([]);
    }
  }, [formId]);

  useEffect(() => {
    if (searchFilterOptions.length <= 0 && (data?.pages.length ?? 0) > 0) {
      const fallback = [{ text: t("toolbar.search.filter.placeholder") }];
      const submissions = data?.pages.flatMap((page) => page.submissions) ?? [];
      const filters = getSearchFilterKeys(submissions);

      setSearchFilterOptions(filters.length <= 0 ? fallback : filters);
    }
  }, [data, searchFilterOptions, t]);

  const [currentPage, totalPages] = useMemo(() => {
    return [(data?.pages.length ?? 0) * limit, data?.pages?.[0]?.total ?? 0];
  }, [data]);

  const pageSubmissionIds = useMemo(() => {
    return (
      data?.pages.flatMap((page) =>
        page.submissions.map((submission) => submission.id),
      ) ?? []
    );
  }, [data]);

  const isSelectAllEnabled = useMemo(() => {
    if (selectIds.length <= 0) return false;

    const sortedSelectIds = selectIds.slice().sort();
    const sortedPageSubmissionIds = pageSubmissionIds.slice().sort();

    return (
      sortedSelectIds.length === sortedPageSubmissionIds.length &&
      sortedSelectIds.every(
        (value, index) => value === sortedPageSubmissionIds[index],
      )
    );
  }, [selectIds, pageSubmissionIds]);

  const onSelectSubmission = useCallback((id: string, checked: boolean) => {
    setSelectIds((prevState) => {
      if (checked) {
        return [...prevState, id];
      }

      return prevState.filter((selectedId) => selectedId !== id);
    });
  }, []);

  const onSelectAllSubmission = useCallback(() => {
    const ids = isSelectAllEnabled ? [] : pageSubmissionIds;
    setSelectIds(ids);
  }, [isSelectAllEnabled, pageSubmissionIds]);

  const onDelete = useCallback(
    (ids: string[]) => {
      const loadingToastId = toast.loading(
        t("submission.event.delete.loading"),
      );
      deleteSubmissions.mutate(
        { ids, formId },
        {
          onSuccess: async () => {
            setSelectIds([]);

            await trpcUtils.formSubmissions.list.invalidate({ formId });

            toast.dismiss(loadingToastId);
            toast.success(
              t("submission.event.delete.success", { count: ids.length }),
            );
          },
          onError: (error) => {
            toast.dismiss(loadingToastId);
            toast.error(error.message ?? t("submission.event.delete.error"));
          },
        },
      );
    },
    [deleteSubmissions, formId, trpcUtils, t],
  );

  const onUpdate = useCallback(
    (
      ids: string[],
      payload: { isSpam?: boolean; viewed?: boolean; showToast?: boolean },
      showToast: boolean = true,
    ) => {
      if (!hasFormsPermission(formRole, "view_form_submissions_actions"))
        return null;

      let loadingToastId: string | number = "";

      if (showToast) {
        loadingToastId = toast.loading(t("submission.event.update.loading"));
      }

      updateSubmissions.mutate(
        { ids, formId, ...payload },
        {
          onSuccess: async () => {
            setSelectIds([]);

            await trpcUtils.formSubmissions.list.invalidate({ formId });

            if (showToast) {
              toast.dismiss(loadingToastId);
              toast.success(
                t("submission.event.update.success", { count: ids.length }),
              );
            }
          },
          onError: (error) => {
            toast.dismiss(loadingToastId);
            toast.error(error.message ?? t("submission.event.update.error"));
          },
        },
      );
    },
    [updateSubmissions, formId, trpcUtils, t, formRole],
  );

  const onExport = useCallback(() => {
    const loadingToastId = toast.loading(t("submission.event.export.loading"));

    exportSubmissions.mutate(
      { formId },
      {
        onSuccess: async (result) => {
          downloadCSV(result.data, `${name.toLowerCase()}_submissions.csv`);

          toast.dismiss(loadingToastId);
          toast.success(t("submission.event.export.success"));
        },
        onError: (error) => {
          toast.dismiss(loadingToastId);
          toast.error(error.message ?? t("submission.event.export.error"));
        },
      },
    );
  }, [exportSubmissions, formId, t, name]);

  const onSelectFilter = useCallback((value: SelectedFilter | null) => {
    setFilters(
      value === null
        ? {}
        : {
            filters: {
              isSpam: value === SelectedFilter.IS_SPAM,
            },
          },
    );
  }, []);

  const onSelectSort = useCallback((value: SelectedSort | null) => {
    setOrderBy(
      value === SelectedSort.NEWEST || value === null ? "desc" : "asc",
    );
  }, []);

  const getSubmissionUpdateLoading = useCallback(
    (id: string, key: string) => {
      return (
        updateSubmissions.isPending &&
        (updateSubmissions.variables?.ids ?? []).includes(id) &&
        Object.hasOwn(updateSubmissions.variables ?? {}, key)
      );
    },
    [updateSubmissions],
  );

  const getSubmissionDeleteLoading = useCallback(
    (id: string) => {
      return (
        deleteSubmissions.isPending &&
        (deleteSubmissions.variables?.ids ?? []).includes(id)
      );
    },
    [deleteSubmissions],
  );

  return (
    <>
      <Banners
        data={[
          {
            title: t("submission.alert.enabled.description"),
            isVisible: !isEnabled,
          },
          {
            title: t("submission.alert.retention.description"),
            isVisible: !hasRetention && isEnabled,
          },
        ]}
      />
      <Container>
        {!name ? (
          <Skeleton
            padding={0}
            backgroundColor="transparent"
            hasShadow={false}
            items={[{ h: 30, w: "150px" }]}
          />
        ) : (
          <Text size="xLarge">{name}</Text>
        )}

        <Toolbar
          formId={formId}
          formRole={formRole}
          onUnReadSubmissions={() => onUpdate(selectIds, { viewed: false })}
          onReadSubmissions={() => onUpdate(selectIds, { viewed: true })}
          onUnMarkSpamAll={() => onUpdate(selectIds, { isSpam: false })}
          onMarkSpamAll={() => onUpdate(selectIds, { isSpam: true })}
          onDeleteAll={() => onDelete(selectIds)}
          onExport={onExport}
          onSelectAll={onSelectAllSubmission}
          onSelectFilter={onSelectFilter}
          onSelectSort={onSelectSort}
          onSearchCallback={(value, filter) => {
            // Only set the search filter if the value is not empty
            if (value) {
              setSearchFilter(filter);
            }
            setSearchValue(value);
          }}
          isSubmitting={
            deleteSubmissions.isPending || updateSubmissions.isPending
          }
          isLoading={isLoading}
          isActionDisabled={selectIds.length <= 0}
          isSelectAllEnabled={isSelectAllEnabled}
          isExportDisabled={exportSubmissions.isPending}
          isDisabled={totalPages <= 0 && !searchValue}
          searchFilterOptions={searchFilterOptions}
        />

        {totalPages <= 0 && !isLoading && (
          <Empty
            iconName="help"
            title={t("submission.empty.title")}
            description={t("submission.empty.description")}
          />
        )}

        {isLoading ? (
          <Skeleton
            displayInline
            numberOfItems={1}
            gapBetweenItems={12}
            items={[
              { h: 22, w: 22, mt: 7, mr: 40 },
              { h: 28, w: 28, mt: 4, isRound: true, mr: 8 },
              { h: 36, w: "20%", mr: 20 },
              { h: 36, w: "20%" },
            ]}
            padding={`${theme.spacing.s4} ${theme.spacing.s5}`}
          />
        ) : (
          <List>
            {data?.pages.map(({ submissions }, index) => {
              return (
                <Fragment key={`submission-page-${index}`}>
                  {submissions.map(
                    ({ id, createdAt, data, isSpam, viewed, metadata }) => {
                      return (
                        <ListItem key={`submission-item-${id}`}>
                          <FormSubmission
                            formId={formId}
                            data={formatFormSubmissions(data)}
                            metadata={metadata as unknown as Metadata}
                            date={dayjs(createdAt).fromNow()}
                            viewed={viewed!}
                            isSpam={isSpam!}
                            onDelete={() => onDelete([id])}
                            onOpenCallback={(isOpen) => {
                              if (isOpen && !viewed) {
                                onUpdate(
                                  [id],
                                  {
                                    viewed: true,
                                  },
                                  false,
                                );
                              }
                            }}
                            onMarkSpam={() =>
                              onUpdate([id], { isSpam: !isSpam })
                            }
                            onReadSubmission={() =>
                              onUpdate([id], { viewed: !viewed })
                            }
                            onSelect={(checked) =>
                              onSelectSubmission(id, checked)
                            }
                            isSelected={selectIds.includes(id)}
                            blockIpAddresses={blockIpAddresses}
                            isDeleteSubmissionLoading={getSubmissionDeleteLoading(
                              id,
                            )}
                            isMarkSpamLoading={getSubmissionUpdateLoading(
                              id,
                              "isSpam",
                            )}
                            isReadSubmissionLoading={getSubmissionUpdateLoading(
                              id,
                              "viewed",
                            )}
                            isActionsDisabled={
                              !hasFormsPermission(
                                formRole,
                                "view_form_submissions_actions",
                              )
                            }
                          />
                        </ListItem>
                      );
                    },
                  )}
                </Fragment>
              );
            })}
          </List>
        )}
        <PaginationContainer>
          <Pagination
            onClick={fetchNextPage}
            currentPage={currentPage >= totalPages ? totalPages : currentPage}
            totalPages={totalPages}
            isLoading={isLoading}
          />
        </PaginationContainer>
      </Container>
    </>
  );
};

export default FormSubmissions;
