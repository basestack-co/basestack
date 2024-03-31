import React, { useState } from "react";
// Server
import { trpc } from "libs/trpc";
// Router
import { useRouter } from "next/router";
// Components
import { Text, Pagination } from "@basestack/design-system";
import { Container, List, ListItem, PaginationContainer } from "./styles";
import Toolbar from "../Toolbar";
import FormSubmission from "../FormSubmission";

const FormSubmissions = () => {
  const trpcUtils = trpc.useUtils();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>("");
  const { formId } = router.query as { formId: string };

  const { data, isLoading, fetchNextPage } =
    trpc.submission.all.useInfiniteQuery(
      {
        formId,
        limit: 10,
        search: searchValue,
      },
      {
        enabled: !!formId,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  return (
    <Container>
      <Text size="xLarge">Contact</Text>
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
      />
      <List>
        <ListItem>
          <FormSubmission
            data={[
              { title: "email", description: "flavioamaral@hotmail.com" },
              {
                title: "message",
                description: "This is a preview of the message",
              },
              { title: "age", description: "18" },
            ]}
            date="18-10-2025"
          />
        </ListItem>
        <ListItem>
          <FormSubmission
            data={[
              { title: "email", description: "vitoramaral@hotmail.com" },
              {
                title: "message",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              },
              { title: "age", description: "18" },
            ]}
            date="18-10-2025"
          />
        </ListItem>
      </List>
      <PaginationContainer>
        <Pagination
          onClick={() => null}
          currentPage={1}
          totalPages={2}
          isLoading={false}
        />
      </PaginationContainer>
    </Container>
  );
};

export default FormSubmissions;
