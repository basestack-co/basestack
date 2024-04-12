import React, { useState, Fragment, useCallback, useMemo } from "react";
import { useTheme } from "styled-components";
// Server
import { trpc } from "libs/trpc";
// Router
import { useRouter } from "next/router";
// Locales
import useTranslation from "next-translate/useTranslation";
// Toast
import { toast } from "sonner";
// Components
import { Text, Pagination, Empty, Skeleton } from "@basestack/design-system";
import { Container, List, ListItem, PaginationContainer } from "./styles";
import Toolbar from "../Toolbar";
import FormSubmission from "../FormSubmission";
// Utils
import dayjs from "dayjs";
import { formatFormSubmissions } from "./utils";

const limit = 10;

export interface Props {
  name: string;
}

const FormSubmissions = ({ name }: Props) => {
  const theme = useTheme();
  const trpcUtils = trpc.useUtils();
  const { t } = useTranslation("forms");
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectIds, setSelectIds] = useState<string[]>([]);
  const { formId } = router.query as { formId: string };

  const deleteSubmissions = trpc.submission.delete.useMutation();
  const updateSubmissions = trpc.submission.update.useMutation();
  const { data, isLoading, fetchNextPage } =
    trpc.submission.all.useInfiniteQuery(
      {
        formId,
        limit,
        search: searchValue,
      },
      {
        enabled: !!formId,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  const [currentPage, totalPages] = useMemo(() => {
    return [(data?.pages.length ?? 0) * limit, data?.pages?.[0]?.total ?? 0];
  }, [data]);

  console.log("selectIds = ", selectIds);
  console.log("data = ", data)

  const pageSubmissionIds = useMemo(() => {
    return (
      data?.pages.flatMap((page) =>
        page.submissions.map((submission) => submission.id),
      ) ?? []
    );
  }, [data]);

  const isSelectAllEnabled = useMemo(() => {
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

            await trpcUtils.submission.all.invalidate({ formId });

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
    (ids: string[], data: { isSpam?: boolean; viewed?: boolean }) => {
      const loadingToastId = toast.loading(
        t("submission.event.update.loading"),
      );

      console.log("data = ", data)
      updateSubmissions.mutate(
        { ids, formId, ...data },
        {
          onSuccess: async (res) => {
            setSelectIds([]);

            await trpcUtils.submission.all.invalidate({ formId });

            toast.dismiss(loadingToastId);
            toast.success(
              t("submission.event.update.success", { count: ids.length }),
            );
          },
          onError: (error) => {
            toast.dismiss(loadingToastId);
            toast.error(error.message ?? t("submission.event.update.error"));
          },
        },
      );
    },
    [updateSubmissions, formId, trpcUtils, t],
  );

  return (
    <Container>
      {isLoading ? (
        <Skeleton
          padding={0}
          backgroundColor="transparent"
          hasShadow={false}
          items={[{ h: 30, w: "150px" }]}
        />
      ) : (
        <Text size="xLarge">{name}</Text>
      )}
      {totalPages <= 0 && !isLoading && (
        <Empty
          mt={theme.spacing.s5}
          iconName="help"
          title={t("submission.empty.title")}
          description={t("submission.empty.description")}
        />
      )}
      {totalPages > 0 && !isLoading && (
        <Toolbar
          onUnReadSubmissions={() => onUpdate(selectIds, { viewed: false })}
          onReadSubmissions={() => onUpdate(selectIds, { viewed: true })}
          onUnMarkSpamAll={() => onUpdate(selectIds, { isSpam: false })}
          onMarkSpamAll={() => onUpdate(selectIds, { isSpam: true })}
          onDeleteAll={() => onDelete(selectIds)}
          onExport={() => null}
          onSelectAll={onSelectAllSubmission}
          onSelectFilter={() => null}
          onSelectSort={() => null}
          onSearchCallback={(value) => setSearchValue(value)}
          isSubmitting={deleteSubmissions.isLoading}
          isLoading={isLoading}
          isActionDisabled={selectIds.length <= 0}
          isSelectAllEnabled={isSelectAllEnabled}
        />
      )}
      {isLoading ? (
        <Skeleton
          displayInline
          numberOfItems={2}
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
                {submissions.map(({ id, createdAt, data, isSpam, viewed }) => {
                  return (
                    <ListItem key={`submission-item-${id}`}>
                      <FormSubmission
                        data={formatFormSubmissions(data)}
                        date={dayjs(createdAt).fromNow()}
                        viewed={viewed!}
                        isSpam={isSpam!}
                        onDelete={() => onDelete([id])}
                        onMarkSpam={() => onUpdate([id], { isSpam: !isSpam })}
                        onReadSubmission={() =>
                          onUpdate([id], { viewed: !viewed })
                        }
                        onSelect={(checked) => onSelectSubmission(id, checked)}
                        isSelected={selectIds.includes(id)}
                      />
                    </ListItem>
                  );
                })}
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
  );
};

export default FormSubmissions;
