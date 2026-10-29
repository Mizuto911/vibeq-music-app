"use server";

import db from "@/db/database";
import { hashPassword, isPasswordMatch } from "@/utils/pwHash";
import { NeonDbError } from "@neondatabase/serverless";
import { User, AuthError } from "next-auth";
import { signIn } from "../auth";

declare module "next-auth" {
  interface User {
    userType: "user" | "admin";
  }
}

export type ActionResponse =
  | { success: true; user: User }
  | { success: false; error: string };

export interface DatabaseUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
  password: string;
  user_type: "user" | "admin";
}

export type UserResponse = {
  success: boolean;
  user: User | null;
};

export async function createUser(formData: FormData): Promise<ActionResponse> {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const rawPassword = formData.get("password")?.toString();

  if (!name) return { success: false, error: "Username is required." };
  if (!email) return { success: false, error: "Email is required." };
  if (!rawPassword) return { success: false, error: "Password is required." };

  try {
    const hashedPassword = await hashPassword(rawPassword);

    const [newUser] = (await db`
      INSERT INTO users (name, email, password) 
      VALUES (${name}, ${email}, ${hashedPassword})
      RETURNING id, name, email, image, user_type
    `) as Omit<DatabaseUser, "password">[];

    return {
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        image: newUser?.image,
        userType: newUser.user_type,
      },
    };
  } catch (error) {
    if (error instanceof NeonDbError) {
      if (error.code === "23505") {
        const detail = error.detail || error.message || "";

        if (
          detail.includes("email") ||
          error.constraint === "users_email_key"
        ) {
          return {
            success: false,
            error: "An account with this email already exists.",
          };
        }
        if (
          detail.includes("user_name") ||
          error.constraint === "users_user_name_key"
        ) {
          return { success: false, error: "This username is already taken." };
        }
        return {
          success: false,
          error: "A user with those details already exists.",
        };
      }

      if (error.code === "23502") {
        return { success: false, error: "Missing required database fields." };
      }

      if (error.code === "22001") {
        return { success: false, error: "Username or email is too long." };
      }
    }

    console.error("Neon Insert User Error:", error);

    return {
      success: false,
      error: "Failed to create account. Please try again.",
    };
  }
}

export async function getUserFromEmailPassword(
  email: string,
  password: string,
): Promise<UserResponse> {
  const [user] =
    (await db`SELECT * FROM users WHERE email = ${email}`) as DatabaseUser[];

  /* 
  User Schema:
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null; 
  */

  if (!user) return { success: false, user: null };
  const passwordMatch = await isPasswordMatch(password, user.password);
  if (!passwordMatch) return { success: false, user: null };
  else
    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        userType: user.user_type,
      },
    };
}

export async function SignInCredentials(formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return { success: true, message: "Log In Successful!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Incorrect Email or Password" };
        default:
          return {
            success: false,
            message: "Something went wrong. Please try again later.",
          };
      }
    }
    throw error;
  }
}
