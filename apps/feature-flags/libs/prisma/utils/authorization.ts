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
          message: "You are not authorized to do this action in this project",
        });
      }
    } as T;
  };
}
