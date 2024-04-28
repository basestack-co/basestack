import { TRPCError } from "@trpc/server";

export function withRoles(role: string, roles: string[] = ["ADMIN"]) {
  return function <T extends (...args: any[]) => Promise<any>>(promise: T): T {
    return async function (
      this: unknown,
      ...args: Parameters<T>
    ): Promise<ReturnType<T>> {
      if (roles.includes(role)) {
        return promise.apply(this, args);
      } else {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to do this action.",
        });
      }
    } as T;
  };
}

// This is just a concept, it's not used in the codebase, needs some work and testing
export const verifySignature = async (req: Request, secret: string) => {
  const authHeader = req.headers.get("authorization");
  return !(!secret || authHeader !== `Bearer ${secret}`);
};
