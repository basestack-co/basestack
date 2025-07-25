// Router
import { useParams } from "next/navigation";
import type React from "react";
import { useCallback, useMemo, useState } from "react";
// Hooks
import { useDebounce } from "react-use";
// Server
import { api } from "utils/trpc/react";
// Components
import ActivityList, { type ActivityListData } from "./ActivityList";
// Styles
import { Container } from "./styles";
import Toolbar from "./Toolbar";

const Activity = () => {
  const trpcUtils = api.useUtils();
  const { projectId } = useParams<{ projectId: string }>();
  const [range, setRange] = useState<Array<Date>>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>("");

  const project = useMemo(() => {
    if (projectId) {
      const cache = trpcUtils.projects.list.getData();

      return (cache?.projects || []).find(
        (project) => project.id === projectId,
      );
    }

    return null;
  }, [projectId, trpcUtils]);

  const { data, isLoading } = api.projectHistory.list.useQuery(
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
        projectSlug={project?.name ?? ""}
        isLoading={isLoading}
      />
    </Container>
  );
};

export default Activity;
