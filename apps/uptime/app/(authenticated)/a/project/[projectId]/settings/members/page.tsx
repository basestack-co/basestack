"use client";

// Router
import { useParams } from "next/navigation";
// Server
import { api } from "utils/trpc/react";
// Styles
import { CardList, CardListItem, SettingCardContainer } from "../styles";
// Modules
import MembersTableCard from "./_components/MembersTable";

const ProjectMembersPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data: project } = api.projects.byId.useQuery(
    { projectId },
    {
      enabled: !!projectId,
    }
  );

  return (
    <CardList>
      <CardListItem>
        <SettingCardContainer>
          <MembersTableCard role={project?.role} />
        </SettingCardContainer>
      </CardListItem>
    </CardList>
  );
};

export default ProjectMembersPage;
