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
import DeleteService from "./_components/DeleteService";
import ServiceName from "./_components/ServiceName";
import ServiceOwner from "./_components/ServiceOwner";

const { hasUptimePermission } = config.plans;

const GeneralPage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();

  const { data: service } = api.services.byId.useQuery(
    { serviceId },
    {
      enabled: !!serviceId,
    }
  );

  return (
    <CardList>
      {hasUptimePermission(service?.role, "edit_service_name") && (
        <CardListItem>
          <SettingCardContainer>
            <ServiceName role={service?.role} name={service?.name} />
          </SettingCardContainer>
        </CardListItem>
      )}
      <CardListItem>
        <SettingCardContainer>
          <ServiceOwner
            name={service?.owner?.name ?? ""}
            email={service?.owner?.email ?? ""}
            image={service?.owner?.image ?? ""}
          />
        </SettingCardContainer>
      </CardListItem>
      {hasUptimePermission(service?.role, "delete_service") && (
        <CardListItem>
          <SettingCardContainer>
            <DeleteService name={service?.name} />
          </SettingCardContainer>
        </CardListItem>
      )}
    </CardList>
  );
};

export default GeneralPage;
