"use client";

import React, { useEffect, useState } from "react";
// Auth
import { useSession, signIn } from "next-auth/react";
import { providerMap } from "server/auth/config";
// Locales
import { useTranslations } from "next-intl";
// Router
import { useRouter } from "next/navigation";
// UI
import { SignIn as SignInComponent } from "@basestack/ui";
import { BannerVariant } from "@basestack/design-system";
// Types
import { Provider } from "@basestack/ui/components/SignIn";
// Utils
import { config } from "@basestack/utils";
// Styles
import styled from "styled-components";

/* export const Link = styled.a`
  text-decoration: none;
  color: ${({ theme }) =>
    theme.colors[theme.isDarkMode ? "blue300" : "primary"]};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`; */

const SignInPage = () => {
  const t = useTranslations("auth");
  const { status } = useSession();
  const router = useRouter();
  const [error, setError] = useState("");

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
      providers={providerMap as unknown as Provider}
      isLoading={status === "loading"}
      title={t("sign-in.panel.title")}
      description={t("sign-in.panel.description")}
      slogan={t("sign-in.panel.slogan")}
      contentTitle={t("sign-in.content.title")}
      contentDescription={""}
      /* contentDescription={t.markup("sign-in.content.description", {
                                             terms: (
                                               chunks,
                                             ) => `<Link key="terms-link" href={config.urls.legal.terms} target="_blank">
                                                 ${chunks}
                                               </Link>`,
                                             privacy: (chunks) => `<Link
                                                 key="privacy-link"
                                                 href={config.urls.legal.privacy}
                                                 target="_blank"
                                               >
                                                 ${chunks}
                                               </Link>`,
                                           })} */
      action={(name) => t("sign-in.content.action", { name })}
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
