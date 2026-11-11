"use client";

import Image from "next/image";
import Icons from "@/utils/icons";
import timeFormatter from "@/utils/timeFormatter";
import Slider from "./Slider";
import { requestSongURL } from "@/server/actions/song";
import { ChangeEvent, useEffect } from "react";
import useMusicPlayerState from "@/hooks/useMusicPlayerState";
import clsx from "clsx";

export default function MusicPlayer() {
  const {
    audioRef,
    player,
    loadSong,
    setDuration,
    togglePlaying,
    setPlaying,
    updateTime,
    setLoading,
    toggleMute,
    setVolume,
  } = useMusicPlayerState();

  useEffect(() => {
    async function getCurrentSong() {
      const url = await requestSongURL(
        "4f96951e-0b4a-4512-9192-2fb6e8a33eee.mp3",
      );
      loadSong(url);
    }
    getCurrentSong();
  }, []);

  function handleTimeChange(e: ChangeEvent<HTMLInputElement>) {
    if (!player.currentSong) return;
    const time = Number(e.target.value);
    updateTime(time);
    if (audioRef.current) audioRef.current.currentTime = time;
  }

  function handleTimeUpdate() {
    if (audioRef.current) updateTime(audioRef.current.currentTime);
  }

  function handleLoadedMetaData() {
    if (audioRef.current) setDuration(audioRef.current.duration);
  }

  function handleVolumeChange(e: ChangeEvent<HTMLInputElement>) {
    if (player.muted) return;
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
          !player.currentSong && "opacity-50",
          "flex-1 flex gap-3 flex-col justify-center items-center",
        )}
      >
        <audio
          src={player.currentSong}
          ref={audioRef}
          onLoadedMetadata={handleLoadedMetaData}
          onWaiting={() => setLoading(true)}
          onLoadStart={() => setLoading(true)}
          onCanPlay={() => setLoading(false)}
          onPlaying={() => setLoading(false)}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setPlaying(false)}
        />
        <div className="flex gap-4 justify-center items-center w-[50%]">
          <Icons.Shuffle className="text-xl" />
          <Icons.PreviousMusic className="text-xl" />
          <button
            disabled={!player.currentSong}
            onClick={togglePlaying}
            className={clsx(
              player.currentSong &&
                "cursor-pointer hover:scale-105 active:scale-95",
              "p-3 rounded-full bg-foreground transition-transform",
            )}
          >
            {player.isLoading ? (
              <Icons.Loading className="text-xl text-background animate-spin" />
            ) : player.isPlaying ? (
              <Icons.Pause className="text-xl text-background" />
            ) : (
              <Icons.Play className="text-xl text-background" />
            )}
          </button>
          <Icons.NextMusic className="text-xl" />
          <Icons.Loop className="text-xl" />
        </div>
        <div className="w-full flex justify-center items-center gap-2 text-sm">
          <p>{timeFormatter(player.currentTime)}</p>
          <Slider
            min={0}
            max={player.duration || 100}
            disabled={!player.currentSong}
            value={player.currentSong ? Math.round(player.currentTime) : 0}
            onChange={handleTimeChange}
            className="w-[50%]"
          />
          <p>{timeFormatter(player.duration)}</p>
        </div>
      </div>
      <div className="w-60 flex items-center justify-end gap-4">
        <Icons.MusicQueue className="text-xl" />
        <button
          className="transition-transform cursor-pointer hover:scale-105 active:scale-95"
          onClick={toggleMute}
        >
          {!player.muted ? (
            <Icons.VolumeHigh className="text-xl" />
          ) : (
            <Icons.VolumeZero className="text-xl" />
          )}
        </button>
        <Slider
          min={0}
          max={1}
          step={0.1}
          value={player.muted ? 0 : player.volume}
          disabled={player.muted}
          className={player.muted ? "opacity-50" : ""}
          onChange={handleVolumeChange}
        />
      </div>
    </section>
  );
}
