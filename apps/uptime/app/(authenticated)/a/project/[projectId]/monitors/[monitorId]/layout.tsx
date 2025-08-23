"use client";

// Navigation
import { useParams, useRouter } from "next/navigation";
// React
import { type ReactNode, useState } from "react";
import { useTheme } from "styled-components";
import DetailsHeader from "@basestack/ui/components/DetailsHeader";
import {
  Box,
  ButtonVariant,
  Flex,
  Tabs,
  Text,
  HorizontalRule,
  IconButton,
} from "@basestack/design-system";
import OutlinedCard from "@basestack/ui/components/OutlinedCard";

const MonitorLayout = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
  const { monitorId, projectId } = useParams<{
    monitorId: string;
    projectId: string;
  }>();

  const router = useRouter();
  const [activeTab, setActiveTab] = useState({ selected: "general", index: 0 });

  const monitorUrl = `/a/project/${projectId}/monitors/${monitorId}`;
  const hasDetails = true;

  return (
    <Box
      display="flex"
      flexDirection="column"
      flexGrow={1}
      px={theme.spacing.s5}
      py={theme.spacing.s6}
      maxWidth="1440px"
      width="100%"
      margin="0 auto"
    >
      <Flex flexDirection="column" gap={theme.spacing.s6}>
        <DetailsHeader
          title="Basestack Forms API"
          details={[
            { text: "Up", type: "label", labelVariant: "success" },
            { icon: "location_on", text: "Remote", type: "text" },
            { icon: "paid", text: "$120 - $140", type: "text" },
            { icon: "timer", text: "Checked every 3 minutes", type: "text" },
          ]}
          button={{
            text: "Share",
            onClick: () => "",
          }}
          popup={{
            text: "Actions",
            items: [
              {
                icon: "edit",
                text: "Edit",
                onClick: () => "",
              },
              {
                variant: ButtonVariant.Danger,
                icon: "delete",
                text: "Delete",
                onClick: () => "",
              },
            ],
          }}
        />
        <Tabs
          onSelect={(selected, index) => {
            router.push(`${monitorUrl}/${selected}`);
            setActiveTab({ selected, index });
          }}
          sliderPosition={activeTab.index}
          backgroundColor="transparent"
          variant="compact"
          items={[
            { id: "general", text: "General" },
            { id: "incidents", text: "Incidents" },
            { id: "settings", text: "Settings" },
          ]}
        />
      </Flex>
      <Box mt={theme.spacing.s6}>
        {hasDetails ? (
          <Flex
            flexDirection={["column", "column", "column", "row"]}
            gap={theme.spacing.s6}
          >
            <Flex flexGrow={1}>{children}</Flex>

            <Box maxWidth="335px" width="100%">
              {[
                {
                  title: "User ID",
                  text: "user_google_01_2025",
                  onClick: () => "",
                },
                {
                  title: "Primary Email",
                  text: "basestack@basestack.com",
                  onClick: () => "",
                },
                {
                  title: "User Since",
                  text: "October 14 1890",
                },
              ].map((item, index, { length }) => (
                <OutlinedCard
                  key={index}
                  title={item.title}
                  text={item.text}
                  onClick={item.onClick}
                  hasHorizontalRule={index + 1 !== length}
                />
              ))}
            </Box>
          </Flex>
        ) : (
          children
        )}
      </Box>
    </Box>
  );
};

export default MonitorLayout;
