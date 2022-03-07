import { useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
  const {
    query: { error },
  } = useRouter();

  useEffect(() => {
    console.log("errorMessage = ", error);
  }, [error]);

  return (
    <div>
      <button
        onClick={() => {
          signIn("github");
        }}
      >
        Github Sign In
      </button>

      <button onClick={() => signIn()}>Sign In</button>
    </div>
  );
}
