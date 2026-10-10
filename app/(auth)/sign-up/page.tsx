import Icons from "@/utils/icons";
import Image from "next/image";
import { createUser } from "@/server/actions/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/server/auth";

export default function SignUpPage() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const response = await createUser(formData);
    if (response.success) {
      redirect("/log-in?from-sign-up=true");
    } else {
      redirect(`/sign-up?error=${response.error}`);
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
    <div className="flex flex-col flex-1 justify-center items-center bg-background">
      <main className="w-full h-full items-center justify-center max-w-250 flex flex-col gap-4 px-4">
        <Icons.TempLogo className="text-5xl text-primary" />
        <h1 className="text-4xl text-center font-bold text-primary">
          Sign up to Start listening or post music!
        </h1>
        <form
          action={handleSubmit}
          className="w-full flex flex-col items-center gap-4 my-4"
        >
          <div className="flex flex-col gap-2 w-full max-w-100 px-2">
            <label htmlFor="username" className="font-bold">
              User Name
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="e.g. JohnDoe3000"
              className="p-4 w-full border border-foreground bg-background-light rounded-xl focus:outline-2 focus-visible:outline-2 focus:outline-foreground focus-visible:outline-foreground"
            />
          </div>
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
            Sign Up
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
              Sign Up with Google
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
              Sign Up with Facebook
            </button>
          </form>
        </section>
        <section className="text-center flex flex-col gap-1 my-6">
          <p className="text-gray-400 tracking-widest">
            Already have an account?
          </p>
          <Link href="/log-in" className="text-sm font-bold">
            Log In
          </Link>
        </section>
      </main>
    </div>
  );
}
