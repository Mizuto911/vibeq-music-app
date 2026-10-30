import Link from "next/link";
import clsx from "clsx";
import { Suspense } from "react";
import SongItem from "../_components/SongItem";
import ArtistItem from "../_components/ArtistItem";
import UploadForm from "../_components/UploadForm";

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
  return (
    <section className="relative min-h-0 flex-1 overflow-y-auto rounded-md bg-background-light px-8 py-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-scrollbar-thumb [&::-webkit-scrollbar-thumb]:rounded-full">
      <Suspense fallback={null}>
        <NavMenu searchParams={searchParams} />
      </Suspense>
      <div>
        <h2 className="text-xl font-bold">Recommended For You</h2>
        <div className="flex flex-row gap-8">
          <SongItem
            coverSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD59MrebBZDwcO4nhltZBbi5nxEf7fBXrh3y7hAZXwJOHzYPjcGngeV1DO&s=10"
            name="FACT"
            artist="Tokoyami Towa"
          />
          <SongItem
            coverSrc="https://i.scdn.co/image/ab67616d0000b273bfa10b02c2e327512715b08b"
            name="RED"
            artist="Calliope Mori"
          />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold">Your Favorite Artists</h2>
        <div className="flex flex-row gap-8">
          <ArtistItem
            profileSrc="https://hololive.hololivepro.com/wp-content/uploads/2025/06/BAZUBIBAZAB.png"
            name="Tokoyami Towa"
          />
          <ArtistItem
            profileSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4WMTZTh1kHmtPYsIHKpn2WyPcLV_wO7Y9s3F1ZA5AlUOPgf5vMUVNVscf&s=10"
            name="Calliope Mori"
          />
        </div>
      </div>
      <Suspense fallback={null}>
        <UploadForm searchParams={searchParams} />
      </Suspense>
    </section>
  );
}

async function NavMenu({ searchParams }: HomeProps) {
  const query = (await searchParams).q;
  return (
    <nav className="flex gap-2 text-sm text-center pb-8">
      <Link
        href="/"
        className={clsx(
          "rounded-full py-2 px-4 min-w-15 transition-all hover:scale-105 active:scale-95 shadow-2xl",
          query === undefined
            ? "bg-accent text-background font-bold"
            : "bg-background-lighter text-foreground",
        )}
      >
        All
      </Link>
      <Link
        href="/?q=song"
        className={clsx(
          "rounded-full py-2 px-4 min-w-15 transition-all hover:scale-105 active:scale-95 shadow-xl",
          query === "song"
            ? "bg-accent text-background font-bold"
            : "bg-background-lighter text-foreground",
        )}
      >
        Song
      </Link>
      <Link
        href="/?q=artists"
        className={clsx(
          "rounded-full py-2 px-4 min-w-15 transition-all hover:scale-105 active:scale-95 shadow-xl",
          query === "artists"
            ? "bg-accent text-background font-bold"
            : "bg-background-lighter text-foreground",
        )}
      >
        Artists
      </Link>
    </nav>
  );
}
