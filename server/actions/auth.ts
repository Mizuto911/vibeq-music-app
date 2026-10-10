"use server";

import db from "@/db/database";
import { hashPassword, isPasswordMatch } from "@/utils/pwHash";
import { NeonDbError } from "@neondatabase/serverless";
import { User } from "next-auth";

export type ActionResponse =
  | { success: true; user: User }
  | { success: false; error: string };

export interface DatabaseUser {
  user_name: string;
  email: string;
  created_at: Date | string;
  image_url: string | null;
  password: string;
}

export type UserResponse = {
  success: boolean;
  user: User | null;
};

export async function createUser(formData: FormData): Promise<ActionResponse> {
  const username = formData.get("username")?.toString().trim();
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const rawPassword = formData.get("password")?.toString();

  if (!username) return { success: false, error: "Username is required." };
  if (!email) return { success: false, error: "Email is required." };
  if (!rawPassword) return { success: false, error: "Password is required." };

  try {
    const hashedPassword = await hashPassword(rawPassword);

    const [newUser] = (await db`
      INSERT INTO users (user_name, email, password) 
      VALUES (${username}, ${email}, ${hashedPassword})
      RETURNING user_name, email, created_at, image_url
    `) as Omit<DatabaseUser, "password">[];

    return {
      success: true,
      user: {
        name: newUser.user_name,
        email: newUser.email,
        image: newUser?.image_url,
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

  if (!user) return { success: false, user: null };
  const passwordMatch = await isPasswordMatch(password, user.password);
  if (!passwordMatch) return { success: false, user: null };
  else
    return {
      success: true,
      user: {
        name: user.user_name,
        email: user.email,
        image: user.image_url,
      },
    };
}
