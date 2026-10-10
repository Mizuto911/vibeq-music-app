import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { getUserFromEmailPassword } from "./actions/auth";
import NextAuth from "next-auth";
import { redirect } from "next/navigation";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await getUserFromEmailPassword(
          credentials.email as string,
          credentials.password as string,
        );
        if (response.success) {
          return response.user;
        }
        return null;
      },
    }),
    Google,
    Facebook,
  ],
});
