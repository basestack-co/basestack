"use client";

import React, { useMemo, useEffect } from "react";
// Router
import { useRouter } from "next/navigation";
// Components
import Plans from "components/Plans";
// Utils
import { getCookieValueAsBoolean, config } from "@basestack/utils";
// Styles
import {
  CardListItem,
  CardList,
  ProfileCardContainer,
} from "components/ProfileSettings/styles";

const UserProfileBillingPage = () => {
  const router = useRouter();

  const useBilling = useMemo(
    () => getCookieValueAsBoolean(config.cookies.useBilling) || config.isDev,
    [],
  );

  useEffect(() => {
    if (!useBilling) {
      router.push("/user/profile/general");
    }
  }, [router, useBilling]);

  return (
    <CardList>
      <CardListItem>
        <ProfileCardContainer>
          <Plans />
        </ProfileCardContainer>
      </CardListItem>
    </CardList>
  );
};

export default UserProfileBillingPage;
