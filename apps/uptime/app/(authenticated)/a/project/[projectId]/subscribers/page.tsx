"use client";

import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  Empty,
  Label,
  Pagination,
  Search,
  Table,
  Text,
} from "@basestack/design-system";
import styled from "styled-components";
import { api } from "utils/trpc/react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.s5};
  padding: ${({ theme }) => theme.spacing.s6} ${({ theme }) => theme.spacing.s5};
`;

const Toolbar = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.s3};
  align-items: center;
  justify-content: space-between;
`;

const ProjectSubscribersPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [search, setSearch] = useState("");

  const { data, isLoading, fetchNextPage } =
    api.projectStatusPageSubscribers.list.useInfiniteQuery(
      { projectId, limit: 20, search },
      { enabled: !!projectId, getNextPageParam: (last) => last.nextCursor },
    );

  const [currentPage, totalPages] = useMemo(() => {
    return [(data?.pages.length ?? 0) * 20, data?.pages?.[0]?.total ?? 0];
  }, [data]);

  const rows = useMemo(() => {
    const pages = data?.pages ?? [];
    return pages.flatMap((page) =>
      page.subscribers.map((s) => {
        const contact = s.email ?? s.phone ?? "—";
        const channels = s.channels.join(", ");
        const verifiedVariant = s.isVerified ? "success" : "warning";

        return {
          cols: [
            { title: s.statusPage?.name ?? "—" },
            { title: contact },
            {
              children: (
                <Label
                  text={s.isVerified ? "Verified" : "Pending"}
                  variant={verifiedVariant}
                  size="small"
                  isUppercase
                />
              ),
              title: s.isVerified ? "Verified" : "Pending",
            },
            { title: channels || "-" },
            { title: (s.components || []).length ? `${s.components.length}` : "-" },
            { title: new Date(s.createdAt).toLocaleString() },
          ],
          more: [],
        };
      }),
    );
  }, [data]);

  if (!isLoading && (totalPages ?? 0) <= 0) {
    return (
      <Empty
        iconName="person_add"
        title="No subscribers yet"
        description="When subscribers are added, they'll appear here."
      />
    );
  }

  return (
    <Container>
      <Toolbar>
        <Text as="h1" size="large" fontWeight={600}>
          Subscribers
        </Text>
        <Search
          placeholder="Search subscribers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
          isDisabled={false}
          width="360px"
        />
      </Toolbar>

      <Table
        data={{
          headers: [
            "Status page",
            "Contact",
            "Verification",
            "Channels",
            "Components",
            "Subscribed at",
          ],
          rows,
        }}
        isResponsive
        breakpoint="md"
      />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          onClick={fetchNextPage}
          currentPage={currentPage >= totalPages ? totalPages : currentPage}
          totalPages={totalPages}
          isLoading={isLoading}
        />
      </div>
    </Container>
  );
};

export default ProjectSubscribersPage;
