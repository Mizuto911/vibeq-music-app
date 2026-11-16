import { useEffect } from "react";
import { SongInfo } from "./useMusicPlayerState";
import { Song, getSong, requestSongURL } from "@/server/actions/song";

export default function useQuerySong(
  query: string | null,
  callback: (song: SongInfo) => void,
) {
  useEffect(() => {
    async function getCurrentSong() {
      if (!query) return;
      const response = await getSong(query);
      if (!response.success) console.log(response.error);
      const data = response.data as Song;
      const url = await requestSongURL(`${data.id}.${data.extType}`);
      callback({
        title: data.title,
        artistName: data.artist_name,
        coverUrl: data.cover_url,
        url,
      });
    }
    getCurrentSong();
  }, [query]);
}
