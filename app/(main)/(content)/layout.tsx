import { connection } from "next/server";
import getCurrentUser from "@/utils/auth";
import Icons from "@/utils/icons";
import SearchBar from "../_components/SearchBar";
import UserMenu from "../_components/UserMenu";
import { ReactNode } from "react";

interface MainRootProps {
  children: ReactNode;
}

export default async function MainRoot({ children }: MainRootProps) {
  await connection();
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col flex-1 items-center justify-between bg-background font-sans">
      <header className="flex justify-between items-center w-full p-3">
        <div className="flex gap-2 items-center">
          <Icons.TempLogo className="text-xl text-primary" />
          <h1 className="font-bold text-xl text-primary">VibeQ</h1>
        </div>
        <SearchBar />
        <UserMenu user={user} />
      </header>
      <main className="flex justify-between gap-2 flex-1 w-full">
        <section className="rounded-md bg-background-light p-4 w-60">
          <div className="flex justify-between items-center">
            <h2 className="text-md font-bold">Your Library</h2>
            <div className="flex gap-2">
              <button className="text-xl bg-background-lighter p-4 w-6 h-6 rounded-full grid place-content-center">
                +
              </button>
              <button className="grid place-content-center">
                <Icons.Expand className="text-xl" />
              </button>
            </div>
          </div>
        </section>
        {children}
        <section className="rounded-md bg-background-light p-4 w-60"></section>
      </main>
      <section className="h-30 w-full flex justify-center items-center">
        This is where the music player goes.
      </section>
    </div>
  );
}
