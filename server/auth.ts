import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { getUserFromEmailPassword } from "./actions/auth";
import NextAuth from "next-auth";
import db from "@/db/database";
import { hashPassword, isPasswordMatch } from "@/utils/pwHash";
import type { DefaultSession } from "next-auth";

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
  }
}

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
  callbacks: {
    async signIn({ user, account }) {
      if (account?.type === "oauth" || account?.type === "oidc") {
        let [userExist] =
          await db`SELECT * FROM users WHERE email = ${user.email}`;
        if (!userExist) {
          userExist = await db`
            INSERT INTO users (user_name, email, password)
            VALUES (${user.name}, ${user.email}, ${await hashPassword(account.providerAccountId)})
            RETURNING id, user_name, email, created_at, image_url
          `;
        } else {
          const passwordMatch = await isPasswordMatch(
            account.providerAccountId,
            userExist.password,
          );
          if (!passwordMatch)
            return "/?login-message=User%20with%20that%20email%20already%20exists";
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user && account) {
        if (account.type === "credentials") {
          if (!user.id) {
            throw new Error("Authenticated user is missing a database ID.");
          }
          token.id = user.id;
        } else if (account.type === "oauth" || account.type === "oidc") {
          if (!user.email) {
            throw new Error("OAuth user is missing an email address.");
          }

          const [databaseUser] =
            await db`SELECT id FROM users WHERE email = ${user.email}`;
          if (!databaseUser) {
            throw new Error("Could not find the OAuth user in the database.");
          }
          token.id = databaseUser.id;
        }
      }

      if (!token.id && token.email) {
        const [databaseUser] =
          await db`SELECT id FROM users WHERE email = ${token.email}`;
        if (databaseUser) token.id = databaseUser.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (!token.id) {
        throw new Error("Session token is missing the database user ID.");
      }
      session.user.id = token.id;
      return session;
    },
  },
});
