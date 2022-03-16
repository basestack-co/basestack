import { useEffect, useState, useCallback } from "react";
// Auth
import { signIn, useSession } from "next-auth/react";
// Router
import { useRouter } from "next/router";
// UI
import { Button } from "ui/atoms";

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

export default function Login() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);

  return (
    <div>
      <Button
        onClick={() => {
          signIn("github", { callbackUrl: "/" });
        }}
      >
        Sign in with Github
      </Button>
    </div>
  );
}
