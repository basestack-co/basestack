"use client";

import React from "react";
// Router
import { useParams } from "next/navigation";
// Modules
import MembersTableCard from "./_components/MembersTable";
// Server
import { api } from "utils/trpc/react";
// Styles
import { CardList, CardListItem, SettingCardContainer } from "../styles";

const MembersPage = () => {
  const { formId } = useParams<{ formId: string }>();
  const { data: form } = api.form.byId.useQuery(
    { formId },
    {
      enabled: !!formId,
    }
  );

  return (
    <CardList>
      <CardListItem>
        <SettingCardContainer>
          <MembersTableCard role={form?.role} />
        </SettingCardContainer>
      </CardListItem>
    </CardList>
  );
};

export default MembersPage;
