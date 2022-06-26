import { TRPCError } from "@trpc/server";
import { createProtectedRouter } from "server/createProtectedRouter";
// Utils
import * as yup from "yup";

export const projectRouter = createProtectedRouter().query("all", {
  input: yup.object({
    text: yup.string().required(),
  }),
  async resolve({ ctx, input }) {
    return { input, user: ctx.session };
  },
});
