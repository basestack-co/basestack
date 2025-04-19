import { useState, useCallback } from "react";
// Server
import { api } from "utils/trpc/react";
// Toast
import { toast } from "sonner";

export interface Props {
  teamId: string;
}

const InvitesTab = ({ teamId }: Props) => {
  const [email, setEmail] = useState("");

  const invite = api.team.invite.useMutation();

  const onSend = useCallback(() => {
    invite.mutate(
      { teamId, email, role: "DEVELOPER" },
      {
        onSuccess: () => {
          toast.success("Invitation sent successfully");
          setEmail("");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  }, [invite, teamId, email]);

  return (
    <div>
      Invites - {teamId}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={onSend} disabled={invite.isPending}>
        Send
      </button>
    </div>
  );
};

export default InvitesTab;
