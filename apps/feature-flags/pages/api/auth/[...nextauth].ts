import NextAuth from "next-auth";
// Auth
import { authOptions } from "libs/auth/authOptions";

export default NextAuth(authOptions);
