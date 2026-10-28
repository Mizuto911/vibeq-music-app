"use client";

import Icons from "@/utils/icons";
import { ChangeEvent, SubmitEvent, useState } from "react";
import { requestUploadURL, createSong } from "@/server/actions/song";
import axios from "axios";

export default function Form() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setAudioFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  }

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const type = fileName.split(".")[1];

    const { url, songID } = await requestUploadURL(type);
    axios
      .put(url, audioFile, {
        headers: {
          "Content-Type": `audio/${type}`,
        },
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total || 1;
          const current = progressEvent.loaded;
          const percentCompleted = Math.round((current * 100) / total);
          setUploadProgress(percentCompleted);
        },
      })
      .then(async () => {
        formData.append("artist_id", "7862dbb4-b932-443b-bc14-8fc87f7a3d12");
        formData.append("id", songID);
        const response = await createSong(formData);
        console.log(response.success);
      })
      .catch((reason) => {
        console.error(reason);
      });
  }

  return (
    <div className="w-75 p-3">
      <input
        type="file"
        id="song-file-input"
        className="opacity-0 w-[0.1px] h-[0.1px] absolute"
        accept=".mp3, .ogg, .wav, .aac, .webm, .flac"
        onChange={handleInputChange}
      />
      <label
        htmlFor="song-file-input"
        className="w-full p-5 rounded-2xl bg-background-lighter shadow-2xl flex flex-col justify-center items-center gap-3 cursor-pointer hover:scale-105 transition-transform"
      >
        <Icons.AudioFile className="text-4xl" />
        <h3 className="text-xl font-bold text-center">
          {fileName ? fileName : "Select an Audio File"}
        </h3>
        <p className="text-xs text-center opacity-75">
          Supported formats are: mp3, ogg, wav, aac, webm, flac. Up to 100MB.
        </p>
      </label>
      <form onSubmit={handleSubmit}>
        <input type="text" name="song_name" />
        <button>Submit</button>
      </form>
      <progress max={100} value={uploadProgress}>
        {uploadProgress}%
      </progress>
    </div>
  );
}
