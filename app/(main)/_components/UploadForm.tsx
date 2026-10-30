"use client";

import { useState, useEffect, use, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Icons from "@/utils/icons";
import clsx from "clsx";
import SongUploadForm from "./SongUploadForm";
import ArtistUploadForm from "./ArtistUploadForm";

type Tabs = "Song" | "Artist";

interface UploadFormProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export type FormState = "form" | "uploadAudio" | "uploadPhoto" | "recordDB";

export default function UploadForm({ searchParams }: UploadFormProps) {
  const params = use(searchParams);
  if (params.upload_form !== "true") return null;
  return <UploadDialog />;
}

function UploadDialog() {
  const [currentTab, setCurentTab] = useState<Tabs>("Song");
  const [shouldShow, setShouldShow] = useState(false);
  const [toast, setToast] = useState("");
  const [state, setState] = useState<FormState>("form");
  const [uploadProgress, setUploadProgress] = useState(0);

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => setShouldShow(true), 100);
  }, []);

  const tabLayout: Record<Tabs, ReactNode> = {
    Song: (
      <SongUploadForm
        setToast={setToast}
        setState={setState}
        setUploadProgress={setUploadProgress}
      />
    ),
    Artist: (
      <ArtistUploadForm
        setToast={setToast}
        setState={setState}
        setUploadProgress={setUploadProgress}
      />
    ),
  };

  const loadingMessages: Record<FormState, string> = {
    form: "",
    uploadAudio: "Uploading Audio File",
    uploadPhoto: "Uploading Image File",
    recordDB: currentTab === "Song" ? "Adding Song" : "Adding Artist",
  };

  function handleTabChange(tab: Tabs) {
    setCurentTab(tab);
    setToast("");
  }

  function handleDismiss() {
    setShouldShow(false);
    setTimeout(() => router.replace("/"), 200);
  }

  return (
    <section
      className={clsx(
        "fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] transition-opacity flex justify-center items-center z-15",
        shouldShow ? "opacity-100" : "opacity-0",
      )}
    >
      <div
        className={clsx(
          "w-[90%] h-[90%] max-w-250 max-h-200 rounded-xl bg-background-light transition-all flex flex-col",
          shouldShow ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        )}
      >
        <div className="rounded-t-xl border-b border-background-lighter flex flex-row justify-between items-center p-3">
          <h1 className="text-xl font-bold">Upload Songs or Artist</h1>
          <button
            className="p-2 hover:bg-background-lighter transition-colors cursor-pointer rounded-full"
            onClick={handleDismiss}
          >
            <Icons.Dismiss />
          </button>
        </div>
        <div className="flex-1 flex flex-col py-4 px-6 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-scrollbar-thumb [&::-webkit-scrollbar-thumb]:rounded-full">
          {toast && (
            <p className="w-full p-4 rounded-md bg-accent mb-4 text-background font-bold">
              {toast}
            </p>
          )}
          {state === "form" ? (
            <>
              <nav className="flex gap-2 text-sm text-center pb-8">
                <button
                  className={clsx(
                    "rounded-full py-2 px-4 min-w-15 transition-all hover:scale-105 active:scale-95 shadow-2xl cursor-pointer",
                    currentTab === "Song"
                      ? "bg-accent text-background font-bold"
                      : "bg-background-lighter text-foreground",
                  )}
                  onClick={() => handleTabChange("Song")}
                >
                  Song
                </button>
                <button
                  className={clsx(
                    "rounded-full py-2 px-4 min-w-15 transition-all hover:scale-105 active:scale-95 shadow-xl cursor-pointer",
                    currentTab === "Artist"
                      ? "bg-accent text-background font-bold"
                      : "bg-background-lighter text-foreground",
                  )}
                  onClick={() => handleTabChange("Artist")}
                >
                  Artist
                </button>
              </nav>
              {tabLayout[currentTab]}
            </>
          ) : (
            <section className="flex-1 flex flex-col gap-5 justify-center items-center text-center">
              <Icons.Loading className="animate-spin text-6xl" />
              <div>
                <p className="text-2xl font-bold">{loadingMessages[state]}</p>
                {(state === "uploadPhoto" || state === "uploadAudio") && (
                  <p>{uploadProgress}%</p>
                )}
                <p className="text-sm opacity-75">
                  Please don't exit this page
                </p>
              </div>
            </section>
          )}
        </div>
      </div>
    </section>
  );
}
