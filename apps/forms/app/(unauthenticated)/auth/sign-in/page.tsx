"use client";

import React, { Provider, useEffect, useState } from "react";
// Auth
import { authClient } from "utils/auth/client";
// Vendors
import { auth } from "@basestack/vendors";
// Locales
import { useTranslations } from "next-intl";
// Router
import { useRouter } from "next/navigation";
// UI
import { SignIn as SignInComponent } from "@basestack/ui";
import { BannerVariant } from "@basestack/design-system";
// Types
import { getProvidersList } from "@basestack/ui/components/SignIn";
// Utils
import { config } from "@basestack/utils";
// Styles
import styled from "styled-components";

const Link = styled.a`
  text-decoration: none;
  color: ${({ theme }) =>
    theme.colors[theme.isDarkMode ? "blue300" : "primary"]};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const SignInPage = () => {
  const t = useTranslations("auth");
  const { isPending: isSessionLoading } = authClient.useSession();
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isSessionLoading) {
      router.push("/");
    }
  }, [isSessionLoading, router]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errorParam = params.get("error") ?? "";

    if (errorParam) {
      setError(errorParam);
    }
  }, []);

  return (
    <SignInComponent
      providers={getProvidersList}
      isLoading={isSessionLoading}
      title={t("sign-in.panel.title")}
      description={t("sign-in.panel.description")}
      slogan={t("sign-in.panel.slogan")}
      contentTitle={t("sign-in.content.title")}
      contentDescription={
        <>
          {t.rich("sign-in.content.description", {
            terms: (chunks) => (
              <Link href={config.urls.legal.terms} target="_blank">
                {chunks}
              </Link>
            ),
            privacy: (chunks) => (
              <Link href={config.urls.legal.privacy} target="_blank">
                {chunks}
              </Link>
            ),
          })}
        </>
      }
      action={(name) => t("sign-in.content.action", { name })}
      onClickProvider={(provider) => authClient.signIn.social({ provider })}
      errors={[
        ...(error === "OAuthAccountNotLinked"
          ? [
              {
                title: `${t("error.oauth-account-not-linked.title")}: ${t("error.oauth-account-not-linked.description")}`,
                variant: "danger" as BannerVariant,
                isVisible: true,
              },
            ]
          : []),
      ]}
    />
  );
};

export default SignInPage;
