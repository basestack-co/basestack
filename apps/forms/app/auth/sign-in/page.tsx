"use client";

import React, { useEffect, useState } from "react";
// Auth
import { useSession, signIn } from "next-auth/react";
import { providerMap } from "server/auth/config";
// Locales
import { useTranslations } from "next-intl";
import Trans from "next-translate/Trans";
// Router
import { useRouter } from "next/navigation";
import { Provider } from "libs/auth/types";
// UI
import { SignIn as SignInComponent } from "@basestack/ui";
import { BannerVariant } from "@basestack/design-system";
// Utils
import { config } from "@basestack/utils";
// Styles
import styled from "styled-components";

export const Link = styled.a`
  text-decoration: none;
  color: ${({ theme }) =>
    theme.colors[theme.isDarkMode ? "blue300" : "primary"]};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const prov = [
  {
    id: "github",
    name: "GitHub",
  },
  {
    id: "auth0",
    name: "Auth0",
  },
  {
    id: "google",
    name: "Google",
  },
];

const SignInPage = () => {
  const t = useTranslations("auth");
  const { status } = useSession();
  const router = useRouter();
  const [error, setError] = useState("");

  console.log("providerMap", providerMap);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errorParam = params.get("error") ?? "";

    if (errorParam) {
      setError(errorParam);
    }
  }, []);

  return (
    <SignInComponent
      providers={prov}
      isLoading={status === "loading"}
      title={t("forms.sign-in.panel.title")}
      description={t("forms.sign-in.panel.description")}
      slogan={t("forms.sign-in.panel.slogan")}
      contentTitle={t("forms.sign-in.content.title")}
      contentDescription={
        <Trans
          i18nKey="auth:forms.sign-in.content.description"
          components={[
            <Link
              key="terms-link"
              href={config.urls.legal.terms}
              target="_blank"
            />,
            <Link
              key="privacy-link"
              href={config.urls.legal.privacy}
              target="_blank"
            />,
          ]}
        />
      }
      action={(name) => t("forms.sign-in.content.action", { name })}
      onClickProvider={(id) => signIn(id, { callbackUrl: "/" })}
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
