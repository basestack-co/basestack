import { HistoryCard, HistoryCardProps } from "@basestack/ui";
import React from "react";
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

interface ActivityCardsAnimationProps {
  environments: HistoryCardProps["environments"];
}

const ActivityCardsAnimation = ({
  environments,
}: ActivityCardsAnimationProps) => {
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
              environments={index === 0 ? environments : activity.environments}
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
