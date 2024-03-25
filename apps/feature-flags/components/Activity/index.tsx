import React, { useState, useCallback, useMemo } from "react";
// Server
import { trpc } from "libs/trpc";
// Router
import { useRouter } from "next/router";
// Hooks
import { useDebounce } from "react-use";
// Components
import ActivityList, { ActivityListData } from "./ActivityList";
import Toolbar from "./Toolbar";
// Styles
import { Container } from "./styles";

const Activity = () => {
  const trpcUtils = trpc.useUtils();
  const router = useRouter();
  const { projectId } = router.query as { projectId: string };
  const [range, setRange] = useState<Array<Date>>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>("");

  const project = useMemo(() => {
    if (projectId) {
      const cache = trpcUtils.project.all.getData();

      return ((cache && cache.projects) || []).find(
        (project) => project.id === projectId,
      );
    }

    return null;
  }, [projectId, trpcUtils]);

  const { data, isLoading } = trpc.history.all.useQuery(
    {
      flagId: null,
      range,
      search: debouncedSearchValue,
      projectId: project?.id as string,
    },
    { enabled: !!project?.id },
  );

  useDebounce(
    () => {
      // Only update the search value if the user hasn't typed anything
      setDebouncedSearchValue(searchValue);
    },
    500,
    [searchValue],
  );

  const onChangeDate = useCallback((value: Date[]) => {
    setRange(value);
  }, []);

  const onChangeSearchValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    },
    [],
  );

  return (
    <Container>
      <Toolbar
        searchValue={searchValue}
        selectedDate={range}
        onSearchChange={onChangeSearchValue}
        onChangeDate={onChangeDate}
        showCalendarClearButton={!!range.length}
        onClearCalendar={() => setRange([])}
      />
      <ActivityList
        data={data as unknown as ActivityListData}
        projectSlug={project?.slug!}
        isLoading={isLoading}
      />
    </Container>
  );
};

export default Activity;
