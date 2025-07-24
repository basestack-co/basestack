"use client";

// Router
import { useParams } from "next/navigation";
import React from "react";
// Server
import { api } from "utils/trpc/react";
// Styles
import { CardList, CardListItem, SettingCardContainer } from "../styles";
// Modules
import MembersTableCard from "./_components/MembersTable";

const MembersPage = () => {
  const { formId } = useParams<{ formId: string }>();
  const { data: form } = api.forms.byId.useQuery(
    { formId },
    {
      enabled: !!formId,
    },
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
