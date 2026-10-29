"use client";

import Icons from "@/utils/icons";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { signOut } from "next-auth/react";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import useOutsideAlerter from "@/hooks/useOutsideAlerter";

interface UserMenuProps {
  user: User | null;
}

export default function UserMenu({ user }: UserMenuProps) {
  const router = useRouter();
  const [showDropDown, setShowDropDown] = useState(false);
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  useOutsideAlerter(dropDownRef, () => setShowDropDown(false));

  async function handleSignOut() {
    await signOut();
    router.refresh();
  }

  return (
    <div className="flex gap-4 items-center">
      {user ? (
        <>
          {user.userType === "admin" && (
            <Icons.Upload className="text-xl cursor-pointer hover:scale-110 transition-transform" />
          )}
          <Icons.Notification className="text-xl cursor-pointer hover:scale-110 transition-transform" />
          <div className="relative">
            <div
              onClick={() => setShowDropDown((prev) => !prev)}
              className="w-8 h-8 bg-accent rounded-full grid place-content-center text-background font-bold cursor-pointer hover:scale-110 transition-transform"
            >
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
            {showDropDown && (
              <div
                className="absolute top-10 right-0 w-50 rounded-xl p-1 bg-background-lighter shadow-xl flex flex-col gap-2 z-10"
                ref={dropDownRef}
              >
                <Link
                  href="/profile"
                  className="w-full rounded-md hover:bg-background-light px-3 py-1 transition-colors"
                >
                  Profile
                </Link>
                <Link
                  href="/account"
                  className="w-full rounded-md hover:bg-background-light px-3 py-1 transition-colors"
                >
                  Account
                </Link>
                <Link
                  href="/settings"
                  className="w-full rounded-md hover:bg-background-light px-3 py-1 transition-colors"
                >
                  Settings
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full rounded-md hover:bg-background-light px-3 py-1 transition-colors text-start cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
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
