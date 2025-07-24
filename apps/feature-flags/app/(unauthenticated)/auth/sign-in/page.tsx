"use client";

import { BannerVariant } from "@basestack/design-system";
// UI
import { SignIn as SignInComponent } from "@basestack/ui";
// Types
import {
  getProvidersList,
  SignInProviders,
} from "@basestack/ui/components/SignIn";
// Utils
import { clearAllBrowserStorage, config } from "@basestack/utils";
// Vendors
import { auth } from "@basestack/vendors";
// Router
import { useRouter, useSearchParams } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
import React, { Suspense, useEffect, useState } from "react";
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

const SignIn = () => {
  const t = useTranslations("auth");
  const { data: session, isPending: isSessionLoading } =
    auth.client.useSession();
  const router = useRouter();
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const provider = searchParams.get("provider") as SignInProviders;

  useEffect(() => {
    if (isSessionLoading) return;

    if (session) {
      router.push("/");
      return;
    }

    clearAllBrowserStorage();
  }, [session, router, isSessionLoading]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errorParam = params.get("error") ?? "";

    if (errorParam) {
      setError(errorParam);
    }
  }, []);

  useEffect(() => {
    if (provider) {
      auth.client.signIn.social({ provider });
    }
  }, [provider]);

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
      onClickProvider={(provider) => auth.client.signIn.social({ provider })}
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

const SignInPage = () => {
  return (
    <Suspense>
      <SignIn />
    </Suspense>
  );
};

export default SignInPage;
