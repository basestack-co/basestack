import React from "react";
// Components
import { useTheme } from "styled-components";
import { HistoryCard } from "@basestack/design-system";
// Server
import { trpc } from "libs/trpc";

const HistoryTab = () => {
  const theme = useTheme();

  const { data } = trpc.history.all.useQuery({
    flagSlug: "gfdgh",
    projectId: "cldhpq7s10008w3mioil4w2y1",
  });

  console.log("history tab data", data);

  return (
    <>
      <HistoryCard
        userName="Vitor Amaral"
        description="deleted the flag"
        flagName="user_image"
        date="30 min ago"
        environment="Development"
        type="deleted"
        hasPaddingTop={false}
      />
      <HistoryCard
        userName="Joana Lopes"
        description="toggled off"
        flagName="user_image"
        date="1 hour ago"
        environment="Development"
        type="toggledOff"
      />
      <HistoryCard
        userName="Flávio Amaral"
        description="changed the description of"
        flagName="user_image"
        date="10 days ago"
        environment="Development"
        type="edited"
      />
      <HistoryCard
        userName="Eduardo Dev"
        description="renamed the flag"
        flagName="user_photo"
        date="30 days ago"
        environment="Development"
        type="edited"
      />
      <HistoryCard
        userName="Joe Fleet"
        description="created the flag"
        flagName="user_photo"
        date="10 December 2022"
        environment="Development"
        type="created"
        hasPaddingBottom={false}
      />
    </>
  );
};

export default HistoryTab;
