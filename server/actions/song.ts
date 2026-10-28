"use server";

import db from "@/db/database";
import { songFiles } from "../storage";

export async function getSongs() {
  const songs = await db`SELECT * FROM songs`;
  return { success: true, data: songs };
}

export async function requestUploadURL(mimeType: string) {
  const songID = crypto.randomUUID();
  const { url, method } = await songFiles.signedUploadUrl(
    `${songID}.${mimeType}`,
    {
      contentType: `audio/${mimeType}`,
      expiresIn: 600,
    },
  );

  return { url, method, songID };
}

export async function createSong(formData: FormData) {
  const songName = formData.get("song_name");
  const artistID = formData.get("artist_id");
  const songID = formData.get("id");
  const coverURL = formData.get("cover_url");

  try {
    const [newSong] = await db`
      INSERT INTO songs (id, song_name, artist_id, cover_url)
      VALUES (${songID}, ${songName}, ${artistID}, ${coverURL})
      RETURNING *
    `;
    return { success: true, data: newSong };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}
