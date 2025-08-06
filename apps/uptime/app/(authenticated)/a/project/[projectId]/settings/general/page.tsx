"use client";

// Utils
import { config } from "@basestack/utils";
// Router
import { useParams } from "next/navigation";
// Server
import { api } from "utils/trpc/react";
// Styles
import { CardList, CardListItem, SettingCardContainer } from "../styles";
// Components
import DeleteProject from "./_components/DeleteProject";
import ProjectName from "./_components/ProjectName";
import ProjectOwner from "./_components/ProjectOwner";

const { hasUptimePermission } = config.plans;

const GeneralPage = () => {
  const { projectId } = useParams<{ projectId: string }>();

  const { data: project } = api.projects.byId.useQuery(
    { projectId },
    {
      enabled: !!projectId,
    }
  );

  return (
    <CardList>
      {hasUptimePermission(project?.role, "edit_project_name") && (
        <CardListItem>
          <SettingCardContainer>
            <ProjectName role={project?.role} name={project?.name} />
          </SettingCardContainer>
        </CardListItem>
      )}
      <CardListItem>
        <SettingCardContainer>
          <ProjectOwner
            name={project?.owner?.name ?? ""}
            email={project?.owner?.email ?? ""}
            image={project?.owner?.image ?? ""}
          />
        </SettingCardContainer>
      </CardListItem>
      {hasUptimePermission(project?.role, "delete_project") && (
        <CardListItem>
          <SettingCardContainer>
            <DeleteProject name={project?.name} />
          </SettingCardContainer>
        </CardListItem>
      )}
    </CardList>
  );
};

export default GeneralPage;
