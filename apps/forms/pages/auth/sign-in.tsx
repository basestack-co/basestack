import React, { useEffect, useState } from "react";
// Auth
import { getProviders, useSession, signIn } from "next-auth/react";
// Locales
import useTranslation from "next-translate/useTranslation";
import Trans from "next-translate/Trans";
// Router
import { useRouter } from "next/router";
import { Provider } from "libs/auth/types";
// UI
import { SignIn as SignInComponent } from "@basestack/ui";
import { BannerVariant } from "@basestack/design-system";
// Utils
import { config } from "@basestack/utils";
// Styles
import styled from "styled-components";

interface SignInPageProps {
  providers: Provider;
}

export const Link = styled.a`
  text-decoration: none;
  color: ${({ theme }) =>
    theme.colors[theme.isDarkMode ? "blue300" : "primary"]};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const SignInPage = ({ providers }: SignInPageProps) => {
  const { t } = useTranslation("auth");
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
      providers={providers}
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

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default SignInPage;
