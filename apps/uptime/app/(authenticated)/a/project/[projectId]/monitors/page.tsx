"use client";

// Router
import { useParams } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";

// Styles
import { useTheme } from "styled-components";
// Server
import { api } from "utils/trpc/react";
import { useMemo } from "react";

const ProjectMonitorsPage = () => {
  const t = useTranslations();
  const theme = useTheme();

  const { projectId } = useParams<{ projectId: string }>();

  const { data, fetchNextPage } = api.projectMonitors.list.useInfiniteQuery(
    { projectId, limit: 10, search: "" },
    { enabled: !!projectId, getNextPageParam: (last) => last.nextCursor }
  );

  const [currentPage, totalPages] = useMemo(() => {
    return [(data?.pages.length ?? 0) * 10, data?.pages?.[0]?.total ?? 0];
  }, [data]);

  return (
    <div>
      <h1>The monitors</h1>
      <button
        type="button"
        onClick={() => {
          fetchNextPage();
        }}
      >
        Load more
      </button>

      {data?.pages.map((page, index) => (
        <div key={index}>
          {page.monitors.map((monitor) => (
            <div key={monitor.id}>{monitor.name}</div>
          ))}
        </div>
      ))}

      <div>
        {currentPage} / {totalPages}
      </div>
    </div>
  );
};

export default ProjectMonitorsPage;
