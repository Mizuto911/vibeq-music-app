"use client";

import Icons from "@/utils/icons";
import Image from "next/image";
import Link from "next/link";
import { User } from "next-auth";

interface UserMenuProps {
  user: User | null;
}

export default function UserMenu({ user }: UserMenuProps) {
  return (
    <div className="flex gap-4 items-center">
      {user ? (
        <>
          <Icons.Notification className="text-xl cursor-pointer hover:scale-110 transition-transform" />
          <div className="w-8 h-8 bg-accent rounded-full grid place-content-center text-background font-bold cursor-pointer hover:scale-110 transition-transform">
            {user.image == null ? (
              user.name?.charAt(0).toUpperCase()
            ) : (
              <Image
                src={user.image}
                alt="User Profile Picture"
                width={32}
                height={32}
                className="w-full h-full rounded-full"
              />
            )}
          </div>
        </>
      ) : (
        <>
          <Link
            href="/sign-up"
            className="cursor-pointer hover:opacity-75 transition-all p-2 font-bold"
          >
            Sign Up
          </Link>
          <Link
            href="log-in"
            className="p-2 bg-accent rounded-full font-bold text-background w-32 cursor-pointer hover:opacity-75 transition-all text-center"
          >
            Log In
          </Link>
        </>
      )}
    </div>
  );
}
