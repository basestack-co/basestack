import React, { useState, Fragment } from "react";
// Server
import { trpc } from "libs/trpc";
// Router
import { useRouter } from "next/router";
// Components
import { Text, Pagination } from "@basestack/design-system";
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

const FormSubmissions = ({name}: Props) => {
  const trpcUtils = trpc.useUtils();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>("");
  const { formId } = router.query as { formId: string };

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

  return (
    <Container>
      <Text size="xLarge">{name}</Text>
      <Toolbar
        onUnReadSubmissions={() => null}
        onReadSubmissions={() => null}
        onUnMarkSpamAll={() => null}
        onMarkSpamAll={() => null}
        onDeleteAll={() => null}
        onExport={() => null}
        onSelectAll={() => null}
        onSelectFilter={() => null}
        onSelectSort={() => null}
        onSearchCallback={(value) => setSearchValue(value)}
        isSubmitting={false}
      />
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
                      viewed={!!viewed}
                      isSpam={!!isSpam}
                      onDelete={() => null}
                      onMarkSpam={() => null}
                      onReadSubmission={() => null}
                    />
                  </ListItem>
                );
              })}
            </Fragment>
          );
        })}
      </List>
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
