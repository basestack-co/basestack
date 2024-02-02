import NextAuth from "next-auth";
// Auth
import { authOptions } from "libs/auth/options";

export default NextAuth(authOptions);
