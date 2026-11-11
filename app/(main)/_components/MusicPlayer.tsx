"use client";

import Image from "next/image";
import Icons from "@/utils/icons";
import timeFormatter from "@/utils/timeFormatter";
import Slider from "./Slider";
import { requestSongURL } from "@/server/actions/song";
import { ChangeEvent, useState, useRef, useEffect } from "react";
import clsx from "clsx";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentSong, setCurrentSong] = useState<string>();
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    async function getCurrentSong() {
      const url = await requestSongURL(
        "34ae8eec-564a-4b5f-88b3-479155290eb4.mp3",
      );
      setCurrentSong(url);
    }
    getCurrentSong();
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;
    function loadDuration() {
      if (audioRef.current) setDuration(audioRef.current.duration);
    }
    audioRef.current.addEventListener("loadedmetadata", loadDuration);
    return () =>
      audioRef.current?.removeEventListener("loadedmetadata", loadDuration);
  }, [currentSong]);

  useEffect(() => {
    if (!audioRef.current) return;
    function handleTimeUpdate() {
      if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
    }
    function stopMusic() {
      if (audioRef.current) setIsPlaying(false);
    }
    function showLoading() {
      if (audioRef.current) setIsLoading(true);
    }
    function hideLoading() {
      if (audioRef.current) setIsLoading(false);
    }
    audioRef.current.addEventListener("waiting", showLoading);
    audioRef.current.addEventListener("loadstart", showLoading);
    audioRef.current.addEventListener("canplay", hideLoading);
    audioRef.current.addEventListener("playing", hideLoading);
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    audioRef.current.addEventListener("ended", stopMusic);
    return () => {
      audioRef.current?.removeEventListener("waiting", showLoading);
      audioRef.current?.removeEventListener("loadstart", showLoading);
      audioRef.current?.removeEventListener("canplay", hideLoading);
      audioRef.current?.removeEventListener("playing", hideLoading);
      audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
      audioRef.current?.removeEventListener("ended", stopMusic);
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    if (muted) {
      audioRef.current.volume = 0;
      return;
    }
    audioRef.current.volume = volume;
  }, [volume, muted]);

  function handleTimeChange(e: ChangeEvent<HTMLInputElement>) {
    if (!currentSong) return;
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) audioRef.current.currentTime = time;
  }

  function handleVolumeChange(e: ChangeEvent<HTMLInputElement>) {
    if (muted) return;
    setVolume(Number(e.target.value));
  }

  return (
    <section className="flex h-30 w-full shrink-0 items-center justify-between p-4">
      <div className="flex gap-4 w-60 items-center">
        <Image
          src="https://br-billowing-rice-b3586edm.storage.c-4.ap-southeast-1.aws.neon.tech/song-covers/ece35847-5fec-4210-85f0-f82c66b6d29e.jpg"
          className="w-14 aspect-square rounded-md"
          alt="Current Song Cover"
          width={50}
          height={50}
        />
        <div className="flex flex-col justify-center">
          <h3 className="text-md font-bold">Resting Power</h3>
          <p className="opacity-75 text-xs">Mori Calliope</p>
        </div>
      </div>
      <div
        className={clsx(
          !currentSong && "opacity-50",
          "flex-1 flex gap-3 flex-col justify-center items-center",
        )}
      >
        <audio src={currentSong} ref={audioRef} />
        <div className="flex gap-4 justify-center items-center w-[50%]">
          <Icons.Shuffle className="text-xl" />
          <Icons.PreviousMusic className="text-xl" />
          <button
            disabled={!currentSong}
            onClick={() => setIsPlaying((prev) => !prev)}
            className={clsx(
              currentSong && "cursor-pointer hover:scale-105 active:scale-95",
              "p-3 rounded-full bg-foreground transition-transform",
            )}
          >
            {isLoading ? (
              <Icons.Loading className="text-xl text-background animate-spin" />
            ) : isPlaying ? (
              <Icons.Pause className="text-xl text-background" />
            ) : (
              <Icons.Play className="text-xl text-background" />
            )}
          </button>
          <Icons.NextMusic className="text-xl" />
          <Icons.Loop className="text-xl" />
        </div>
        <div className="w-full flex justify-center items-center gap-2 text-sm">
          <p>{timeFormatter(currentTime)}</p>
          <Slider
            min={0}
            max={duration || 100}
            disabled={!currentSong}
            value={currentSong ? Math.round(currentTime) : 0}
            onChange={handleTimeChange}
            className="w-[50%]"
          />
          <p>{timeFormatter(duration)}</p>
        </div>
      </div>
      <div className="w-60 flex items-center justify-end gap-4">
        <Icons.MusicQueue className="text-xl" />
        <button
          className="transition-transform cursor-pointer hover:scale-105 active:scale-95"
          onClick={() => setMuted((prev) => !prev)}
        >
          {!muted ? (
            <Icons.VolumeHigh className="text-xl" />
          ) : (
            <Icons.VolumeZero className="text-xl" />
          )}
        </button>
        <Slider
          min={0}
          max={1}
          step={0.1}
          value={muted ? 0 : volume}
          disabled={muted}
          className={muted ? "opacity-50" : ""}
          onChange={handleVolumeChange}
        />
      </div>
    </section>
  );
}
