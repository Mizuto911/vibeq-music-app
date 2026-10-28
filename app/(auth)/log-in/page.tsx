import Icons from "@/utils/icons";
import Image from "next/image";
import { signIn } from "@/server/auth";
import Link from "next/link";
import SignInForm from "../_components/SignInForm";

export default async function LogInPage() {
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
        <SignInForm />
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
    </div>
  );
}
