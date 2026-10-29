"use client";

import { useState, SubmitEvent } from "react";
import { SignInCredentials } from "@/server/actions/auth";
import { useRouter } from "next/navigation";
import ErrorDialog from "./ErrorDialog";
import clsx from "clsx";
import LoadingIndicator from "./LoadingIndicator";

export default function SignInForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isLoading) return;
    const formData = new FormData(e.target);

    if (!formData.has("email") || !formData.get("password")) {
      displayError("Fill up all required fields.");
      return;
    }

    setIsLoading(true);
    const response = await SignInCredentials(formData);
    setIsLoading(false);

    if (response.success) {
      router.replace(`/?login-message=${response.message}`);
      return;
    }

    displayError(response.message);
  }

  function displayError(message: string) {
    setError(message);
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center gap-4 my-4"
    >
      <div className="flex flex-col gap-2 w-full max-w-100 px-2">
        <label htmlFor="email" className="font-bold">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="example@gmail.com"
          className="p-4 w-full border border-foreground bg-background-light rounded-xl focus:outline-2 focus-visible:outline-2 focus:outline-foreground focus-visible:outline-foreground"
        />
      </div>
      <div className="flex flex-col gap-2 w-full max-w-100 px-2">
        <label htmlFor="password" className="font-bold">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          className="p-4 w-full border border-foreground bg-background-light rounded-xl focus:outline-2 focus-visible:outline-2 focus:outline-foreground focus-visible:outline-foreground"
        />
      </div>
      <button
        className={clsx(
          "p-4 w-50 bg-accent rounded-full text-background font-bold transition-all mt-4",
          isLoading && "opacity-50 cursor-not-allowed",
          !isLoading && "hover:opacity-75 cursor-pointer",
        )}
      >
        {isLoading ? (
          <span>
            Logging In <LoadingIndicator />
          </span>
        ) : (
          "Log In"
        )}
      </button>
      <ErrorDialog
        message={error}
        show={showError}
        setShowError={setShowError}
      />
    </form>
  );
}
