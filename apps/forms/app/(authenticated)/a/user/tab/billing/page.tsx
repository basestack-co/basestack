"use client";

import React from "react";
// Server
import { api } from "utils/trpc/react";
// Styles
import { CardList, CardListItem, ProfileCardContainer } from "../styles";
// Components
import CurrentPlan from "./_components/CurrentPlan/page";
import Meters from "./_components/Meters/page";

const UserProfileBillingPage = () => {
  const { data, isLoading } = api.subscription.current.useQuery();

  return (
    <CardList>
      <CardListItem>
        <ProfileCardContainer>
          <CurrentPlan
            isLoadingSubscription={isLoading}
            recurringInterval={data?.recurringInterval ?? ""}
            status={data?.status ?? ""}
            currentPeriodEnd={data?.currentPeriodEnd ?? ""}
            country={data?.country ?? ""}
          />
        </ProfileCardContainer>
      </CardListItem>
      {data?.status === "active" && (
        <CardListItem>
          <ProfileCardContainer>
            <Meters isLoadingSubscription={isLoading} />
          </ProfileCardContainer>
        </CardListItem>
      )}
    </CardList>
  );
};

export default UserProfileBillingPage;
