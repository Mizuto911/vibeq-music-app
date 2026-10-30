"use client";

import Icons from "@/utils/icons";
import Image from "next/image";
import {
  useState,
  ChangeEvent,
  SubmitEvent,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import clsx from "clsx";
import { createArtist, requestProfileUploadUrl } from "@/server/actions/artist";
import { FormState } from "./UploadForm";
import axios from "axios";

interface ArtistUploadFormProps {
  setToast: Dispatch<SetStateAction<string>>;
  setState: Dispatch<SetStateAction<FormState>>;
  setUploadProgress: Dispatch<SetStateAction<number>>;
}

export default function ArtistUploadForm({
  setToast,
  setState,
  setUploadProgress,
}: ArtistUploadFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewURL) URL.revokeObjectURL(previewURL);
    };
  }, [previewURL]);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();
    if (!name) {
      setToast("❗ Please provide the artist name.");
      return;
    }
    setToast("");
    formData.append("name", name);

    if (imageFile) {
      setState("uploadPhoto");
      const extension = imageFile.name.split(".").pop();
      if (!extension) throw Error("File does not have an extension.");
      const { url, profileID } = await requestProfileUploadUrl(extension);

      try {
        await axios.put(url, imageFile, {
          headers: {
            "Content-Type": `image/*`,
          },
          onUploadProgress: (progressEvent) => {
            const total = progressEvent.total || 1;
            const current = progressEvent.loaded;
            const percentCompleted = Math.round((current * 100) / total);
            setUploadProgress(percentCompleted);
          },
        });
        setUploadProgress(0);
        formData.append("profile_id", `${profileID}.${extension}`);
      } catch (e) {
        setState("form");
        setToast(`Something went wrong. ${String(e)}`);
        return;
      }
    }

    setState("recordDB");
    if (description) formData.append("description", description);
    const response = await createArtist(formData);

    if (!response.success) {
      setState("form");
      setToast(`Something went wrong. ${response.error}`);
    }

    setState("form");
    setName("");
    setDescription("");
    setImageFile(null);
    if (previewURL) URL.revokeObjectURL(previewURL);
    setPreviewURL(null);
    setToast("✅ Artist added successfully.");
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
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-8">Details</h2>
        <div className="flex flex-col gap-2 mb-6">
          <label htmlFor="name" className="text-lg font-bold">
            Artist Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            spellCheck={false}
            onChange={(e) => setName(e.target.value)}
            className="p-4 border-background-lighter bg-background border rounded-xl outline-foreground focus:outline-2 w-full"
          />
          <p
            className={clsx(
              "text-sm opacity-75",
              name.length > 100 && "text-red-600",
            )}
          >
            Input: {name.length}/100
          </p>
        </div>
        <div className="flex flex-col gap-2 mb-6">
          <label htmlFor="description" className="text-lg font-bold">
            Description (Optional)
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            rows={6}
            onChange={(e) => setDescription(e.target.value)}
            className="p-4 border-background-lighter bg-background border rounded-xl outline-foreground focus:outline-2 w-full [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-scrollbar-thumb [&::-webkit-scrollbar-corner]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full"
          />
          <p
            className={clsx(
              "text-sm opacity-75",
              description.length > 1000 && "text-red-600",
            )}
          >
            Input: {description.length}/1000
          </p>
        </div>

        <button
          type="submit"
          className="w-full p-4 bg-accent text-background font-bold rounded-full transition-all opacity-100 hover:opacity-50 active:scale-95 cursor-pointer"
        >
          Add Artist
        </button>
      </form>
      <div className="sticky top-4 mx-auto w-full max-w-75 self-start">
        <label htmlFor="cover" className="text-lg font-bold">
          Profile Photo (Optional)
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
            <Icons.Artist className="opacity-60" />
          </div>
        )}
        <div className="bg-accent rounded-full p-1 text-2xl text-background absolute -right-2 -bottom-2 hover:scale-110 transition-transform">
          <input
            type="file"
            id="cover"
            onChange={handleImageFileChange}
            className="opacity-0 w-[0.1px] h-[0.1px] absolute"
            accept=".jpeg, .png, .webp, .avif, .jpg"
          />
          <label htmlFor="cover" className="cursor-pointer">
            <Icons.Edit />
          </label>
        </div>
      </div>
    </section>
  );
}
