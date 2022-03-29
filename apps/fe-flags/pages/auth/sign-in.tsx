import { useEffect, useState, useCallback } from "react";
// Auth
import { signIn, useSession, getProviders } from "next-auth/react";
// Router
import { useRouter } from "next/router";
// UI
import { Button } from "ui/atoms";
// Types
import { Provider } from "types/nextAuth";

const EmailPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignInWithEmailPassword = useCallback(() => {
    if (!!email && !!password) {
      signIn("email-password", { email, password, redirect: false });
    }
  }, [email, password]);

  return (
    <div>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email address"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        required
      />

      <Button onClick={onSignInWithEmailPassword}>
        Sign in or Create account
      </Button>

      <br />
    </div>
  );
};

interface Props {
  providers: Provider;
}

const SignInPage = ({ providers }: Props) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(typeof providers);

    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);

  return (
    <div>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <Button onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
            Sign in with {provider.name}
          </Button>
        </div>
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default SignInPage;
