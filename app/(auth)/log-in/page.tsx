import Icons from "@/utils/icons";
import Image from "next/image";
import { signIn } from "@/server/auth";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import Link from "next/link";
import ErrorDialog from "@/app/(auth)/_components/ErrorDialog";
import { Suspense } from "react";

interface LogInPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function LogInPage({ searchParams }: LogInPageProps) {
  async function handleSubmit(formData: FormData) {
    "use server";
    if (!formData.has("email") || !formData.get("password")) {
      redirect("/log-in?error=Fill%20up%20all%20required%20fields");
    }
    try {
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirectTo: "/",
      });
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            redirect("/log-in?error=Incorrect%20User%20Name%20or%20Password");
          default:
            redirect("/log-in?error=Something%20went%20wrong");
        }
      }
      throw error;
    }
  }

  async function handleFacebookOAuth() {
    "use server";
    await signIn("facebook", { redirectTo: "/" });
  }

  async function handleGoogleOAuth() {
    "use server";
    await signIn("google", { redirectTo: "/" });
  }

  return (
    <div className="flex flex-col flex-1 justify-center items-center bg-background relative">
      <main className="w-full h-full items-center justify-center max-w-250 flex flex-col gap-4 px-4">
        <Icons.TempLogo className="text-5xl text-primary" />
        <h1 className="text-4xl text-center font-bold text-primary">
          Welcome Back!
        </h1>
        <form
          action={handleSubmit}
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
          <button className="p-4 w-50 bg-accent rounded-full text-background font-bold hover:opacity-75 transition-all cursor-pointer mt-4">
            Log In
          </button>
        </form>
        <hr className="border border-background-light w-full max-w-150" />
        <section className="w-full max-w-150 flex gap-2">
          <form action={handleGoogleOAuth} className="flex-1">
            <button className="w-full p-3 flex gap-4 items-center justify-center rounded-full border-2 border-background-lighter font-bold hover:opacity-75 transition-all cursor-pointer">
              <Image
                src="/google-icon.png"
                alt="Google Icon"
                height={48}
                width={48}
                className="w-8 h-8"
              />
              Continue with Google
            </button>
          </form>
          <form action={handleFacebookOAuth} className="flex-1">
            <button className="w-full p-3 flex gap-4 items-center justify-center rounded-full border-2 border-background-lighter font-bold hover:opacity-75 transition-all cursor-pointer">
              <Image
                src="/facebook-icon.png"
                alt="Facebook Icon"
                height={48}
                width={48}
                className="w-8 h-8"
              />
              Continue with Facebook
            </button>
          </form>
        </section>
        <section className="text-center flex flex-col gap-1 my-6">
          <p className="text-gray-400 tracking-widest">
            Don't have an Account?
          </p>
          <Link href="/sign-up" className="text-sm font-bold">
            Sign Up
          </Link>
        </section>
      </main>
      <Suspense fallback={null}>
        <ErrorDialog searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
