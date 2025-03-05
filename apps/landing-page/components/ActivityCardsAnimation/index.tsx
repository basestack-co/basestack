import React, { useEffect, useState } from "react";
import { HistoryCard, HistoryCardProps } from "@basestack/ui";
import { Container, List, ListItem } from "./styles";

const activityData = [
  {
    userName: "Alice",
    description: "enabled the feature flag",
    flagName: "fuzzy_search",
    date: "A few seconds ago",
    environments: [],
    type: "toggledOn",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    hasPaddingTop: false,
  },
  {
    userName: "Michael",
    description: "created a new flag",
    flagName: "fuzzy_search",
    date: "Yesterday",
    environments: [
      { name: "develop", enabled: false },
      { name: "staging", enabled: false },
      { name: "production", enabled: false },
    ],
    type: "created",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    userName: "Emily",
    description: "created a project called",
    flagName: "mobile-app",
    date: "3 days ago",
    environments: [],
    type: "createdProject",
    avatar: "https://randomuser.me/api/portraits/women/40.jpg",
    hasLeftLine: false,
  },
] as HistoryCardProps[];

const randomizeEnvironments = () => {
  return [
    { name: "develop", enabled: true },
    { name: "staging", enabled: Math.random() > 0.5 },
    { name: "production", enabled: Math.random() > 0.5 },
  ];
};

const ActivityCardsAnimation = () => {
  const [randomEnvs, setRandomEnvs] = useState<
    HistoryCardProps["environments"]
  >([
    { name: "develop", enabled: true },
    { name: "staging", enabled: false },
    { name: "production", enabled: false },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomEnvs(randomizeEnvironments());
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <List>
        {activityData.map((activity, index) => (
          <ListItem key={index}>
            <HistoryCard
              userName={activity.userName}
              description={activity.description}
              flagName={activity.flagName}
              date={activity.date}
              environments={index === 0 ? randomEnvs : activity.environments}
              type={activity.type}
              avatar={activity.avatar}
              hasLeftLine={activity.hasLeftLine}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ActivityCardsAnimation;
