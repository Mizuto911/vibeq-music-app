"use client";

import Icons from "@/utils/icons";
import Image from "next/image";
import { ChangeEvent, useState, useEffect } from "react";
import clsx from "clsx";

type AudioFile = {
  file: File | null;
  name: string | null;
};

export default function SongUploadForm() {
  const [titleLength, setTitleLength] = useState(0);
  const [audioFile, setAudioFile] = useState<AudioFile>({
    file: null,
    name: null,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewURL) URL.revokeObjectURL(previewURL);
    };
  }, [previewURL]);

  function handleAudioFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setAudioFile({
        file: e.target.files[0],
        name: e.target.files[0].name,
      });
    }
  }

  function handleImageFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  }

  return (
    <section className="w-full grid grid-cols-2">
      <form action="">
        <h2 className="text-xl font-bold mb-8">Details</h2>
        <div className="flex flex-col gap-2 mb-6">
          <label htmlFor="name" className="text-lg font-bold">
            Title
          </label>
          <input
            type="text"
            id="name"
            name="name"
            spellCheck={false}
            onChange={(e) => setTitleLength(e.target.value.length)}
            className="p-4 border-background-lighter bg-background border rounded-xl outline-foreground focus:outline-2 w-full"
          />
          <p
            className={clsx(
              "text-sm opacity-75",
              titleLength > 100 && "text-red-600",
            )}
          >
            Input: {titleLength}/100
          </p>
        </div>

        <div className="flex flex-col gap-2 mb-6">
          <label htmlFor="artist" className="text-lg font-bold">
            Artist
          </label>
          <div className="w-full relative">
            <select
              name="artist"
              id="artist"
              className="p-4 border-background-lighter bg-background border rounded-xl outline-foreground focus:outline-2 w-full appearance-none"
            >
              <option defaultValue="">Select an Artist</option>
              <option value="towa">Tokoyami Towa</option>
              <option value="calli">Calliope Mori</option>
            </select>
            <Icons.DropDown className="pointer-events-none absolute right-4 top-1/2 z-10 size-5 -translate-y-1/2" />
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-6">
          <label htmlFor="song" className="text-lg font-bold">
            Song File
          </label>
          <div className="w-full p-3">
            <input
              type="file"
              id="song"
              className="opacity-0 w-[0.1px] h-[0.1px] absolute"
              onChange={handleAudioFileChange}
              accept=".mp3, .ogg, .wav, .aac, .webm, .flac"
            />
            <label
              htmlFor="song"
              className="w-full p-5 rounded-2xl bg-background-lighter shadow-2xl flex flex-col justify-center items-center gap-3 cursor-pointer hover:scale-105 transition-transform"
            >
              <Icons.AudioFile className="text-4xl" />
              <h3 className="text-xl font-bold text-center">
                {audioFile.name ?? "Select Audio file"}
              </h3>
              <p className="text-xs text-center opacity-75">
                Supported formats are: mp3, ogg, wav, aac, webm, flac. Up to
                100MB.
              </p>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-4 bg-accent text-background font-bold rounded-full transition-all opacity-100 hover:opacity-50 active:scale-95 cursor-pointer"
        >
          Add Song
        </button>
      </form>
      <div className="sticky top-4 mx-auto w-full max-w-75 self-start">
        <label htmlFor="cover" className="text-lg font-bold">
          Song Cover (Optional)
        </label>
        {imageFile && previewURL ? (
          <Image
            src={previewURL}
            alt="Song Cover"
            width={500}
            height={500}
            className="w-full h-auto mt-4 rounded-md object-cover aspect-square"
          />
        ) : (
          <div className="w-full aspect-square rounded-md grid place-content-center text-6xl bg-background mt-4">
            <Icons.Note className="opacity-60" />
          </div>
        )}
        <div className="bg-accent rounded-full p-1 text-2xl text-background absolute -right-2 -bottom-2 hover:scale-110 transition-transform">
          <input
            type="file"
            id="cover"
            className="opacity-0 w-[0.1px] h-[0.1px] absolute"
            onChange={handleImageFileChange}
            accept=".jpeg, .png, .webp, .avif"
          />
          <label htmlFor="cover" className="cursor-pointer">
            <Icons.Edit />
          </label>
        </div>
      </div>
    </section>
  );
}
