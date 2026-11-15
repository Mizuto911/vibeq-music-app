import Link from "next/link";
import clsx from "clsx";
import { Suspense } from "react";
import SongItem from "../_components/SongItem";
import ArtistItem from "../_components/ArtistItem";
import UploadForm from "../_components/UploadForm";
import { Artist, getArtists } from "@/server/actions/artist";
import { Song, getSongs } from "@/server/actions/song";

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
          <Suspense fallback={<p>Loading Songs...</p>}>
            <SongList searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold">Your Favorite Artists</h2>
        <div className="flex flex-row gap-8">
          <Suspense fallback={<p>Loading Artists...</p>}>
            <ArtistList />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={null}>
        <UploadForm searchParams={searchParams} />
      </Suspense>
    </section>
  );
}

async function NavMenu({ searchParams }: HomeProps) {
  const params = await searchParams;
  const query = params.q;

  function hrefFor(nextQuery?: string) {
    const nextParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (key === "q" || value === undefined) continue;
      for (const item of Array.isArray(value) ? value : [value]) {
        nextParams.append(key, item);
      }
    }
    if (nextQuery !== undefined) nextParams.set("q", nextQuery);
    const queryString = nextParams.toString();
    return queryString ? `/?${queryString}` : "/";
  }

  return (
    <nav className="flex gap-2 text-sm text-center pb-8">
      <Link
        href={hrefFor()}
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
        href={hrefFor("song")}
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
        href={hrefFor("artists")}
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

async function ArtistList() {
  const artists = (await getArtists()) as { success: boolean; data: Artist[] };
  const artistItems = artists.data.map((artist) => (
    <ArtistItem
      key={artist.id}
      name={artist.name}
      profileSrc={artist.profile_url}
    />
  ));

  return <>{artistItems}</>;
}

async function SongList({ searchParams }: HomeProps) {
  const songs = (await getSongs()) as { success: boolean; data: Song[] };
  const params = await searchParams;
  const songItems = songs.data.map((song) => (
    <SongItem
      key={song.id}
      coverSrc={song.cover_url}
      name={song.title}
      artist={song.artist_name}
      getSongQuery={() => {
        const nextParams = new URLSearchParams();
        for (const [key, value] of Object.entries(params)) {
          if (key === "song" || value === undefined) continue;
          for (const item of Array.isArray(value) ? value : [value]) {
            nextParams.append(key, item);
          }
        }
        nextParams.set("song", song.id);
        const queryString = nextParams.toString();
        return `/?${queryString}`;
      }}
    />
  ));

  return <>{songItems}</>;
}
