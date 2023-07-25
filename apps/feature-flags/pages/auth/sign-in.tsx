import React, { useEffect } from "react";
// Auth
import { getProviders, useSession } from "next-auth/react";
// Router
import { useRouter } from "next/router";
import { Provider } from "../../types/nextAuth";
// Components
import SignIn from "components/SignIn";

interface SignInPageProps {
  providers: Provider;
}

const SignInPage = ({ providers }: SignInPageProps) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  return <SignIn providers={providers} isLoading={status === "loading"} />;
};

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default SignInPage;
