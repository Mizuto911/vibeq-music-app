import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { getUserFromEmailPassword } from "./actions/auth";
import NextAuth from "next-auth";
import NeonAdapter from "@auth/neon-adapter";
import db from "@/db/database";
import type { DefaultSession } from "next-auth";
import { Pool } from "@neondatabase/serverless";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id?: string;
    userType: "user" | "admin";
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL ?? "" });
  return {
    adapter: NeonAdapter(pool),
    session: { strategy: "jwt" },
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
    callbacks: {
      async jwt({ token, user, account, profile }) {
        if (user && account) {
          if (account.type === "credentials") {
            if (!user.id) {
              throw new Error("Authenticated user is missing a database ID.");
            }
            token.id = user.id;
            token.userType = user.userType;
          } else if (account.type === "oauth" || account.type === "oidc") {
            if (!profile || !profile.email)
              throw new Error("User profile email data is missing from data.");

            const [user] =
              await db`SELECT id, user_type FROM users WHERE email = ${profile.email}`;
            if (!user.user_type || !user.id)
              throw new Error(
                "User id and type data missing from database record.",
              );
            token.id = user.id;
            token.userType = user.user_type;
          }
        }
        return token;
      },
      async session({ session, token }) {
        if (!token.id) {
          throw new Error("Session token is missing the database user ID.");
        }
        session.user.id = token.id;
        session.user.userType = token.userType;
        return session;
      },
    },
  };
});
