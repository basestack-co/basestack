"use client";

import React, { useMemo, useEffect } from "react";
// Router
import { useRouter } from "next/navigation";
// Components
import Plans from "./Plans";
// Utils
import { getCookieValueAsBoolean, config } from "@basestack/utils";
// Styles
import { CardListItem, CardList, ProfileCardContainer } from "../styles";

const UserProfileBillingPage = () => {
  const router = useRouter();

  const useBilling = useMemo(
    () => getCookieValueAsBoolean(config.cookies.useBilling) || config.isDev,
    [],
  );

  useEffect(() => {
    if (!useBilling) {
      router.push("/hub/user/tab/general");
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
