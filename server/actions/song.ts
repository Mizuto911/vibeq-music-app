"use server";

import db from "@/db/database";
import { songFiles, songCoverFiles } from "../storage";

export type Song = {
  id: string;
  cover_url?: string;
  title: string;
  artist_name: string;
};

export async function getSongs() {
  const songs =
    await db`SELECT songs.id, cover_url, title, name AS artist_name FROM songs LEFT JOIN artists on songs.artist_id = artists.id`;
  return { success: true, data: songs };
}

export async function requestSongUploadURL(extType: string) {
  const songID = crypto.randomUUID();
  const { url, method } = await songFiles.signedUploadUrl(
    `${songID}.${extType}`,
    {
      contentType: `audio/*`,
      expiresIn: 300,
    },
  );

  return { url, method, songID };
}

export async function requestCoverUploadURL(extType: string) {
  const coverID = crypto.randomUUID();
  const { url, method } = await songCoverFiles.signedUploadUrl(
    `${coverID}.${extType}`,
    {
      contentType: "audio/*",
      expiresIn: 300,
    },
  );

  return { url, method, coverID };
}

export async function createSong(formData: FormData) {
  const title = formData.get("title");
  const artistID = formData.get("artist_id");
  const songID = formData.get("id");
  const extension = formData.get("extension");
  const coverID = formData.get("cover_id");

  const coverURL = coverID
    ? `${process.env.AWS_ENDPOINT_URL_S3}/song-covers/${coverID}`
    : null;

  try {
    const [newSong] = await db`
      INSERT INTO songs (id, title, artist_id, cover_url, ext_type)
      VALUES (${songID}, ${title}, ${artistID}, ${coverURL}, ${extension})
      RETURNING *
    `;
    return { success: true, data: newSong };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}
