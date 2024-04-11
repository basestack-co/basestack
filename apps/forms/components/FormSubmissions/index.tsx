import React, { useState, Fragment, useCallback } from "react";
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
  const [isSelectAll, setIsSelectAll] = useState<boolean>(false);
  const { formId } = router.query as { formId: string };

  const deleteSubmissions = trpc.submission.delete.useMutation();
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

  const currentPage = (data?.pages.length ?? 0) * limit;
  const totalPages = data?.pages?.[0]?.total ?? 0;

  console.log("selectIds = ", selectIds);

  const onSelectSubmission = useCallback((id: string, checked: boolean) => {
    setSelectIds((prevState) => {
      if (checked) {
        return [...prevState, id];
      }

      return prevState.filter((selectedId) => selectedId !== id);
    });
  }, []);

  const onSelectAllSubmission = useCallback(() => {
    const ids = isSelectAll
      ? []
      : data?.pages.flatMap((page) =>
          page.submissions.map((submission) => submission.id),
        ) ?? [];

    setSelectIds(ids);
    setIsSelectAll((prevState) => !prevState);
  }, [data, isSelectAll]);

  const onDelete = useCallback(
    (ids: string[]) => {
      const loadingToastId = toast.loading(
        t("submission.event.delete.loading"),
      );
      deleteSubmissions.mutate(
        { ids, formId },
        {
          onSuccess: async () => {
            setIsSelectAll(false);
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
          title="title"
          description="description"
          button={{ text: "Click", onClick: () => null }}
        />
      )}
      <Toolbar
        onUnReadSubmissions={() => null}
        onReadSubmissions={() => null}
        onUnMarkSpamAll={() => null}
        onMarkSpamAll={() => null}
        onDeleteAll={() => onDelete(selectIds)}
        onExport={() => null}
        onSelectAll={onSelectAllSubmission}
        onSelectFilter={() => null}
        onSelectSort={() => null}
        onSearchCallback={(value) => setSearchValue(value)}
        isSubmitting={deleteSubmissions.isLoading}
        isLoading={isLoading}
        isActionDisabled={selectIds.length <= 0}
        isSelectAllEnabled={isSelectAll}
      />
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
                        onMarkSpam={() => null}
                        onReadSubmission={() => null}
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
