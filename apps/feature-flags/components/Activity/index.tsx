import React, { useState, useCallback, useMemo } from "react";
import { trpc } from "libs/trpc";
import { useRouter } from "next/router";
// Components
import ActivityList, { ActivityListData } from "./ActivityList";
import Toolbar from "./Toolbar";
import { Container } from "./styles";

const Activity = () => {
  const trpcContext = trpc.useContext();
  const router = useRouter();
  const projectSlug = router.query.projectSlug as string;

  const [selectedDate, setSelectedDate] = useState<Array<Date>>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const project = useMemo(() => {
    if (projectSlug) {
      const cache = trpcContext.project.all.getData();

      return ((cache && cache.projects) || []).find(
        (project) => project.slug === projectSlug,
      );
    }

    return null;
  }, [projectSlug, trpcContext]);

  const { data, isLoading } = trpc.history.all.useQuery(
    { flagId: null, projectId: project?.id as string },
    { enabled: !!project?.id, keepPreviousData: true },
  );

  const onChangeDate = useCallback((value: Date[]) => {
    setSelectedDate(value);
  }, []);

  return (
    <Container>
      <Toolbar
        searchValue={searchValue}
        selectedDate={selectedDate}
        onSearchChange={(event) => setSearchValue(event.target.value)}
        onChangeDate={onChangeDate}
      />
      <ActivityList
        data={data as unknown as ActivityListData}
        projectSlug={projectSlug}
        isLoading={isLoading}
      />
    </Container>
  );
};

export default Activity;
