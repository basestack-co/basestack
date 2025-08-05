"use client";

// Router
import { useParams } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";

// Styles
import { useTheme } from "styled-components";
// Server
import { api } from "utils/trpc/react";

const MonitorsPage = () => {
  const t = useTranslations();
  const theme = useTheme();

  const { serviceId } = useParams<{ serviceId: string }>();

  const { data: service } = api.services.byId.useQuery(
    { serviceId },
    {
      enabled: !!serviceId,
    }
  );

  return <div>the monitors page</div>;
};

export default MonitorsPage;
