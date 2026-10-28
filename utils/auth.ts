import { auth } from "@/server/auth";

export default async function getCurrentUser() {
  const session = await auth();
  const user = session?.user;
  return user ?? null;
}
