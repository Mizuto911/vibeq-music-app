import { Files } from "files-sdk";
import { neon } from "files-sdk/neon";

export const profileFiles = new Files({
  adapter: neon({ bucket: "profile-images" }),
});
export const songCoverFiles = new Files({
  adapter: neon({ bucket: "song-covers" }),
});
export const songFiles = new Files({ adapter: neon({ bucket: "songs" }) });
