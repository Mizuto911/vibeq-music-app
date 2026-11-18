import { connection } from "next/server";
import getCurrentUser from "@/utils/auth";
import Icons from "@/utils/icons";
import SearchBar from "../_components/SearchBar";
import UserMenu from "../_components/UserMenu";
import { ReactNode } from "react";
import MusicPlayer from "../_components/MusicPlayer";
import Image from "next/image";
import Link from "next/link";

interface MainRootProps {
  children: ReactNode;
}

export default async function MainRoot({ children }: MainRootProps) {
  await connection();
  const user = await getCurrentUser();

  return (
    <div className="flex h-screen flex-col items-center justify-between overflow-hidden bg-background font-sans">
      <header className="flex w-full shrink-0 items-center justify-between p-3">
        <div className="flex gap-2 items-center">
          <Icons.TempLogo className="text-xl text-primary" />
          <h1 className="font-bold text-xl text-primary">VibeQ</h1>
        </div>
        <SearchBar />
        <UserMenu user={user} />
      </header>
      <main className="flex min-h-0 w-full flex-1 justify-between gap-2">
        <section className="rounded-md bg-background-light p-4 w-70">
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
        <section className="rounded-md bg-background-light w-70 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-scrollbar-thumb [&::-webkit-scrollbar-thumb]:rounded-full">
          <div className="w-full h-90 rounded-t-md relative group">
            <Image
              src="https://br-billowing-rice-b3586edm.storage.c-4.ap-southeast-1.aws.neon.tech/song-covers/ece35847-5fec-4210-85f0-f82c66b6d29e.jpg"
              alt={`Resting Power Song Cover`}
              width={500}
              height={500}
              className="w-full h-full rounded-t-md object-cover z-0 absolute top-0 left-0 opacity-50 group-hover:opacity-100 transition-opacity duration-500"
            />
            <div
              className="w-full h-full absolute top-0 left-0 rounded-t-md pointer-events-none z-5 
              bg-[linear-gradient(to_bottom,var(--background-light)_0%,transparent_30%,transparent_70%,var(--background-light)_100%)]"
            ></div>
            <div className="w-full h-full flex flex-col justify-between relative z-10">
              <h2 className="text-md font-bold p-4">Song Details</h2>
              <div className="p-4">
                <h3 className="text-lg font-bold mt-2">Resting Power</h3>
                <p className="text-sm opacity-50">Calliope Mori</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-[#5a1b22] p-4 m-4 relative">
            <h3 className="font-bold text-md">Lyrics Preview</h3>
            <p className="text-md font-extrabold opacity-80 mt-2">
              Started like a whisper, but grew as I flew At times, I almost miss
              her, just do as I do We can't lose, it's confusing, but I need you
              to trust me...
            </p>
            <div className="w-full h-20 absolute bottom-0 left-0 grid place-content-center">
              <div className="w-full h-full absolute bottom-0 left-0 rounded-t-md pointer-events-none z-5 bg-linear-to-b from-transparent via-[#5a1b22] to-[#5a1b22] rounded-b-xl"></div>
              <Link
                href=""
                className="text-sm font-bold hover:underline absolute bottom-0 w-full text-center p-3 z-10"
              >
                Show more
              </Link>
            </div>
          </div>
          <div className="rounded-xl bg-background-lighter m-4">
            <div className="w-full aspect-4/3 relative">
              <Image
                src="https://br-billowing-rice-b3586edm.storage.c-4.ap-southeast-1.aws.neon.tech/profile-photos/674d0dd5-c52f-4b8d-842a-2513397ffba7.jpg"
                alt={`Resting Power Song Cover`}
                width={500}
                height={500}
                className="w-full h-full rounded-t-md object-cover z-0 absolute top-0 left-0"
              />
              <div
                className="w-full h-full absolute top-0 left-0 rounded-t-md pointer-events-none z-5 
                bg-[linear-gradient(to_bottom,var(--background-light)_0%,transparent_30%)]"
              ></div>
              <h2 className="text-md font-bold p-4 relative z-10">
                About the Artist
              </h2>
            </div>
            <div className="p-4">
              <h2 className="text-md font-bold">Calliope Mori</h2>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm opacity-50">1K monthly listeners</p>
                <button className="p-2 rounded-full border-foreground border min-w-20 text-sm cursor-pointer hover:bg-background-light transition-colors">
                  Follow
                </button>
              </div>
              <p className="mt-4 opacity-50 text-sm text-justify">
                A virtual YouTube persona (“VTuber”) created by hololive, perky,
                English-speaking pop-rapper Mori Calliope debuted on the
                platform in 2020. She had two million subscribers by the time
                she delivered her first solo album, UnAlive, in early 2022. The
                follow-up, Sinderella, appeared before the end of the year and
                landed in the Top 20 of Billboard’s Heatseekers chart. Jigoku 6
                arrived the following year and reached number six.
              </p>
            </div>
          </div>
          <div className="rounded-xl bg-background-lighter m-4 p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-md font-bold">Next in queue</h2>
              <Link
                href=""
                className="text-xs font-bold opacity-50 hover:underline"
              >
                Open Queue
              </Link>
            </div>
            <div className="w-full flex justify-between items-center cursor-pointer transition-colors hover:bg-background-light mt-3 rounded-md p-2">
              <div className="w-full h-auto flex gap-2">
                <Image
                  src="https://br-billowing-rice-b3586edm.storage.c-4.ap-southeast-1.aws.neon.tech/song-covers/4291d437-90b9-4d56-b76f-f241cd87df24.jpg"
                  alt="FACT Song Cover"
                  width={500}
                  height={500}
                  className="w-12 h-12 object-cover rounded-md"
                />
                <div className="flex flex-col justify-center">
                  <h3 className="text-sm font-bold">FACT</h3>
                  <p className="opacity-50 text-sm">常闇トワ</p>
                </div>
              </div>
              <Icons.More className="text-xl" />
            </div>
          </div>
          {/* <div className="w-full aspect-square relative">
            <Image
              src="https://br-billowing-rice-b3586edm.storage.c-4.ap-southeast-1.aws.neon.tech/song-covers/ece35847-5fec-4210-85f0-f82c66b6d29e.jpg"
              alt={`Resting Power Song Cover`}
              width={500}
              height={500}
              className="w-full h-full rounded-md object-cover z-2"
            />
            <div className="w-full aspect-square rounded-md grid place-content-center text-4xl bg-background">
              <Icons.Note className="opacity-60" />
            </div>
          </div> */}
        </section>
      </main>
      <MusicPlayer />
    </div>
  );
}
