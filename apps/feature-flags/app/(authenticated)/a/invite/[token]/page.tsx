"use client";

// Navigation
import { useParams, useRouter } from "next/navigation";
// Server
import { api } from "utils/trpc/react";
// Toast
import { toast } from "sonner";

const InvitePage = () => {
  const router = useRouter();
  const { token } = useParams<{ token: string }>();
  const trpcUtils = api.useUtils();
  const acceptInvitation = api.team.acceptInvitation.useMutation();

  return (
    <div>
      <br />
      <h1>Invitation to join team {token}</h1>

      <button
        onClick={() =>
          acceptInvitation.mutate(
            { token },
            {
              onSuccess: async () => {
                await trpcUtils.project.all.invalidate();
                await trpcUtils.project.recent.invalidate();

                toast.success("Successfully joined team, redirecting...");

                router.push("/a");
              },
              onError: (error) => {
                toast.error(error.message);
              },
            }
          )
        }
      >
        Accept Invitation
      </button>
    </div>
  );
};

export default InvitePage;
