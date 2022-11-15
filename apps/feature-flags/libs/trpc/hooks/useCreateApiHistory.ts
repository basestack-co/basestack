import { useCallback, useMemo } from "react";
// Types
import { HistoryAction, HistoryData } from "types/history";
// Server
import { trpc } from "libs/trpc";
// Auth
import { useSession } from "next-auth/react";

const useCreateApiHistory = () => {
  const { client } = trpc.useContext();
  const { data: session, status } = useSession();

  const payload = useMemo(
    () =>
      status === "authenticated"
        ? {
            user: {
              id: session.user.id,
              name: session.user.name,
              avatar: session.user.image ?? "",
            },
          }
        : {},
    [status, session]
  );

  const onCreateHistory = useCallback(
    (action: HistoryAction, data: HistoryData) => {
      client.mutation("history.create", {
        projectId: data.projectId,
        action,
        payload: {
          ...data.payload,
          ...payload,
        },
      });
    },
    [client, payload]
  );

  return {
    onCreateHistory,
  } as const;
};

export default useCreateApiHistory;
