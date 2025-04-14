// Server
import { api } from "utils/trpc/react";


export interface Props {
  teamId: string;
}

const InvitesTab = ({ teamId }: Props) => {
  return <div>Invites - {teamId}</div>;
};

export default InvitesTab;
