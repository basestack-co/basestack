import React, { useEffect } from "react";
// Auth
import { getProviders, useSession, signIn } from "next-auth/react";
// Locales
import useTranslation from "next-translate/useTranslation";
// Router
import { useRouter } from "next/router";
import { Provider } from "libs/auth/types";
// UI
import { SignIn as SignInComponent } from "@basestack/ui";

interface SignInPageProps {
  providers: Provider;
}

const SignInPage = ({ providers }: SignInPageProps) => {
  const { t } = useTranslation("auth");
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <SignInComponent
      providers={providers}
      isLoading={status === "loading"}
      title={t("forms.sign-in.panel.title")}
      description={t("forms.sign-in.panel.description")}
      slogan={t("forms.sign-in.panel.slogan")}
      contentTitle={t("forms.sign-in.content.title")}
      contentDescription={t("forms.sign-in.content.description")}
      action={(name) => t("forms.sign-in.content.action", { name })}
      onClickProvider={(id) => signIn(id, { callbackUrl: "/" })}
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
