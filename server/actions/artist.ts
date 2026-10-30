"use server";

import db from "@/db/database";
import { profileFiles } from "../storage";

export async function getArtists() {
  const artists = await db`SELECT * FROM artists`;
  return { success: true, data: artists };
}

export async function requestProfileUploadUrl(extType: string) {
  const profileID = crypto.randomUUID();
  const { url, method } = await profileFiles.signedUploadUrl(
    `${profileID}.${extType}`,
    {
      contentType: `image/*`,
      expiresIn: 300,
    },
  );
  return { url, method, profileID };
}

export async function createArtist(formData: FormData) {
  const name = formData.get("name");
  const description = formData.get("description");
  const profileID = formData.get("profile_id");

  const profileUrl = profileID
    ? `${process.env.AWS_ENDPOINT_URL_S3}/profile-photos/${profileID}`
    : null;

  try {
    const [newArtist] = await db`
      INSERT INTO artists (name, description, profile_url)
      VALUES (${name}, ${description}, ${profileUrl})
      RETURNING *
    `;
    return { success: true, data: newArtist };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}
